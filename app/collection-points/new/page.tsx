'use client';

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const CollectionPointForm = dynamic(() => import("@/features/collection-points/components/collection-point-form"), {
  ssr: false,
});

function NewCollectionPointPageInner() {
  const router = useRouter();

  return (
    <main className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-white p-4 border-b">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Cadastrar novo ponto</h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <CollectionPointForm />
      </div>
    </main>
  );
}

export default function NewCollectionPointPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Carregando...</p>
      </div>
    }>
      <NewCollectionPointPageInner />
    </Suspense>
  );
}