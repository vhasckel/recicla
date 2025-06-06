import { CollectionPointsList } from "@/features/collection-points/components/list";
import { Search } from "@/features/collection-points/components/search";

export default function CollectionPoints() {
    return (
        <main>
            <Search />
            <CollectionPointsList />
        </main>
    );
}