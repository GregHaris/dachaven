import getUserId from '@/utils/userId';
import ProductListingsForm from '@shared/ProductListingForm';
import ProductListingHeading from '@shared/ProductListingHeading';

const CreateProductListings = async () => {
  const userId = await getUserId();

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
