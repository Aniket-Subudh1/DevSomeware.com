import Logo from '@/assets/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { navItems } from '@/data/nav.config';

export const Navbar = () => {
  return (
    <header className="sticky top-5 mx-auto z-[999] w-[80%] max-w-screen-md bg-background-1/2 backdrop-blur-lg border border-white/10 rounded-xl shadow-md px-6 py-3 hidden md:flex items-center justify-between">
      
      <Link href="/" className="flex items-center">
        <Image src={Logo} alt="DWS Logo" width={70} height={50} className="relative z-10" />
      </Link>

  
      <div className="flex items-center gap-6 mr-10">
        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className="relative text-neutral-600 dark:text-neutral-50 flex items-center space-x-1 hover:text-neutral-500 dark:hover:text-neutral-300"
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
      </div>
    </header>
  );
};
