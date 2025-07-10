import { DesktopNav } from '@/components/layout/desktop-nav';
import { MobileNav } from '@/components/layout/mobile-nav';
import Header from '@/components/layout/header';
import { Chatbot } from '@/components/features/chatbot/chatbot';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <DesktopNav />
        <main className="flex-1">
          {children}
          <Chatbot />
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
