// __tests__/routes/applications.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Application = require('../../src/models/Application');
const applicationRoutes = require('../../src/routes/applications');

const app = express();
app.use(express.json());
app.use('/applications', applicationRoutes);

describe('Application Routes', () => {
  it('POST /applications should create an application', async () => {
    const applicationData = {
      jobId: new mongoose.Types.ObjectId(),
      jobTitle: 'Software Engineer',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      cv: 'resume.pdf',
      note: 'Interested in the role',
    };

    const res = await request(app).post('/applications').send(applicationData);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  it('GET /applications should return all applications', async () => {
    const application = new Application({
      jobId: new mongoose.Types.ObjectId(),
      jobTitle: 'Software Engineer',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      cv: 'resume.pdf',
    });
    await application.save();

    const res = await request(app).get('/applications');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('John Doe');
  });
});