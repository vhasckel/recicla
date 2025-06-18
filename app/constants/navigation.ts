import { HomeIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';

export const NAVIGATION_LINKS = [
  {
    href: '/dashboard',
    name: 'Home',
    icon: HomeIcon,
  },
  {
    href: '/dashboard?view=collection-points',
    name: 'Pontos',
    icon: MapPinIcon,
  },
  {
    href: '/dashboard?view=profile',
    name: 'Perfil',
    icon: UserIcon,
  },
];
