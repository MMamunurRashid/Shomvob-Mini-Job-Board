'use client';

import { useEffect, useState } from 'react';
import ApplyForm from '../../../components/ApplyForm';
import { JobInterface } from '../../../types';
import Loader from '@/components/Loader';

export default function Apply({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<JobInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${params.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch job details');
        }
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError('Error loading job');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  if (loading) return <Loader/>;
  if (error || !job) return <p className="text-red-600">{error || 'Job not found'}</p>;

  return <ApplyForm jobId={job._id} jobTitle={job.title} />;
}
