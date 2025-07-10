import { Suspense } from 'react';
import { DashboardContent } from '@/components/features/dashboard/dashboard-content';

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
          <p className="text-lg text-gray-600">Carregando...</p>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
