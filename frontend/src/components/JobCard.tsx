'use client';
import Link from 'next/link';
import { JobInterface } from '../types';

interface JobCardProps {
  job: JobInterface;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div>
      <Link href={`/jobs/${job._id}`}>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
          <p className="text-gray-600 mb-2">{job.company} — {job.location}</p>
          <Link href={`/jobs/${job._id}`} className="text-blue-500 hover:underline text-sm font-medium">
            View Details →
          </Link>
        </div>
      </Link>
    </div>
  );
}
