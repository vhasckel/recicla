import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useUpdateSearchParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (newParams: URLSearchParams) => {
      const newQueryString = newParams.toString();
      const currentQueryString = searchParams.toString();

      // Only update history if the query string actually changes
      if (newQueryString !== currentQueryString) {
        window.history.replaceState(
          null,
          '',
          `${pathname}${newQueryString ? `?${newQueryString}` : ''}`
        );
      }
    },
    [pathname, searchParams]
  );

  return updateParams;
}
