'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { Input } from '../ui/input';

const Search = ({placeholder = 'search event...' }: {placeholder?: string}) => {
  const [query, setQuery] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  // update the URL based on the search query with a debounce delay
  useEffect(() => {
    let newUrl = '';

    // Update the URL with the search query or remove the query parameter if empty
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query'],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, router, searchParams]);

  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py2">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
      />
      <Input
        type="text"
        placeholder={placeholder}
        className="p-regular-16 input-field "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
