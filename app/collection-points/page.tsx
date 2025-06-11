import { Suspense } from "react";
import { CollectionPointsWrapper } from "@/features/collection-points/components/collection-points-wrapper";
import { SearchWrapper } from "@/features/collection-points/components/search-wrapper";
import { Button } from "@/components/common/button";
import Link from "next/link";

export default function CollectionPoints() {
    return (
        <main className="relative flex flex-col gap-2 flex-shrink-0 mx-2 mb-2">
            <Suspense fallback={<div>Carregando...</div>}>
                <SearchWrapper />
            </Suspense>
            <Link href="/collection-points/new" className="w-full">
                <Button className="w-full">
                    <span>Cadastrar novo ponto</span>
                </Button>
            </Link>
            <Suspense fallback={<div>Carregando pontos de coleta...</div>}>
                <CollectionPointsWrapper />
            </Suspense>
        </main>
    );
}