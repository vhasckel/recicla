'use client'

import { useSearchParams } from "next/navigation"
import { Search } from "./search"

export function SearchWrapper() {
    const searchParams = useSearchParams();
    return <Search searchParams={searchParams} />;
} 