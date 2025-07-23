'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import JobDetails from '../../../components/JobDetails';
import { JobInterface } from '../../../types';
import Loader from '@/components/Loader';

export default function Job({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<JobInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${params.id}`);

        if (!response.ok) {
          if (response.status === 404) {
            // Redirect to not-found page
            router.replace('/not-found');
            return;
          } else {
            throw new Error('Failed to fetch job');
          }
        }

        const data: JobInterface = await response.json();

        // If backend returns empty object or invalid structure
        if (!data || !data._id) {
          router.replace('/not-found');
          return;
        }

        setJob(data);
      } catch (err) {
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [params.id, router]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-red-600 text-center mt-8">
        {error || 'Something went wrong. Please try again later.'}
      </p>
    );
  }

  if (!job) {
    return (
      <p className="text-gray-500 text-center mt-8">
        Job not found or unavailable.
      </p>
    );
  }

  return <JobDetails job={job} />;
}
