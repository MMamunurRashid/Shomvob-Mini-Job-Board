'use client';
import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { JobInterface } from '../types';

const JOBS_PER_PAGE = 10;

export default function Home() {
  const [jobs, setJobs] = useState<JobInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
        const data: JobInterface[] = await response.json();
        setJobs(data);
      } catch (err) {
        setError('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const paginatedJobs = jobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Jobs - {paginatedJobs.length>=1 ? paginatedJobs.length : ""}</h1>

      {loading && <p className="text-gray-600">Loading jobs...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {!loading && !error && paginatedJobs.length === 0 && (
        <p className="text-gray-500">No jobs found.</p>
      )}

      <div className="grid gap-6">
        {paginatedJobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>

      {/* {totalPages > 1 && ( */}
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
       {/* )} */}
    </div>
  );
}
