// app/apply/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import ApplyForm from '@/components/ApplyForm';
import { JobInterface } from '@/types';
import Loader from '@/components/Loader';

interface Props {
  params: Promise<{ id: string }>;
}

export default function Apply({ params }: Props) {
  const [job, setJob] = useState<JobInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchJob = async () => {
      const { id } = await params; 
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`);
        if (!res.ok) throw new Error('Failed to fetch job details');
        const data = await res.json();
        setJob(data);
      } catch {
        setError('Error loading job');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [params]);

  if (loading) return <Loader />;
  if (error || !job) return <p className="text-red-600">{error || 'Job not found'}</p>;

  return <ApplyForm jobId={job._id} jobTitle={job.title} />;
}
