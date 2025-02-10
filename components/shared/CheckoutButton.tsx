'use client';

import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

import { Button } from '../ui/button';
import { IProductListing } from '@/lib/database/models/productListing.model';
import { hasUserPurchasedProductListings } from '@/lib/actions/order.actions';
import Checkout from './Checkout';

const CheckoutButton = ({
  productListing,
}: {
  productListing: IProductListing;
}) => {
  const { isLoaded, user } = useUser();
  const [hasPurchased, setHasPurchased] = useState(false);

  useEffect(() => {
    const checkPurchase = async () => {
      if (user) {
        const userId = user.publicMetadata.userId as string;
        const purchased = await hasUserPurchasedProductListings(
          userId,
          productListing._id
        );
        setHasPurchased(purchased ?? false);
      }
    };

    checkPurchase();
  }, [user, productListing._id]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const userId = user?.publicMetadata.userId as string;
  const isProductListingsCreator =
    userId === productListing.seller._id.toString();
  const hasProductListingsFinished =
    new Date(productListing.endDateTime) < new Date();

  return (
    !isProductListingsCreator && (
      <div className="flex item-center gap-3">
        {hasProductListingsFinished ? (
          <p className="p-2 text-red-400">
            Sorry, tickets are no longer available.
          </p>
        ) : hasPurchased ? (
          <p className="p-2 text-red-400">Ticket already purchased</p>
        ) : (
          <>
            <SignedOut>
              <SignInButton>
                <Button
                  className="button cursor-pointer rounded-full"
                  size={'lg'}
                  asChild
                >
                  Get Tickets
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
