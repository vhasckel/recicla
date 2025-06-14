import MobileNav from "@/components/layout/mobile-nav";
import Header from "@/components/layout/header";
import DesktopNav from "@/components/layout/desktop-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <DesktopNav />
      <div className="flex-1 pt-16">{children}</div>
      <MobileNav />
    </div>
  );
} 