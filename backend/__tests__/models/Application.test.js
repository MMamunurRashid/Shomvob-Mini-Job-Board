// __tests__/models/Application.test.js
const mongoose = require('mongoose');
const Application = require('../../src/models/Application');

describe('Application Model', () => {
  it('should create an application with valid data', async () => {
    const applicationData = {
      jobId: new mongoose.Types.ObjectId(),
      jobTitle: 'Software Engineer',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      cv: 'resume.pdf',
      note: 'Interested in the role',
    };

    const application = new Application(applicationData);
    const savedApplication = await application.save();

    expect(savedApplication._id).toBeDefined();
    expect(savedApplication.email).toBe(applicationData.email);
    expect(savedApplication.createdAt).toBeDefined();
  });

  it('should fail if required fields are missing', async () => {
    const application = new Application({});

    await expect(application.save()).rejects.toThrow();
  });
});