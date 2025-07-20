const request = require('supertest');
const app = require('../../src/server');
const Bug = require('../../src/models/Bug');
const { setupDB } = require('../test-setup');

// Setup a test database
setupDB('bug-tracker-test');

describe('Bug API Integration Tests', () => {
  beforeEach(async () => {
    await Bug.deleteMany();
  });

  it('should create a new bug', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({
        title: 'Test Bug',
        description: 'This is a test bug'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data.title).toBe('Test Bug');
  });

  it('should get all bugs', async () => {
    await Bug.create([
      { title: 'Bug 1', description: 'Desc 1' },
      { title: 'Bug 2', description: 'Desc 2' }
    ]);

    const res = await request(app).get('/api/bugs');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(2);
    expect(res.body.data.length).toBe(2);
  });
});