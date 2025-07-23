'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApplicationInterface } from '../types';

interface ApplyFormProps {
  jobId: string;
  jobTitle: string;
}

export default function ApplyForm({ jobId, jobTitle }: ApplyFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<ApplicationInterface>({
    jobId,
    jobTitle,
    name: '',
    email: '',
    phone: '',
    cv: '',
    note: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError('Failed to submit application.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-100 p-4 rounded text-green-800">
        Application submitted successfully!
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Apply for {jobTitle}</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled={submitting}
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled={submitting}
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled={submitting}
          />
        </div>
        <div>
          <label className="block text-gray-700">CV Link / Description</label>
          <textarea
            name="cv"
            value={formData.cv}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            rows={5}
            disabled={submitting}
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">
            Tell us about yourself (Optional)
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Write a short note about yourself..."
            maxLength={100}
            rows={4}
            disabled={submitting}
          />
          <p className="text-sm text-gray-500 mt-1">
            {(formData.note ?? '').length} / 100 characters
          </p>

        </div>
        <button
          type="submit"
          disabled={submitting}
          className={`px-4 py-2 rounded text-white ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}
