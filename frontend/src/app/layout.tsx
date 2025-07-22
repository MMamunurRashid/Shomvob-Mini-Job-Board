import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Job Board',
  description: 'A simple job board application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        
          <header className="bg-blue-600 text-white p-4">
            <Link href="/" className="text-2xl font-bold">Job Board</Link>
          </header>
          <main className="container mx-auto p-4">{children}</main>
        
      </body>
    </html>
  );
}