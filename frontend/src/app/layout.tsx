import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';


export const metadata: Metadata = {
  title: 'Job Board',
  description: 'A simple job board application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen max-w-7xl mx-auto bg-gray-100"> 
        <AuthProvider>

          <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">Job Board</Link>
            <nav className="">
              <Link href="/" className="text-white hover:underline mr-4">Home</Link>
              <Link href="/admin/login" className="text-white hover:underline">Admin Login</Link>

          </nav>
          </header>
          <main className="container mx-auto p-4">{children}</main>        
        </AuthProvider>
      </body>
    </html>
  );
}