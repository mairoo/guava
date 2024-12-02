import '@/styles/globals.css';
import { MainLayout } from '@/components/layout';
import AuthProvider from '@/providers/auth/AuthProvider';
import { Metadata, Viewport } from 'next';
import React from 'react';
import { StoreProvider } from './storeProvider';

export const metadata: Metadata = {
  title: '핀코인',
  description: '대한민국 1등 온라인 상품권 쇼핑몰 핀코인',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light dark',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="ko">
    <body>
      <MainLayout>
        <AuthProvider>
          <StoreProvider>{children}</StoreProvider>
        </AuthProvider>
      </MainLayout>
    </body>
  </html>
);

export default RootLayout;
