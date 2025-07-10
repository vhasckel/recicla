'use client';

import { Suspense } from 'react';
import { CollectionPointsSidebar } from '@/components/features/collection-points/collection-points-sidebar';
import { ProfileSidebar } from '@/components/features/profile/profile-sidebar';
import { useDashboardView } from '@/hooks/useDashboardView';
import dynamic from 'next/dynamic';
import type { ImpactMetricProps } from '@/types/impact-metric';

const Map = dynamic(() => import('@/components/features/dashboard/map'), {
  ssr: false,
  loading: () => <p>Carregando mapa...</p>,
});

const userName = 'User';
const impactMetrics: ImpactMetricProps[] = [];
const onLogout = () => {};

export function DashboardContent() {
  const {
    isMobile,
    isCollectionPointsSidebarOpen,
    isProfileSidebarOpen,
    handleCollectionPointsSidebarOpenChange,
    handleProfileSidebarOpenChange,
  } = useDashboardView();

  return (
    <main className="relative h-full">
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              Carregando mapa...
            </div>
          }
        >
          <Map />
        </Suspense>
      </div>
      {!isMobile && (
        <>
          <Suspense fallback={null}>
            <CollectionPointsSidebar
              open={isCollectionPointsSidebarOpen}
              onOpenChange={handleCollectionPointsSidebarOpenChange}
            />
          </Suspense>
          <Suspense fallback={null}>
            <ProfileSidebar
              open={isProfileSidebarOpen}
              onOpenChange={handleProfileSidebarOpenChange}
              userName={userName}
              impactMetrics={impactMetrics}
              onLogout={onLogout}
            />
          </Suspense>
        </>
      )}
    </main>
  );
}
