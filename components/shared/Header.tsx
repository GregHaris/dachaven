import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs';
import { Button } from '@ui/button';
import Image from 'next/image';
import Link from 'next/link';

import MobileNav from './MobileNav';
import NavItems from './NavItems';
import Search from './Search';
import CategoryFilter from './CategoryFilter';

export const Header = () => {
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

        <SignedIn>
          <div className="hidden md:flex-between w-full max-w-xs">
            <NavItems />
          </div>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3 mr-4">
          <SignedIn>
            <UserButton />
            <MobileNav/>
          </SignedIn>
          <SignedOut>
            <Button asChild className=" cursor-pointer rounded-full" size={'lg'}>
              <SignInButton />
            </Button>
          </SignedOut>
        </div>
      </div>
      <div className="wrapper flex flex-col gap-5 md:flex-row">
        <Search />
        <CategoryFilter />
      </div>
    </header>
  );
};
