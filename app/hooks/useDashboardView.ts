import { useRouter, useSearchParams } from 'next/navigation';
import { useMediaQuery } from './useMediaQuery';
import { useCallback, useEffect, useState } from 'react';

const VIEW_PARAMS = {
  COLLECTION_POINTS: 'collection-points',
  PROFILE: 'profile',
  COLLECTION_POINTS_NEW: 'collection-points/new',
};
const DASHBOARD_ROUTE = '/dashboard';

const isCollectionView = (view: string | null) =>
  view === VIEW_PARAMS.COLLECTION_POINTS ||
  view === VIEW_PARAMS.COLLECTION_POINTS_NEW;

export function useDashboardView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewParam = searchParams.get('view');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [isCollectionPointsSidebarOpen, setIsCollectionPointsSidebarOpen] =
    useState(() => !isMobile && isCollectionView(viewParam));
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(
    () => !isMobile && viewParam === VIEW_PARAMS.PROFILE
  );

  useEffect(() => {
    if (isMobile) {
      if (isCollectionView(viewParam)) {
        router.push(`/${viewParam}`);
      } else if (viewParam === VIEW_PARAMS.PROFILE) {
        router.push('/profile');
      }
    } else {
      setIsCollectionPointsSidebarOpen(isCollectionView(viewParam));
      setIsProfileSidebarOpen(viewParam === VIEW_PARAMS.PROFILE);
    }
  }, [viewParam, isMobile, router]);

  const createSidebarHandler = (
    setSidebarOpen: (open: boolean) => void,
    otherSidebarSetter: (open: boolean) => void,
    viewTarget: string
  ) => {
    return useCallback(
      (open: boolean) => {
        setSidebarOpen(open);

        if (isMobile) {
          router.push(open ? `/${viewTarget}` : DASHBOARD_ROUTE);
        } else {
          if (open) {
            otherSidebarSetter(false);
            router.push(`${DASHBOARD_ROUTE}?view=${viewTarget}`);
          } else {
            router.push(DASHBOARD_ROUTE);
          }
        }
      },
      [isMobile, router, setSidebarOpen, otherSidebarSetter, viewTarget]
    );
  };

  const handleCollectionPointsSidebarOpenChange = createSidebarHandler(
    setIsCollectionPointsSidebarOpen,
    setIsProfileSidebarOpen,
    VIEW_PARAMS.COLLECTION_POINTS
  );

  const handleProfileSidebarOpenChange = createSidebarHandler(
    setIsProfileSidebarOpen,
    setIsCollectionPointsSidebarOpen,
    VIEW_PARAMS.PROFILE
  );

  return {
    isMobile,
    isCollectionPointsSidebarOpen,
    isProfileSidebarOpen,
    handleCollectionPointsSidebarOpenChange,
    handleProfileSidebarOpenChange,
  };
}
