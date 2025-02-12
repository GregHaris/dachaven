'use server';

import { connectToDatabase } from '../database';
import { CreateCategoryParams } from '@/types';
import { handleError } from '../utils';
import Category from '../database/models/category.model';
import { categories } from '@/constants';

export const seedCategories = async () => {
  try {
    await connectToDatabase();

    for (const categoryName of categories) {
      await Category.findOneAndUpdate(
        { name: categoryName },
        { name: categoryName },
        { upsert: true, new: true }
      );
    }
  } catch (error) {
    handleError(error);
  }
};

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase();
    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    await connectToDatabase();
    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};