// /dashboard/page.tsx
import { DashboardContent } from "@/features/dashboard/dashboard-content";
import { Suspense } from "react";

// Este agora é um Componente de Servidor limpo
export default function DashboardPage() {
  return (
    // O Suspense na página principal mostra um fallback enquanto o JS do cliente carrega
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Carregando Dashboard...</p>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}