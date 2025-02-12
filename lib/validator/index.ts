import { z } from 'zod';

export const productListingFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters' })
    .max(1500, { message: 'Description must be less than 1500 characters' }),
  imageUrls: z.array(z.string()),
  price: z.string().min(0, { message: 'Price must be a positive number' }),
  currency: z
    .string()
    .min(3, { message: 'Currency must be at least 3 characters' }),
  categoryId: z.string(),
  condition: z.string(),
  brand: z.string().optional(),
  productModel: z.string().optional(),
  deliveryOptions: z.string(),
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be a positive number' }),
  location: z
    .string()
    .min(3, { message: 'Location must be at least 3 characters' }),
  isAvailable: z.boolean(),
  isNegotiable: z.boolean(),
  contactDetails: z.object({
    phoneNumber: z
      .string()
      .min(10, { message: 'Phone number must be at least 10 characters' }),
    website: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    x: z.string().optional(),
  }),
});

export type ProductListingFormValues = z.infer<typeof productListingFormSchema>;
