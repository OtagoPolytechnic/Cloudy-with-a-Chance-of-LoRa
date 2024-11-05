const rateLimit = {};
const TIME_WINDOW = 10 * 60 * 1000; // 10 minutes in milliseconds
const MAX_REQUESTS = 100;

export const isRateLimited = (ip) => {
  const now = Date.now();

  if (!rateLimit[ip]) {
    rateLimit[ip] = { requests: 1, lastRequest: now };
    return false;
  }

  const timeElapsed = now - rateLimit[ip].lastRequest;

  if (timeElapsed > TIME_WINDOW) {
    rateLimit[ip] = { requests: 1, lastRequest: now };
    return false;
  }

  rateLimit[ip].lastRequest = now;
  rateLimit[ip].requests += 1;

  return rateLimit[ip].requests > MAX_REQUESTS;
};
