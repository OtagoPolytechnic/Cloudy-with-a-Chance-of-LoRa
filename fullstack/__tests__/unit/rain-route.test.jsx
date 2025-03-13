// /__tests_/rain-data.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '../../src/app/api/rain-data/route';
import { isRateLimited } from '../../src/app/utils/ratelimit';
import db from '../../src/db';

vi.mock('../../src/app/utils/ratelimit', () => ({
  isRateLimited: vi.fn(),
}));

vi.mock('../../src/db', () => ({
  default: {
    any: vi.fn(),
  },
}));

describe('API Route: /api/rain-data', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return rainfall-measurement data successfully', async () => {
    // Mock database and rate limiting behavior
    const mockData = [
      { id: 1, timestamp: '2024-11-15T00:00:00Z', value: 0.234 },
    ];
    db.any.mockResolvedValue(mockData);
    isRateLimited.mockReturnValue(false);

    // Create a mock request
    const request = {
      headers: new Map([['x-forwarded-for', '127.0.0.1']]),
    };

    // Invoke the handler
    const response = await GET(request);

    // Assertions
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockData);
    expect(db.any).toHaveBeenCalledWith(
      'select * FROM rainfall_measurement ORDER BY timestamp DESC LIMIT 1',
    );
    expect(isRateLimited).toHaveBeenCalledWith('127.0.0.1', 105);
  });

  it('should return 429 when rate limited', async () => {
    // Simulate rate limiting
    isRateLimited.mockReturnValue(true);

    const request = {
      headers: new Map([['x-forwarded-for', '127.0.0.1']]),
    };

    const response = await GET(request);

    // Assertions
    expect(response.status).toBe(429);
    expect(await response.text()).toBe('Too many requests');
    expect(isRateLimited).toHaveBeenCalledWith('127.0.0.1', 105);
    expect(db.any).not.toHaveBeenCalled();
  });

  it('should return 500 on server error', async () => {
    // Simulate a database error
    db.any.mockRejectedValue(new Error('Database error'));
    isRateLimited.mockReturnValue(false);

    const request = {
      headers: new Map([['x-forwarded-for', '127.0.0.1']]),
    };

    const response = await GET(request);

    // Assertions
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: 'Server Error' });
    expect(db.any).toHaveBeenCalledWith(
      'select * FROM rainfall-measurement ORDER BY timestamp DESC LIMIT 1',
    );
  });
});
