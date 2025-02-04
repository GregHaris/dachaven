'use client';

import { usePathname } from 'next/navigation';
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs';
import { Button } from '@ui/button';
import Image from 'next/image';
import Link from 'next/link';

import MobileNav from './MobileNav';
import NavItems from './NavItems';
import SearchByName from './SearchByName';
import CategoryFilter from './CategoryFilter';
import SearchByLocation from './SearchByLocation';

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full border-b">
      <div className="wrapper flex justify-between ">
        <Link href={'/'} className="w-36">
          {' '}
          <Image
            src="/assets/images/logo.svg"
            alt="logo image"
            width={128}
            height={38}
          />
        </Link>

        <div className="flex justify-between gap-3">
          <SignedIn>
            <div className="hidden md:flex-between w-full max-w-xs">
              <NavItems />
            </div>
          </SignedIn>
          <div className="flex w-32 justify-end gap-3 mr-4">
            <SignedIn>
              <UserButton />
              <MobileNav />
            </SignedIn>
            <SignedOut>
              <Button
                asChild
                className=" cursor-pointer rounded-full"
                size={'lg'}
              >
                <SignInButton />
              </Button>
            </SignedOut>
          </div>
        </div>
      </div>
      {pathname === '/' && (
        <div className="wrapper flex flex-col gap-5 md:flex-row">
          <CategoryFilter />
          <div className="flex w-full items-center bg-[#F8F7FA] rounded-full shadow-sm">
            <SearchByName />
            <SearchByLocation />
          </div>
        </div>
      )}
    </header>
  );
};
