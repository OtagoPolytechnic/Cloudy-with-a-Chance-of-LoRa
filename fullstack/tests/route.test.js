// __tests__/api/dust-data.test.js
const request = require('supertest');
const app = require('@/app/api/dust-data'); // Adjust the import according to your project structure

describe('Dust Data API', () => {
  it('should return dust data with status 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toEqual(
      expect.stringContaining('json'),
    );
  });

  it('should handle errors gracefully', async () => {
    // Mock the database call to simulate an error
    const originalDb = db.any; // Store the original method
    db.any = jest.fn().mockRejectedValue(new Error('Database error'));

    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual('Server Error');

    db.any = originalDb; // Restore the original method
  });
});
