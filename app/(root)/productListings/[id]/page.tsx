import Image from 'next/image';

import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types';

import CheckoutButton from '@shared/CheckoutButton';
import Collection from '@shared/Collection';
import {
  getProductListingById,
  getRelatedProductListingsByCategory,
} from '@/lib/actions/productListing.actions';

const ProductListingsDetails = async (props: SearchParamProps) => {
  const resolvedSearchParams = await props.searchParams;
  const params = await props.params;

  const { id } = params;

  const productListing = await getProductListingById(id);

  const relatedProductListings = await getRelatedProductListingsByCategory({
    categoryId: productListing.category._id,
    productListingId: productListing._id,
    page: resolvedSearchParams?.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={productListing.imageUrls}
            alt={'hero image'}
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />
          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-2">
              <h2 className="h2-bold">{productListing.title}</h2>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {productListing.price}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {productListing.category.name}
                  </p>
                </div>
                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{' '}
                  <span className="text-primary-500">
                    {productListing.seller.firstName}{' '}
                    {productListing.seller.lastName}
                  </span>
                </p>
              </div>
            </div>
            <CheckoutButton productListing={productListing} />
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src={'/assets/icons/calendar.svg'}
                  alt="calendar"
                  width={32}
                  height={32}
                />
                <div className="p-medium-16 lg:p-regular-20 items-center">
                  <p>
                    {formatDateTime(productListing.startDateTime).dateOnly} -{' '}
                    {formatDateTime(productListing.startDateTime).timeOnly}
                  </p>
                  <p>
                    {formatDateTime(productListing.endDateTime).dateOnly} -{' '}
                    {formatDateTime(productListing.endDateTime).timeOnly}
                  </p>
                </div>
              </div>
              <div className="p-regular-20 flex item-center gap-3">
                <Image
                  src={'/assets/icons/location.svg'}
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-medium-16 lg:p-regular-20">
                  {productListing.location}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-gray-600">What to expect</p>
              <p className="p-medium-16 lg:p-regular-18">
                {productListing.description}
              </p>
              <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
                {productListing.url}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="wrapper my-7 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Products </h2>
        <Collection
          data={relatedProductListings?.data}
          emptyTitle="Listings Coming Soon!"
          emptyStateSubtext="We're adding new listings every day"
          collectionType="All_Listings"
          limit={3}
          page={resolvedSearchParams?.page as string}
          totalPages={relatedProductListings?.totalPages}
        />
      </section>
    </>
  );
};

export default ProductListingsDetails;
