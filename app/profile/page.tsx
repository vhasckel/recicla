import { Suspense } from 'react';
import { ProfileContent } from '@/components/features/profile/profile-content';

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
          <p className="text-lg text-gray-600">Carregando...</p>
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
