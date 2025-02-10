import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';

import { formatDateTime } from '@/lib/utils';
import { IProductListing } from '@/lib/database/models/productListing.model';

import { DeleteConfirmation } from './DeleteConfirmation';

type CardProps = {
  productListing: IProductListing;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = async ({ productListing, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = await auth();

  // Type assertion to help TypeScript understand the structure
  const claims = sessionClaims as CustomJwtSessionClaims;

  // Access userId from the nested object
  const userId = claims?.userId?.userId as string;

  const isProductListingsCreator =
    userId === productListing.seller._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/productListings/${productListing._id}`}
        style={{ backgroundImage: `url(${productListing.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500"
      />
      {isProductListingsCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/productListings/${productListing._id}/update`}>
            <Image
              src={'/assets/icons/edit.svg'}
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
          <DeleteConfirmation productListingId={productListing._id} />
        </div>
      )}
      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semi-bold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {productListing.price}
            </span>
            <p className="p-semi-bold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 whitespace-nowrap line-clamp-1">
              {productListing.category.name}
            </p>
          </div>
        )}
        <p className="p-medium-16 md:p-medium-18 text-gray-500">
          {formatDateTime(productListing.createdAt).dateTime}
        </p>
        <Link href={`/productListings/${productListing._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {productListing.title}
          </p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {productListing.seller.firstName} {productListing.seller.lastName}
          </p>
          {hasOrderLink && (
            <Link
              href={`/orders?productListingId=${productListing._id}`}
              className="flex gap-2"
            >
              <p className="text-primary-500">Order Details</p>
              <Image
                src={'/assets/icons/arrow.svg'}
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
