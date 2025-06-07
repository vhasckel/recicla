import { Suspense } from "react";
import { CollectionPointsWrapper } from "@/features/collection-points/components/collection-points-wrapper";
import { SearchWrapper } from "@/features/collection-points/components/search-wrapper";

export default function CollectionPoints() {
    return (
        <main>
            <Suspense fallback={<div>Carregando...</div>}>
                <SearchWrapper />
            </Suspense>
            <Suspense fallback={<div>Carregando pontos de coleta...</div>}>
                <CollectionPointsWrapper />
            </Suspense>
        </main>
    );
}