'use client';

import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

import { Button } from '../ui/button';
import { IProductListing } from '@/lib/database/models/productListing.model';
import Checkout from './Checkout';

const CheckoutButton = ({
  productListing,
}: {
  productListing: IProductListing;
}) => {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const userId = user?.publicMetadata.userId as string;
  const isProductListingsCreator =
    userId === productListing.seller._id.toString();

  const isProductAvailable = productListing.isAvailable === false;

  return (
    !isProductListingsCreator && (
      <div className="flex item-center gap-3">
        {!isProductAvailable ? (
          <p className="p-2 text-red-400">
            Sorry, this product is no longer available.
          </p>
        ) : (
          <>
            <SignedOut>
              <SignInButton>
                <Button
                  className="button cursor-pointer rounded-full"
                  size={'lg'}
                  asChild
                >
                  Purchase Item
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Checkout productListing={productListing} userId={userId} />
            </SignedIn>
          </>
        )}
      </div>
    )
  );
};

export default CheckoutButton;
