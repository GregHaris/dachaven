import { SearchParamProps } from '@/types';
import Collection from '@shared/Collection';
import CategoryFilter from '@shared/CategoryFilter';

import { getAllEvents } from '@/lib/actions/event.actions';
import HeroSection from '@/components/shared/DesktopHeroSection';
import MobileHeroSection from '@shared/MobileHero';

export default async function Home({ searchParams }: SearchParamProps) {
  const resolvedSearchParams = await searchParams;

  const page = Number(resolvedSearchParams.page) || 1;
  const searchText = (resolvedSearchParams.query as string) || '';
  const category = (resolvedSearchParams.category as string) || '';
  const location = (resolvedSearchParams.location as string) || '';
  const limit = resolvedSearchParams.limit
    ? Number(resolvedSearchParams.limit)
    : 6;

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    location,
    limit: limit,
  });

  return (
    <>
      <section className="wrapper">
        <div className="hidden md:flex flex-col justify-center gap-8 text-center  bg-primary-50 bg-dotted-pattern bg-contain">
          <h1 className="h1-bold">
            Host, Connect, Celebrate: Your Event, Our Platform!
          </h1>
        </div>
        <HeroSection />
        <MobileHeroSection/>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <CategoryFilter />
        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Check back later"
          collectionType="All_Events"
          limit={limit}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
