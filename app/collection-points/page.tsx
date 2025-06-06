import { Search } from "@/features/collection-points/components/search";
import { Suspense } from "react";
import { CollectionPointsWrapper } from "@/features/collection-points/components/collection-points-wrapper";

export default function CollectionPoints() {
    return (
        <main>
            <Suspense fallback={<div>Carregando...</div>}>
                <Search />
            </Suspense>
            <Suspense fallback={<div>Carregando pontos de coleta...</div>}>
                <CollectionPointsWrapper />
            </Suspense>
        </main>
    );
}