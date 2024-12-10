import '@/styles/globals.css';
import { MainLayout } from '@/components/layout';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/providers/auth/AuthProvider';
import { Metadata, Viewport } from 'next';
import { Nanum_Gothic } from 'next/font/google';
import React from 'react';
import { StoreProvider } from './storeProvider';

const nanum = Nanum_Gothic({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '핀코인',
  description: '대한민국 1등 온라인 상품권 쇼핑몰 핀코인',
  icons: {
    icon: 'https://pincoin-s3.s3.amazonaws.com/static/images/shop/default/favicon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light dark',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="ko" className={nanum.className}>
    <body>
      <StoreProvider>
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
          <Toaster />
        </AuthProvider>
      </StoreProvider>
    </body>
  </html>
);

export default RootLayout;
