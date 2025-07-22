'use client';
import { useState, useEffect } from 'react';
import JobDetails from '../../../components/JobDetails';
import { JobInterface } from '../../../types';

export default function Job({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<JobInterface | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${params.id}`);
        const data: JobInterface = await response.json();
        setJob(data);
      } catch (err) {
        setError('Failed to load job details');
      }
    };
    fetchJob();
  }, [params.id]);

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <JobDetails job={job} />
    </div>
  );
}