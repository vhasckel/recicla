import Map from "@/features/dashboard/map";
import { Suspense } from "react";

export default function Dashboard() {
    return (
      <main className="h-[calc(100vh-8rem)]">
        <Suspense fallback={<div>Carregando mapa...</div>}>
          <Map />
        </Suspense>
      </main>
    );
  }