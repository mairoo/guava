import '@/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';
import React from 'react';
import { StoreProvider } from './storeProvider';

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="ko">
    <body>
      <div className="min-h-screen flex flex-col">
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-xl font-bold">Header</h1>
        </header>

        <main className="flex-1 bg-gray-100 p-4">
          <AuthProvider>
            <StoreProvider>{children}</StoreProvider>
          </AuthProvider>
        </main>

        <footer className="bg-gray-800 text-white p-4 font-bold">
          <div className="container mx-auto">
            <p className="text-center">&copy; 2024 Your Website</p>
          </div>
        </footer>
      </div>
    </body>
  </html>
);

export default RootLayout;
