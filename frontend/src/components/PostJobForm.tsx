'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { JobInterface } from '../types';

export default function PostJobForm() {
  const [formData, setFormData] = useState<Omit<JobInterface, '_id' | 'createdAt'>>({
    title: '',
    companyName: '',
    companyDetails: '',
    location: '',
    salary: '',
    jobType: 'Onsite',
    experience: '',
    deadline: '',
    description: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { token } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to post job');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      console.error(err);
      setError('Failed to post job. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      {success && (
        <div className="bg-green-100 p-4 rounded text-green-800 mb-4">
          Job posted successfully! Redirecting...
        </div>
      )}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Company Details</label>
          <textarea
            name="companyDetails"
            value={formData.companyDetails}
            onChange={handleChange}
            className="w-full p-2 border rounded h-[200px]"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Salary</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Experience</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded h-[200px]"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Application Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={(e) =>
              setFormData({ ...formData, deadline: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          />
        </div>


        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
