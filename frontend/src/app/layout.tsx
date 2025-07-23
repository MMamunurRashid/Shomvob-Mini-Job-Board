import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';


export const metadata: Metadata = {
  title: 'Job Board',
  description: 'A simple job board application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen max-w-7xl mx-auto bg-gray-100"> 
        <AuthProvider>
          <Navbar/>          
          <main className="container mx-auto p-4">{children}</main>        
        </AuthProvider>
      </body>
    </html>
  );
}