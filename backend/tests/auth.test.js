const request = require('supertest');
const app = require('../src/index');
const db = require('../src/db');

describe('auth tests', () => {
  test('health endpoint', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
