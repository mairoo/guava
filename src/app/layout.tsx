import '@/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';
import { MainLayout } from '@/components/layout';
import React from 'react';
import { StoreProvider } from './storeProvider';

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
