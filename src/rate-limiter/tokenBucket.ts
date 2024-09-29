class TokenBucket {
  capacity: number; // Maximum number of tokens in the bucket
  tokens: number; // Current number of tokens in the bucket
  refillRate: number; // Number of tokens added per second
  lastRefillTimestamp: number; // Timestamp of the last refill

  constructor(capacity: number, refillRate: number) {
    this.capacity = capacity;
    this.tokens = capacity; // Initially, the bucket is full
    this.refillRate = refillRate;
    this.lastRefillTimestamp = Date.now();
  }

  // Refill the bucket based on the elapsed time since the last refill
  refill() {
    const now = Date.now();
    const elapsedTime = (now - this.lastRefillTimestamp) / 1000; // Elapsed time in seconds

    // Calculate how many tokens to add based on the refill rate
    const refillTokens = elapsedTime * this.refillRate;

    // Add tokens to the bucket but do not exceed the capacity
    this.tokens = Math.min(this.capacity, this.tokens + refillTokens);
    this.lastRefillTimestamp = now;
  }

  // Check if a request can be processed (i.e., if there's a token available)
  tryConsumeToken(): boolean {
    this.refill(); // Refill the bucket before consuming a token
    if (this.tokens >= 1) {
      this.tokens -= 1; // Consume one token
      return true; // Request is allowed
    }
    return false; // Not enough tokens, request is denied
  }
}

class TokenBucketRL {
  buckets: Map<string, TokenBucket>; // Maps API key to the corresponding TokenBucket
  capacity: number;
  refillRate: number;

  constructor(capacity: number, refillRate: number) {
    this.buckets = new Map();
    this.capacity = capacity;
    this.refillRate = refillRate;
  }

  // Function to handle requests based on the API key
  isRequestAllowed(apiKey: string): boolean {
    // If the bucket for this API key does not exist, create a new one
    if (!this.buckets.has(apiKey)) {
      this.buckets.set(apiKey, new TokenBucket(this.capacity, this.refillRate));
    }

    // Get the bucket for this API key
    const bucket = this.buckets.get(apiKey)!;
    return bucket.tryConsumeToken(); // Check if the request is allowed
  }
}

// Example usage
const tokenBucketRL = new TokenBucketRL(10, 1); // 10 tokens max, 1 token added per second

function handleRequest(apiKey: string) {
  if (tokenBucketRL.isRequestAllowed(apiKey)) {
    console.log(`Request allowed for API Key: ${apiKey}`);
  } else {
    console.log(`Rate limit exceeded for API Key: ${apiKey}`);
  }
}

// Simulating some API requests
handleRequest("api-key-1"); // Allowed
handleRequest("api-key-1"); // Allowed
handleRequest("api-key-2"); // Allowed
setTimeout(() => handleRequest("api-key-1"), 2000); // Allowed after 2 seconds (tokens have refilled)
