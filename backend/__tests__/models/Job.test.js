// __tests__/models/Job.test.js
const mongoose = require('mongoose');
const Job = require('../../src/models/Job');

describe('Job Model', () => {
  it('should create a job with valid data', async () => {
    const jobData = {
      title: 'Software Engineer',
      companyName: 'Tech Corp',
      location: 'New York',
      salary: '$100,000',
      deadline: new Date('2025-12-31'),
      jobType: 'Remote',
      experience: '2 years',
      description: 'Develop web applications',
    };

    const job = new Job(jobData);
    const savedJob = await job.save();

    expect(savedJob._id).toBeDefined();
    expect(savedJob.title).toBe(jobData.title);
    expect(savedJob.jobType).toBe('Remote');
    expect(savedJob.createdAt).toBeDefined();
  });

  it('should fail if required fields are missing', async () => {
    const job = new Job({});

    await expect(job.save()).rejects.toThrow();
  });

  it('should fail if jobType is invalid', async () => {
    const jobData = {
      title: 'Software Engineer',
      companyName: 'Tech Corp',
      location: 'New York',
      salary: '$100,000',
      deadline: new Date('2025-12-31'),
      jobType: 'InvalidType', // Invalid enum value
      experience: '2 years',
      description: 'Develop web applications',
    };

    const job = new Job(jobData);
    await expect(job.save()).rejects.toThrow();
  });
});