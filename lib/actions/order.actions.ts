'use server';

import { ObjectId } from 'mongodb';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

import {
  CheckoutOrderParams,
  CreateOrderParams,
  GetOrdersByProductListingsParams,
  GetOrdersByUserParams,
} from '@/types';

import { connectToDatabase } from '../database';
import { handleError } from '../utils';
import ProductListings from '../database/models/productListing.model';
import Order from '../database/models/order.model';
import User from '../database/models/user.model';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const price = Number(order.price) * 100;

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: order.productListingTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        productListingId: order.productListingId,
        buyerId: order.buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();

    const user = await User.findById(order.buyerId);
    if (!user) throw new Error('User not found');

    const newOrder = await Order.create({
      ...order,
      productListing: order.productListingId,
      buyer: order.buyerId,
      buyerEmail: user.email,
      quantity: order.quantity
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};

export const hasUserPurchasedProductListings = async (
  userId: string,
  productListingId: string
) => {
  try {
    await connectToDatabase();

    const order = await Order.findOne({
      buyer: userId,
      productListing: productListingId,
    });

    return !!order;
  } catch (error) {
    handleError(error);
  }
};

// GET ORDERS BY PRODUCT LISTING
export async function getOrdersByProductListings({
  searchString,
  productListingId,
}: GetOrdersByProductListingsParams) {
  try {
    await connectToDatabase();

    if (!productListingId) throw new Error('ProductListings ID is required');
    const productListingObjectId = new ObjectId(productListingId);

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'productListings',
          localField: 'productListing',
          foreignField: '_id',
          as: 'productListing',
        },
      },
      {
        $unwind: '$productListing',
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          productListingTitle: '$productListing.title',
          productListingId: '$productListing._id',
          buyer: {
            $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
          },
          buyerEmail: '$buyer.email',
        },
      },
      {
        $match: {
          $and: [
            { productListingId: productListingObjectId },
            { buyer: { $regex: RegExp(searchString, 'i') } },
          ],
        },
      },
    ]);

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({
  userId,
  limit = 3,
  page,
}: GetOrdersByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyer: userId };

    const orders = await Order.distinct('productListing._id')
      .find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'productListing',
        model: ProductListings,
        populate: {
          path: 'seller',
          model: User,
          select: '_id firstName lastName',
        },
      });

    const ordersCount = await Order.distinct(
      'productListing._id'
    ).countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
