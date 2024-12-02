import { FooterContent } from '@/components/FooterContent';
import { HeaderContent } from '@/components/HeaderContent';
import { Footer, Header } from '@/components/layout';

import React, { ComponentPropsWithoutRef, ReactNode } from 'react';

interface MainLayoutProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header className="w-full text-sm shadow-sm">
        <HeaderContent />
      </Header>
      <main className="flex-1 bg-white p-4">{children}</main>
      <Footer className="w-full text-sm">
        <FooterContent />
      </Footer>
    </div>
  );
};
