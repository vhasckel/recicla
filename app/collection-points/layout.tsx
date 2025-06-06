import MobileNav from "@/components/layout/mobile-nav";
import Header from "@/components/layout/header";

export default function ColletionPointsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-1 pt-16 mt-2">{children}</div>
      <MobileNav />
    </div>
  );
} 