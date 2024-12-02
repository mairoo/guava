import { FooterContent } from '@/components/FooterContent';
import { Footer, Header } from '@/components/layout';

import React, { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-100 p-4">{children}</main>
      <Footer>
        <FooterContent />
      </Footer>
    </div>
  );
};
