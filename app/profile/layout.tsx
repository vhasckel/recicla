import MobileNav from "@/components/layout/mobile-nav";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1">{children}</div>
      <MobileNav />
    </div>
  );
} 