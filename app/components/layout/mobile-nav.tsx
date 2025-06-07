"use client";

import { HomeIcon, UserIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "Pontos", href: "/collection-points", icon: MapPinIcon },
  { name: "Perfil", href: "/profile", icon: UserIcon },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white md:hidden">
      <nav className="flex h-16 items-center justify-around">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex flex-col items-center justify-center gap-1 p-2 text-sm",
                {
                  "text-primary": pathname === link.href,
                  "text-gray-500": pathname !== link.href,
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