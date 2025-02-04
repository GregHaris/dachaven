import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="flex flex-col wrapper gap-4 p-5 text-center sm:flex-row sm:justify-between sm:items-center">
        <Link href={'/'}>
          <Image
            src={'/assets/images/logo.svg'}
            alt="logo"
            width={128}
            height={38}
          />
        </Link>
        <p className="text-sm">{currentYear} Vitiket. All Right Reserved</p>
      </div>
    </footer>
  );
};
