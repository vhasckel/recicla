'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"
import { ReadonlyURLSearchParams } from "next/navigation";

interface SearchProps {
    searchParams: ReadonlyURLSearchParams;
}

export function Search({ searchParams }: SearchProps) {
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1");
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    return (
        <div className="relative">
            <label htmlFor="search" className="sr-only">
                Procurar
            </label>
            <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-textColor"
                placeholder="Procurar pontos"
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get("query")?.toString()}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    )
} 