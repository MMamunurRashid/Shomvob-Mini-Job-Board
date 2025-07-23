// __tests__/routes/jobs.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Job = require('../../src/models/Job');
const jobRoutes = require('../../src/routes/jobs');
const jwt = require('jsonwebtoken');

// Mock the auth middleware at the top of the file
jest.mock('../../src/middleware/auth', () => jest.fn((req, res, next) => {
  req.user = { role: 'admin' };
  next();
}));

const app = express();
app.use(express.json());
app.use('/jobs', jobRoutes);

describe('Job Routes', () => {
  let token;

  beforeEach(() => {
    token = jwt.sign({ role: 'admin' }, 'test_secret');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /jobs should return all jobs', async () => {
    const job = new Job({
      title: 'Software Engineer',
      companyName: 'Tech Corp',
      location: 'New York',
      salary: '$100,000',
      deadline: new Date('2025-12-31'),
      jobType: 'Remote',
      experience: '2 years',
      description: 'Develop web applications',
    });
    await job.save();

    const res = await request(app).get('/jobs');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('Software Engineer');
  });

  it('GET /jobs/:id should return a job by ID', async () => {
    const job = new Job({
      title: 'Software Engineer',
      companyName: 'Tech Corp',
      location: 'New York',
      salary: '$100,000',
      deadline: new Date('2025-12-31'),
      jobType: 'Remote',
      experience: '2 years',
      description: 'Develop web applications',
    });
    await job.save();

    const res = await request(app).get(`/jobs/${job._id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Software Engineer');
  });

  it('GET /jobs/:id should return 404 for invalid ID', async () => {
    const res = await request(app).get('/jobs/invalid_id');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Invalid job ID');
  });

  it('POST /jobs should create a job with valid token', async () => {
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

    const res = await request(app)
      .post('/jobs')
      .set('Authorization', `Bearer ${token}`)
      .send(jobData);

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });
});