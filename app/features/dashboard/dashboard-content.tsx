// @/features/dashboard/components/dashboard-content.tsx
'use client'

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Map from "@/features/dashboard/map";
import { CollectionPointsSidebar } from "@/features/collection-points/collection-points-sidebar";
import { ProfileSidebar } from "@/features/profile/profile-sidebar";

// As constantes e toda a lógica foram movidas para cá
const VIEW_PARAM_COLLECTION_POINTS = 'collection-points';
const VIEW_PARAM_PROFILE = 'profile';
const VIEW_PARAM_COLLECTION_POINTS_NEW = 'collection-points/new';
const DASHBOARD_ROUTE = '/dashboard';

export function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isCollectionPointsSidebarOpen, setIsCollectionPointsSidebarOpen] = useState(false);
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Este useEffect agora vive seguramente dentro de um componente de cliente
  useEffect(() => {
    const viewParam = searchParams.get('view');

    if (isMobile) {
      if (viewParam === VIEW_PARAM_COLLECTION_POINTS) {
        router.push('/collection-points');
      } else if (viewParam === VIEW_PARAM_PROFILE) {
        router.push('/profile');
      } else if (viewParam === VIEW_PARAM_COLLECTION_POINTS_NEW) {
        router.push('/collection-points/new');
      }
      setIsCollectionPointsSidebarOpen(false);
      setIsProfileSidebarOpen(false);
    } else {
      if (viewParam === VIEW_PARAM_COLLECTION_POINTS || viewParam === VIEW_PARAM_COLLECTION_POINTS_NEW) {
        setIsCollectionPointsSidebarOpen(true);
        setIsProfileSidebarOpen(false);
      } else if (viewParam === VIEW_PARAM_PROFILE) {
        setIsProfileSidebarOpen(true);
        setIsCollectionPointsSidebarOpen(false);
      } else {
        setIsCollectionPointsSidebarOpen(false);
        setIsProfileSidebarOpen(false);
      }
    }
  }, [searchParams, isMobile, router]);

  const handleCollectionPointsSidebarOpenChange = (open: boolean) => {
    setIsCollectionPointsSidebarOpen(open);
    if (isMobile) {
      if (open) {
        router.push(VIEW_PARAM_COLLECTION_POINTS);
      } else {
        router.push(DASHBOARD_ROUTE);
      }
    } else {
      if (open) {
        setIsProfileSidebarOpen(false);
      } else {
        router.push(DASHBOARD_ROUTE);
      }
    }
  };

  const handleProfileSidebarOpenChange = (open: boolean) => {
    setIsProfileSidebarOpen(open);
    if (isMobile) {
      if (open) {
        router.push(VIEW_PARAM_PROFILE);
      }
      else {
        router.push(DASHBOARD_ROUTE);
      }
    } else {
      if (open) {
        setIsCollectionPointsSidebarOpen(false);
      } else {
        router.push(DASHBOARD_ROUTE);
      }
    }
  };

  return (
    <main className="relative h-full">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="flex h-full w-full items-center justify-center bg-gray-200">Carregando mapa...</div>}>
          <Map />
        </Suspense>
      </div>
      {!isMobile && (
        <>
          <Suspense fallback={null}> {/* Sidebars não precisam de fallback visível */}
            <CollectionPointsSidebar
              open={isCollectionPointsSidebarOpen}
              onOpenChange={handleCollectionPointsSidebarOpenChange}
            />
          </Suspense>
          <Suspense fallback={null}>
            <ProfileSidebar
              open={isProfileSidebarOpen}
              onOpenChange={handleProfileSidebarOpenChange}
            />
          </Suspense>
        </>
      )}
    </main>
  );
}