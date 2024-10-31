const rateLimit = {};
const TIME_WINDOW = 15 * 60 * 1000;

export const isRateLimited = (ip, MAX_REQUESTS) => {
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

  if (rateLimit[ip].requests > MAX_REQUESTS) {
    return true;
  }

  return false;
};
