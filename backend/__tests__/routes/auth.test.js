// __tests__/routes/auth.test.js
const request = require('supertest');
const express = require('express');
const authRoutes = require('../../src/routes/auth');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth Routes', () => {
  it('POST /auth/login should return a token for valid credentials', async () => {
    process.env.ADMIN_USERNAME = 'admin';
    process.env.ADMIN_PASSWORD = 'password';
    process.env.JWT_SECRET = 'test_secret';

    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'admin', password: 'password' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('POST /auth/login should return 401 for invalid credentials', async () => {
    process.env.ADMIN_USERNAME = 'admin';
    process.env.ADMIN_PASSWORD = 'password';

    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'wrong', password: 'wrong' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });
});