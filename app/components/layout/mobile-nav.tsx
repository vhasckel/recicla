'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { NAVIGATION_LINKS } from '@/constants/navigation';

export function MobileNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const links = NAVIGATION_LINKS;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white md:hidden">
      <nav className="flex h-16 items-center justify-around">
        {links.map((link) => {
          const LinkIcon = link.icon;
          const isActive = link.isActive(pathname, searchParams);

          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex flex-col items-center justify-center gap-1 p-2 text-sm',
                {
                  'text-primary': isActive,
                  'text-gray-500': !isActive,
                }
              )}
            >
              <LinkIcon className="h-6 w-6" />
              <span className="text-xs">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
