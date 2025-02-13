import { getProductListingById } from '@/lib/actions/productListing.actions';
import getUserId from '@/utils/userId';
import ProductListingsForm from '@/components/shared/ProductListingForm';

type UpdateProductListingsProps = {
  params: Promise<{ id: string }>;
};

const UpdateProductListings = async (props: UpdateProductListingsProps) => {
  const params = await props.params;

  const { id } = params;

  const userId = await getUserId();

  const productListing = await getProductListingById(id);

  return (
    <>
      {' '}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update ProductListings
        </h3>
      </section>
      <div className="wrapper my-8">
        <ProductListingsForm
          userId={userId}
          type="Update"
          productListing={productListing}
          productListingId={productListing._id}
        />
      </div>
    </>
  );
};

export default UpdateProductListings;
