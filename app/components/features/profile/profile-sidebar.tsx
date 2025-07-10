'use client';

import { Sheet, SheetContent } from '@/components/ui/sheet';
import { ImpactMetricProps } from '@/types/impact-metric';
import { ProfileDetails } from './profile-details';

interface ProfileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  impactMetrics: ImpactMetricProps[];
  onLogout: () => void;
}

export function ProfileSidebar({
  open,
  onOpenChange,
  userName,
  impactMetrics,
  onLogout,
}: ProfileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="z-[100] flex w-80 flex-col sm:w-96">
        <div className="p-4">
          <ProfileDetails
            userName={userName}
            impactMetrics={impactMetrics}
            onLogout={onLogout}
            onShare={() => {}}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
