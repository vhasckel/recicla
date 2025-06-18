// /dashboard/page.tsx
import { DashboardContent } from "@/features/dashboard/dashboard-content";

// Este agora é um Componente de Servidor limpo
export default function DashboardPage() {
  return (
    <div className="h-screen w-full">
      <DashboardContent />
    </div>
  );
}