'use client';

import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { usePathname, useRouter } from 'next/navigation';

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mb-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const queryTerm = formData.get('search') as string;
          router.push(pathname + '?search=' + queryTerm);
        }}
        className="flex gap-2"
      >
        <label htmlFor="search" className="sr-only">
          Search for users
        </label>
        <Input
          id="search"
          name="search"
          type="text"
          className="input-field p-regular-16"
          placeholder="Search for users"
        />
        <Button
          type="submit"
          className="button"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
