import { getAllProductListings } from '@/lib/actions/productListing.actions';
import { SearchParamProps } from '@/types';
import Collection from '@shared/Collection';
import CategoryFilter from '@shared/CategoryFilter';

export default async function ProductListings({
  searchParams,
}: SearchParamProps) {
  const resolvedSearchParams = await searchParams;

  const page = Number(resolvedSearchParams.page) || 1;
  const searchText = (resolvedSearchParams.query as string) || '';
  const category = (resolvedSearchParams.category as string) || '';
  const location = (resolvedSearchParams.location as string) || '';
  const limit = resolvedSearchParams.limit
    ? Number(resolvedSearchParams.limit)
    : 6;

  const productListings = await getAllProductListings({
    query: searchText,
    category,
    page,
    location,
    limit: limit,
  });
  return (
    <section
      id="productListings"
      className="wrapper my-2 flex flex-col gap-8 md:gap-12"
    >
      <CategoryFilter />
      <Collection
        data={productListings?.data}
        emptyTitle="Listings Coming Soon!"
        emptyStateSubtext="We're adding new listings every day"
        collectionType="All_Listings"
        limit={limit}
        page={page}
        totalPages={productListings?.totalPages}
      />
    </section>
  );
}
