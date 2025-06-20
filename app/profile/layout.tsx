import { MobileNav } from '@/components/layout/mobile-nav';
import { DesktopNav } from '@/components/layout/desktop-nav';
import { Chatbot } from '@/components/features/chatbot/chatbot';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
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
