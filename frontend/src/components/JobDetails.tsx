'use client';
import Link from 'next/link';
import { JobInterface } from '../types';

interface JobDetailsProps {
  job: JobInterface;
}

export default function JobDetails({ job }: JobDetailsProps) {
  return (
    <div className="bg-white p-6 rounded shadow max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-1">
        <strong>{job.companyName}</strong> — {job.location}
      </p>
      <p className="text-sm text-gray-500 mb-4">{job.companyDetails}</p>

      <div className="text-gray-700 text-sm mb-4">
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Experience:</strong> {job.experience}</p>
        <p><strong>Job Type:</strong> {job.jobType}</p>
        <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
      </div>

      <div className="text-gray-800 mb-6 whitespace-pre-line">
        {job.description}
      </div>

      <Link
        href={`/apply/${job._id}`}
        className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Apply Now
      </Link>
    </div>
  );
}
