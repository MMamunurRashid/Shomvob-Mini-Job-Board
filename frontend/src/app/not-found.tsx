'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-xl mt-4 text-gray-700">Page Not Found</p>
        <p className="text-gray-500 mt-2">Sorry, the page you are looking for does not exist.</p>
        <Link href="/" className="mt-6 inline-block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
