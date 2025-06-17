'use client'

import Map from "@/features/dashboard/map";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { CollectionPointsSidebar } from "@/features/collection-points/collection-points-sidebar";
import { ProfileSidebar } from "@/features/profile/profile-sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const VIEW_PARAM_COLLECTION_POINTS = 'collection-points';
const VIEW_PARAM_PROFILE = 'profile';
const VIEW_PARAM_COLLECTION_POINTS_NEW = 'collection-points/new';
const DASHBOARD_ROUTE = '/dashboard';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isCollectionPointsSidebarOpen, setIsCollectionPointsSidebarOpen] = useState(false);
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

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
        <Suspense fallback={<div>Carregando mapa...</div>}>
          <Map />
        </Suspense>
      </div>
      {!isMobile && (
        <>
          <Suspense fallback={<div>Carregando sidebar...</div>}>
            <CollectionPointsSidebar
              open={isCollectionPointsSidebarOpen}
              onOpenChange={handleCollectionPointsSidebarOpenChange}
            />
          </Suspense>
          <Suspense fallback={<div>Carregando perfil...</div>}>
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

const LazyDashboardContent = dynamic(() => Promise.resolve(DashboardContent), {
  ssr: false,
});

export default function Dashboard() {
  return (
    <Suspense fallback={<div>Carregando dashboard...</div>}>
      <LazyDashboardContent />
    </Suspense>
  )
}