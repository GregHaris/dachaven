import { SearchUsers } from './SearchUsers';
import SetUsersRoles from './setUsersRoles';
import { SearchParamProps } from '@/types';

export default async function AdminDashboard({
  searchParams,
}: SearchParamProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <p>
        This is the protected admin dashboard restricted to users with the
        `admin` role.
      </p>

      <SearchUsers />
      <SetUsersRoles searchParams={resolvedSearchParams} />
    </>
  );
}
