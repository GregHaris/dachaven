'use server';

import { Query } from 'mongoose';
import { revalidatePath } from 'next/cache';

import { connectToDatabase } from '@/lib/database';
import { handleError } from '@/lib/utils';
import ProductListings, {
  IProductListing,
} from '@/lib/database/models/productListing.model';
import Category from '@/lib/database/models/category.model';
import User from '@/lib/database/models/user.model';

import {
  CreateProductListingParams,
  UpdateProductListingParams,
  DeleteProductListingParams,
  GetAllProductListingsParams,
  GetProductListingsByUserParams,
  GetRelatedProductListingsByUserParams,
} from '@/types';
import ProductListing from '@/lib/database/models/productListing.model';

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } });
};

const populateProductListing = async <
  T extends IProductListing | IProductListing[] | null
>(
  query: Query<T, IProductListing>
) => {
  return query
    .populate({
      path: 'seller',
      model: User,
      select: '_id firstName lastName',
    })
    .populate({ path: 'category', model: Category, select: '_id name' });
};

// CREATE
export async function createProductListing({
  userId,
  productListing,
  path,
}: CreateProductListingParams) {
  try {
    await connectToDatabase();

    const seller = await User.findById(userId);
    if (!seller) throw new Error('Seller not found');

    const newProductListing = await ProductListings.create({
      ...productListing,
      category: productListing.categoryId,
      seller: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newProductListing));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE PRODUCT LISTING BY ID
export async function getProductListingById(productListingId: string) {
  try {
    await connectToDatabase();

    const productListing = await populateProductListing(
      ProductListing.findById(productListingId)
    );

    if (!productListing) throw new Error('Product Listing not found');

    return JSON.parse(JSON.stringify(productListing));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateProductListing({
  userId,
  productListing,
  path,
}: UpdateProductListingParams) {
  try {
    await connectToDatabase();

    const productListingToUpdate = await ProductListings.findById(
      productListing._id
    );
    if (
      !productListingToUpdate ||
      productListingToUpdate.seller.toHexString() !== userId
    ) {
      throw new Error('Unauthorized or productListing not found');
    }

    const updatedProductListing = await ProductListing.findByIdAndUpdate(
      productListing._id,
      { ...productListing, category: productListing.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedProductListing));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteProductListings({
  productListingId,
  path,
}: DeleteProductListingParams) {
  try {
    await connectToDatabase();

    const deletedProductListings = await ProductListings.findByIdAndDelete(
      productListingId
    );
    if (deletedProductListings) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL PRODUCT LISTINGS
export async function getAllProductListings({
  query,
  limit = 6,
  page,
  category,
  location,
}: GetAllProductListingsParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: 'i' } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const locationCondition = location
      ? { location: { $regex: location, $options: 'i' } }
      : {};
    const conditions = {
      $and: [
        categoryCondition ? { category: categoryCondition._id } : {},
        titleCondition,
        locationCondition,
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const productListingsQuery = ProductListing.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit);

    const productListings = await populateProductListing(productListingsQuery);
    const productListingsCount = await ProductListings.countDocuments(
      conditions
    );

    return {
      data: JSON.parse(JSON.stringify(productListings)),
      totalPages: Math.ceil(productListingsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET PRODUCT LISTINGS BY ORGANIZER
export async function getProductListingsByUser({
  userId,
  limit = 6,
  page,
}: GetProductListingsByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { seller: userId };
    const skipAmount = (page - 1) * limit;

    const productListingsQuery = ProductListings.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit);

    const productListings = await populateProductListing(productListingsQuery);
    const productListingsCount = await ProductListings.countDocuments(
      conditions
    );

    return {
      data: JSON.parse(JSON.stringify(productListings)),
      totalPages: Math.ceil(productListingsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED PRODUCT LISTINGS: PRODUCT LISTINGS WITH SAME CATEGORY
export async function getRelatedProductListingsByCategory({
  categoryId,
  productListingId,
  limit = 3,
  page = 1,
}: GetRelatedProductListingsByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: productListingId } }],
    };

    const productListingsQuery = ProductListings.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit);

    const productListings = await populateProductListing(productListingsQuery);
    const productListingsCount = await ProductListings.countDocuments(
      conditions
    );

    return {
      data: JSON.parse(JSON.stringify(productListings)),
      totalPages: Math.ceil(productListingsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
