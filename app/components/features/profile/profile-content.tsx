'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ProfileSidebar } from '@/components/features/profile/profile-sidebar';
import { IMPACT_METRICS } from '@/constants/metrics';
import { ProfileDetails } from './profile-details';

function ProfileContentInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 769px)');
  const [isClient, setIsClient] = useState(false);

  const userData = {
    name: 'Vanessa Hasckel',
    metrics: IMPACT_METRICS,
  };

  useEffect(() => {
    if (searchParams.get('view') === 'profile' && isDesktop) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [searchParams, isDesktop]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <main className="flex flex-col items-center justify-center p-4 md:h-screen">
      {isClient && !isDesktop && (
        <div className="w-full max-w-[400px]">
          <ProfileDetails
            userName={userData.name}
            impactMetrics={userData.metrics}
            onLogout={handleLogout}
            onShare={() => {}}
          />
        </div>
      )}

      {isClient && isDesktop && (
        <ProfileSidebar
          open={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
          userName={userData.name}
          impactMetrics={userData.metrics}
          onLogout={handleLogout}
        />
      )}
    </main>
  );
}

export function ProfileContent() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ProfileContentInner />
    </Suspense>
  );
}
