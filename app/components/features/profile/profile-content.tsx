'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ProfileSidebar } from '@/components/features/profile/profile-sidebar';
import { IMPACT_METRICS } from '@/constants/metrics';
import { ProfileDetails } from './profile-details';
import { Loading } from '@/components/ui/loading';
import { useAuth } from '@/contexts/AuthContext';

function ProfileContentInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 769px)');
  const [isClient, setIsClient] = useState(false);
  const { user, isLoading, logout } = useAuth();

  const userData = {
    name: user?.name || 'Usuário',
    email: user?.email,
    city: user?.city,
    state: user?.state,
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
    logout();
    router.push('/login');
    router.refresh();
  };

  if (isLoading) {
    return (
      <main className="flex flex-col items-center justify-center p-4 md:h-screen">
        <Loading message="Carregando perfil..." className="h-screen" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center p-4 md:h-screen">
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
          <p className="text-lg text-gray-600">Usuário não autenticado</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center p-4 md:h-screen">
      {isClient && !isDesktop && (
        <div className="w-full max-w-[400px]">
          <ProfileDetails impactMetrics={userData.metrics} onShare={() => {}} />
        </div>
      )}

      {isClient && isDesktop && (
        <ProfileSidebar
          open={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
          userName={userData.name}
          impactMetrics={userData.metrics}
          onLogout={handleLogout}
          userEmail={userData.email}
          userCity={userData.city}
          userState={userData.state}
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
