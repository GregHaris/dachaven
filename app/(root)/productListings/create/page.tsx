'use client';

import { useUser } from '@clerk/nextjs';
import ProductListingsForm from '@/components/shared/ProductListingForm';

const CreateProductListings = () => {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const userId = user?.id as string;
  const userName = user?.firstName || 'User';

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-1 md:py-5">
        <div className="wrapper text-left">
          <h3 className=" h3-bold">Hey {userName}!</h3>
          <p className="p-regular-16 py-4">
            Ready to add your product? It only takes a few minutes
          </p>
        </div>
      </section>
      <div className="wrapper my-8">
        <ProductListingsForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateProductListings;
