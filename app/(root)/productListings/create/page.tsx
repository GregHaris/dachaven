import { auth } from '@clerk/nextjs/server';
import ProductListingsForm from '@shared/ProductListingForm';
import ProductListingHeading from '@shared/ProductListingHeading';

const CreateProductListings = async () => {
  const { sessionClaims } = await auth();

  // Type assertion to help TypeScript understand the structure
  const claims = sessionClaims as CustomJwtSessionClaims;

  // Access userId from the nested object
  const userId = claims?.userId?.userId as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-1 md:py-5">
        <ProductListingHeading />
      </section>
      <div className="wrapper my-8">
        <ProductListingsForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateProductListings;
