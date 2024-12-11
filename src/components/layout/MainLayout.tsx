import { Footer, FooterContent } from '@/components/footer';
import { DesktopHeaderContent, Header } from '@/components/header';
import { Container, Main } from '@/components/layout';
import React, { ComponentPropsWithoutRef, ReactNode } from 'react';

interface MainLayoutProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header className="w-full text-sm shadow-sm">
        <DesktopHeaderContent />
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
