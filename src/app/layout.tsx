import '@/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';
import React from 'react';
import { StoreProvider } from './storeProvider';

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <AuthProvider>
        <StoreProvider>{children}</StoreProvider>
      </AuthProvider>
    </body>
  </html>
);

export default RootLayout;
