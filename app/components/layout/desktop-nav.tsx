'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { NAVIGATION_LINKS } from '@/constants/navigation';

export function DesktopNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const links = NAVIGATION_LINKS;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 hidden border-t border-gray-200 bg-white md:block">
      <nav className="flex h-16 items-center justify-center gap-5">
        {links.map((link) => {
          const LinkIcon = link.icon;
          const isActive =
            link.href === '/dashboard'
              ? pathname === link.href && !searchParams.get('view')
              : link.href === '/dashboard?view=collection-points'
                ? (pathname === '/dashboard' &&
                    searchParams.get('view') === 'collection-points') ||
                  pathname === '/collection-points' ||
                  pathname === '/collection-points/new'
                : link.href === '/dashboard?view=profile'
                  ? (pathname === '/dashboard' &&
                      searchParams.get('view') === 'profile') ||
                    pathname === '/profile'
                  : pathname.startsWith(link.href);

          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex items-center justify-center gap-1 p-2 text-sm',
                {
                  'text-primary': isActive,
                  'text-gray-500': !isActive,
                }
              )}
            >
              <LinkIcon className="h-6 w-6" />
              <span className="text-base">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
