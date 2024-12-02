import { FooterContent } from '@/components/FooterContent';
import { HeaderContent } from '@/components/HeaderContent';
import { Footer, Header } from '@/components/layout';

import React, { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header>
        <HeaderContent />
      </Header>
      <main className="flex-1 bg-white p-4">{children}</main>
      <Footer>
        <FooterContent />
      </Footer>
    </div>
  );
};
