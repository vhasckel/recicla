'use client'

import Map from "@/features/dashboard/map";
import { Suspense } from "react";
import { CollectionPointsSidebar } from "@/features/collection-points/collection-points-sidebar";
import { ProfileSidebar } from "@/features/profile/profile-sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isCollectionPointsSidebarOpen, setIsCollectionPointsSidebarOpen] = useState(false);
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const updateSearchParams = useUpdateSearchParams();

  useEffect(() => {
    const viewParam = searchParams.get('view');

    if (isMobile) {
      if (viewParam === 'collection-points') {
        router.push('/collection-points');
      } else if (viewParam === 'profile') {
        router.push('/profile');
      } else if (viewParam === 'collection-points/new') {
        router.push('/collection-points/new');
      }
      setIsCollectionPointsSidebarOpen(false);
      setIsProfileSidebarOpen(false);
    }
  }, [searchParams, isMobile, router]);

  const handleCollectionPointsSidebarOpenChange = (open: boolean) => {
    setIsCollectionPointsSidebarOpen(open);
    if (isMobile) {
      if (open) {
        router.push('/collection-points');
      } else {
        router.push('/dashboard');
      }
    } else {
      if (open) {
        setIsProfileSidebarOpen(false);
      }
    }
  };

  const handleProfileSidebarOpenChange = (open: boolean) => {
    setIsProfileSidebarOpen(open);
    if (isMobile) {
      if (open) {
        router.push('/profile');
      } else {
        router.push('/dashboard');
      }
    } else {
      if (open) {
        setIsCollectionPointsSidebarOpen(false);
      }
    }
  };

  return (
    <main className="relative h-full">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div>Carregando mapa...</div>}>
          <Map />
        </Suspense>
      </div>
      {!isMobile && (
        <>
          <CollectionPointsSidebar
            open={isCollectionPointsSidebarOpen}
            onOpenChange={handleCollectionPointsSidebarOpenChange}
          />
          <ProfileSidebar
            open={isProfileSidebarOpen}
            onOpenChange={handleProfileSidebarOpenChange}
          />
        </>
      )}
    </main>
  );
}