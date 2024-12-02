import { FooterContent } from '@/components/FooterContent';
import { HeaderContent } from '@/components/HeaderContent';
import { Footer, Header, Main } from '@/components/layout';

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
      <Main className="flex-1 bg-white">
        <div className="container max-w-7xl mx-auto px-2">{children}</div>
      </Main>
      <Footer className="w-full text-sm">
        <FooterContent />
      </Footer>
    </div>
  );
};
