import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

import { Button } from '@ui/button';
import { getProductListingsByUser } from '@/lib/actions/productListing.actions';
import { getOrdersByUser } from '@/lib/actions/order.actions';
import { IOrder } from '@/lib/database/models/order.model';
import { SearchParamProps } from '@/types';
import Collection from '@shared/Collection';

const Dashboard = async ({ searchParams }: SearchParamProps) => {
  const resolvedSearchParams = await searchParams;
  const { sessionClaims } = await auth();

  // Type assertion to help TypeScript understand the structure
  const claims = sessionClaims as CustomJwtSessionClaims;

  // Access userId from the nested object
  const userId = claims?.userId?.userId as string;

  const ordersPage = Number(resolvedSearchParams?.ordersPage) || 1;

  const productListingsPage =
    Number(resolvedSearchParams?.productListingsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });

  const purchasedProducts =
    orders?.data.map((order: IOrder) => order.productListing) || [];

  const userProductListings = await getProductListingsByUser({
    userId,
    page: productListingsPage,
  });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between ">
          <h3 className="h3-bold text-center sm:text-left">My Purchases</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href={'/#productListings'}>
              {' '}
              Explore More Products
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={purchasedProducts}
          emptyTitle="No Purchases Yet"
          emptyStateSubtext="Explore our product listings to find something amazing."
          collectionType="My_Purchases"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <div className="wrapper flex items-center justify-center sm:justify-between ">
            <h3 className="h3-bold text-center sm:text-left">
              Your Products Listings
            </h3>
            <Button asChild size="lg" className="button hidden sm:flex">
              <Link href={'/productListings/create'}>
                {' '}
                List a product
              </Link>
            </Button>
          </div>
        </section>
      }
      <section className="wrapper my-8">
        <Collection
          data={userProductListings?.data}
          emptyTitle="You haven't listed any products yet"
          emptyStateSubtext="It's easy to create your first listing and start selling."
          collectionType="Products_Listed"
          limit={3}
          page={productListingsPage}
          urlParamName="productListingsPage"
          totalPages={userProductListings?.totalPages}
        />
      </section>
    </>
  );
};

export default Dashboard;
