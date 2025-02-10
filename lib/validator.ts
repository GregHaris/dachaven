import { z } from 'zod';

export const productListingFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters' })
    .max(1500, { message: 'Description must be less than 1500 characters' }),
  imageUrl: z.string().url({ message: 'Invalid image URL' }),
  price: z.string().min(0, { message: 'Price must be a positive number' }),
  currency: z
    .string()
    .min(3, { message: 'Currency must be at least 3 characters' }),
  categoryId: z.string(),
  condition: z.string(),
  brand: z.string().optional(),
  ProductModel: z.string().optional(),
  deliveryOptions: z.string(),
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be a positive number' }),
  location: z
    .string()
    .min(3, { message: 'Location must be at least 3 characters' }),
  isAvailable: z.boolean(),
  isNegotiable: z.boolean(),
});
