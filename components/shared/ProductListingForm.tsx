'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUploadThing } from '@/lib/uploadthing';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { Button } from '@ui/button';
import { Checkbox } from '@ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { Textarea } from '@ui/textarea';

import Dropdown from './Dropdown';
import FileUploader from './FileUploader';

import {
  createProductListing,
  updateProductListing,
} from '@/lib/actions/productListing.actions';
import { productListingDefaultValues } from '@/constants';
import { productListingFormSchema } from '@lib/validator';
import { IProductListing } from '@/lib/database/models/productListing.model';

type ProductListingFormProps = {
  userId: string;
  type: 'Create' | 'Update';
  productListing?: IProductListing;
  productListingId?: string;
};

const ProductListingForm = ({
  userId,
  type,
  productListing,
  productListingId,
}: ProductListingFormProps) => {
  const [files, setFiles] = useState<File[]>([]);

  // Set default values
  const initialValues =
    productListing && type === 'Update'
      ? {
          ...productListing,
        }
      : productListingDefaultValues;

  const router = useRouter();
  const { startUpload } = useUploadThing('imageUploader');

  // 1. Define your form.
  const form = useForm<z.infer<typeof productListingFormSchema>>({
    resolver: zodResolver(productListingFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof productListingFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }
      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === 'Create') {
      try {
        const newProductListing = await createProductListing({
          productListing: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: '/dashboard',
        });

        if (newProductListing) {
          router.push(`/productListings/${newProductListing._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === 'Update') {
      if (!productListingId) {
        router.back();
        return;
      }

      try {
        const updatedProductListings = await updateProductListing({
          userId,
          productListing: {
            ...values,
            imageUrl: uploadedImageUrl,
            _id: productListingId,
          },
          path: `/productListings/${productListingId}`,
        });

        if (updatedProductListings) {
          router.push(`/productListings/${updatedProductListings._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="ProductListings Title"
                    {...field}
                    className="input-field p-regular-16"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{' '}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72 resize-none">
                  <Textarea
                    placeholder="ProductListings Description"
                    {...field}
                    className="textarea rounded-2xl p-regular-16"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72 resize-none">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/location-grey.svg"
                      width={20}
                      height={20}
                      alt="location"
                    />
                    <Input
                      placeholder="ProductListings Location or Online"
                      {...field}
                      className="input-field p-regular-16"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>{' '}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/dollar.svg"
                      width={20}
                      height={20}
                      alt="dollar"
                      className="filter-grey"
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      className="p-regular-16 input-field hide-number-spinners"
                      value={field.value}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full cursor-pointer"
        >
          {form.formState.isSubmitting
            ? 'Submitting...'
            : `${type} ProductListings`}
        </Button>
      </form>
    </Form>
  );
};

export default ProductListingForm;
