'use client';

import { FiPhone } from 'react-icons/fi';
import { RiLink } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUploadThing } from '@/lib/uploadthing';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  categories,
  currencies,
  deliveryOptions,
  productCondition,
  productListingDefaultValues,
} from '@/constants';
import { Checkbox } from '@/components/ui/checkbox';
import {
  createProductListing,
  updateProductListing,
} from '@/lib/actions/productListing.actions';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { IProductListing } from '@/lib/database/models/productListing.model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { productListingFormSchema } from '@/lib/validator/index';
import FileUploader from './FileUploader';
import TiptapEditor from './TiptapEditor';

type ProductListingFormProps = {
  userId: string;
  type: 'Create' | 'Update';
  productListing?: IProductListing;
  productListingId?: string;
};

export default function ProductListingForm({
  userId,
  type,
  productListing,
  productListingId,
}: ProductListingFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const { startUpload } = useUploadThing('imageUploader');

  const initialValues =
    productListing && type === 'Update'
      ? {
          ...productListing,
          category: productListing.category
            ? {
                _id: productListing.category._id,
                name: productListing.category.name,
              }
            : { _id: '', name: '' },
        }
      : productListingDefaultValues;

  const form = useForm<z.infer<typeof productListingFormSchema>>({
    resolver: zodResolver(productListingFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof productListingFormSchema>) {
    let uploadedImageUrls: string[] = values.imageUrls;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }
      uploadedImageUrls = uploadedImages.map((image) => image.url);
    }

    const contactDetails = {
      phoneNumber: values.contactDetails.phoneNumber,
      website: values.contactDetails.website,
      instagram: values.contactDetails.instagram,
      facebook: values.contactDetails.facebook,
      x: values.contactDetails.x,
    };

    if (type === 'Create') {
      try {
        const newProductListing = await createProductListing({
          productListing: { ...values, imageUrls: uploadedImageUrls },
          userId,
          contactDetails,
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
            imageUrls: uploadedImageUrls,
            _id: productListingId,
          },
          contactDetails,
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
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="wrapper">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-2">
                {type === 'Create' ? 'Create a New Listing' : 'Update Listing'}
              </h1>
              <p className="text-gray-600">
                {type === 'Create'
                  ? 'Fill in the details below to list your product'
                  : 'Update the details of your product listing'}
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Title <span className="text-red-400">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Product title"
                          {...field}
                          className="input-field p-regular-14"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Description <span className="text-red-400">*</span>
                      </FormLabel>
                      <FormControl>
                        <TiptapEditor
                          initialContent={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrls"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Images <span className="text-red-400">*</span>
                      </FormLabel>
                      <FormControl>
                        <FileUploader
                          imageUrls={field.value}
                          onFieldChange={field.onChange}
                          setFiles={setFiles}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Price <span className="text-red-400">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0.00"
                            {...field}
                            className="input-field p-regular-14"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Currency <span className="text-red-400">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="select-field p-regular-14">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currencies.map((currency) => (
                              <SelectItem key={currency} value={currency}>
                                {currency}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Category <span className="text-red-400">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="select-field p-regular-14">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Condition <span className="text-red-400">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="select-field p-regular-14">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productCondition.map((condition) => (
                            <SelectItem key={condition} value={condition}>
                              {condition}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Brand
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Brand name"
                            {...field}
                            className="input-field p-regular-14"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="productModel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Model
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Product model"
                            {...field}
                            className="input-field p-regular-14"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="deliveryOptions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Delivery Options <span className="text-red-400">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="select-field p-regular-14">
                            <SelectValue placeholder="Select delivery option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {deliveryOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Quantity <span className="text-red-400">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                Number.parseInt(e.target.value, 10)
                              )
                            }
                            className="input-field p-regular-14 hide-number-spinners"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Location <span className="text-red-400">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City, State"
                            {...field}
                            className="input-field p-regular-14"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="isAvailable"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="toggle-switch"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Available</FormLabel>
                          <FormDescription>
                            Is this product currently available for purchase?
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isNegotiable"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="toggle-switch"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Negotiable</FormLabel>
                          <FormDescription>
                            Is the price negotiable?
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6 py-10">
                  <h3 className="text-lg font-semibold">Contact Details</h3>
                  <FormField
                    control={form.control}
                    name="contactDetails.phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex-center h-[40px] w-full overflow-hidden rounded-md border-gray-300 border bg-grey-50 px-4 py-2">
                            <FiPhone />
                            <Input
                              placeholder="Your phone number"
                              {...field}
                              className="contact-details-input-field p-regular-14"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />{' '}
                  <FormField
                    control={form.control}
                    name="contactDetails.website"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex-center h-[40px] w-full overflow-hidden rounded-md border-gray-300 border bg-grey-50 px-4 py-2">
                            <RiLink />
                            <Input
                              placeholder="www.example.com"
                              {...field}
                              className="contact-details-input-field p-regular-14"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactDetails.instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex-center h-[40px] w-full overflow-hidden rounded-md border-gray-300 border bg-grey-50 px-4 py-2">
                            <Image
                              src="/assets/icons/instagram.svg"
                              width={20}
                              height={20}
                              alt="calendar"
                            />
                            <Input
                              placeholder="Your Instagram handle"
                              {...field}
                              className="contact-details-input-field p-regular-14"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactDetails.facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex-center h-[40px] w-full overflow-hidden rounded-md border-gray-300 border bg-grey-50 px-4 py-2">
                            <Image
                              src="/assets/icons/facebook.svg"
                              width={20}
                              height={20}
                              alt="calendar"
                            />
                            <Input
                              placeholder="Your Facebook handle"
                              {...field}
                              className="contact-details-input-field p-regular-14"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactDetails.x"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex-center h-[40px] w-full overflow-hidden rounded-md border-gray-300 border bg-grey-50 px-4 py-2">
                            <Image
                              src="/assets/icons/x.svg"
                              width={20}
                              height={20}
                              alt="calendar"
                            />
                            <Input
                              placeholder="Your X (Twitter) handle"
                              {...field}
                              className="contact-details-input-field p-regular-14"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="button w-full">
                  {type === 'Create' ? 'Create Listing' : 'Update Listing'}
                </Button>
              </form>
            </Form>
          </div>

          <div className="hidden lg:block">
            <Image
              src={'/assets/images/logo.svg'}
              alt="vitiket"
              width={600}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
