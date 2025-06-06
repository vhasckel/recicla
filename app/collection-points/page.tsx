import { CollectionPointsList } from "@/features/collection-points/components/list";
import { Search } from "@/features/collection-points/components/search";
import { Suspense } from "react";

export default function CollectionPoints() {
    return (
        <main>
            <Suspense fallback={<div>Carregando...</div>}>
                <Search />
            </Suspense>
            <Suspense fallback={<div>Carregando pontos de coleta...</div>}>
                <CollectionPointsList />
            </Suspense>
        </main>
    );
}