'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import PostJobForm from '../../../components/PostJobForm';
import { useEffect } from 'react';

export default function PostJob() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/admin/login');
    }
  }, [token, router]);

  if (!token) {
    return null; // Redirecting to login
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
      <PostJobForm />
    </div>
  );
}