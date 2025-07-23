'use client';
import Link from 'next/link';
import { JobInterface } from '../types';

interface JobCardProps {
  job: JobInterface;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job._id}`} className="block">
      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
        <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
        <p className="text-gray-600 mb-3">
          {job.companyName} — {job.location}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Deadline: <span className="font-medium">{new Date(job.deadline).toLocaleDateString()}</span>
        </p>

        <span className="text-blue-600 hover:underline text-sm font-medium">
          View Details →
        </span>
      </div>
    </Link>
  );
}
