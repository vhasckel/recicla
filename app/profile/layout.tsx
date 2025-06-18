import MobileNav from '@/components/layout/mobile-nav';
import DesktopNav from '@/components/layout/desktop-nav';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <DesktopNav />
      <div className="flex-1">{children}</div>
      <MobileNav />
    </div>
  );
}
