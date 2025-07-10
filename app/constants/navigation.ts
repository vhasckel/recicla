import { HomeIcon, UserIcon, MapPinIcon } from '@heroicons/react/24/outline';
import type { ReadonlyURLSearchParams } from 'next/navigation';

export const NAVIGATION_LINKS = [
  {
    name: 'Início',
    href: '/dashboard',
    icon: HomeIcon,
    isActive: (pathname: string, searchParams: ReadonlyURLSearchParams) =>
      pathname === '/dashboard' && !searchParams.get('view'),
  },
  {
    name: 'Coletas',
    href: '/dashboard?view=collection-points',
    icon: MapPinIcon,
    isActive: (pathname: string, searchParams: ReadonlyURLSearchParams) =>
      (pathname === '/dashboard' &&
        searchParams.get('view') === 'collection-points') ||
      pathname.startsWith('/collection-points'),
  },
  {
    name: 'Perfil',
    href: '/dashboard?view=profile',
    icon: UserIcon,
    isActive: (pathname: string, searchParams: ReadonlyURLSearchParams) =>
      (pathname === '/dashboard' && searchParams.get('view') === 'profile') ||
      pathname === '/profile',
  },
];
