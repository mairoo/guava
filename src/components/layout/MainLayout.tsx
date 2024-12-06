import { FooterContent } from '@/components/FooterContent';
import { HeaderContent } from '@/components/HeaderContent';
import { Container, Footer, Header, Main } from '@/components/layout';

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
        <Container>{children}</Container>
      </Main>
      <Footer className="w-full text-sm">
        <FooterContent />
      </Footer>
    </div>
  );
};
