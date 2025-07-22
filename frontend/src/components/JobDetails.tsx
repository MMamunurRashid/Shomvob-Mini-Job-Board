'use client';
import Link from 'next/link';
import { JobInterface } from '../types';

interface JobDetailsProps {
  job: JobInterface;
}

export default function JobDetails({ job }: JobDetailsProps) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
      <p className="text-gray-600 mb-2">{job.company} - {job.location}</p>
      <p className="text-gray-800 mb-4">{job.description}</p>
      <Link
        href={`/apply/${job._id}`}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Apply Now
      </Link>
    </div>
  );
}