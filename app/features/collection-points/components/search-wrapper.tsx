'use client'

import { useSearchParams } from "next/navigation"
import { Search } from "./search"
import { Suspense } from "react"

export function SearchWrapper() {
    const searchParams = useSearchParams();
    return (
        <Suspense fallback={<div>Carregando busca...</div>}>
            <Search searchParams={searchParams} />
        </Suspense>
    );
} 