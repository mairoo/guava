import '@/styles/globals.css';
import { MainLayout } from '@/components/layout';
import AuthProvider from '@/providers/auth/AuthProvider';
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
