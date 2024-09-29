interface Bucket {
  capacity: number; // Max number of requests the bucket can hold
  remaining: number; // Current remaining capacity in the bucket
  lastDrip: number; // Last time the bucket was leaked (in milliseconds)
}

class LeakyBucketRL {
  private buckets: Map<string, Bucket> = new Map(); // API key to bucket mapping
  private leakRate: number; // Rate at which requests leak out (in requests per second)
  private capacity: number; // Maximum capacity of each bucket

  constructor(capacity: number, leakRate: number) {
    this.capacity = capacity;
    this.leakRate = leakRate; // Number of requests per second
  }

  private leak(bucket: Bucket): void {
    const now = Date.now();
    const elapsed = (now - bucket.lastDrip) / 1000; // Time since the last request (in seconds)

    // Calculate the number of requests to leak based on elapsed time and leakRate
    const leakAmount = elapsed * this.leakRate;

    // Update the remaining capacity in the bucket after leaking
    bucket.remaining = Math.min(this.capacity, bucket.remaining + leakAmount);
    bucket.lastDrip = now;
  }

  public isRequestAllowed(apiKey: string): boolean {
    const now = Date.now();
    let bucket = this.buckets.get(apiKey);

    // If bucket doesn't exist for the API key, create it
    if (!bucket) {
      bucket = {
        capacity: this.capacity,
        remaining: this.capacity,
        lastDrip: now,
      };
      this.buckets.set(apiKey, bucket);
    }

    // Leak the bucket (simulate the passage of time)
    this.leak(bucket);

    // Check if the request can be added to the bucket
    if (bucket.remaining < 1) {
      return false; // Bucket is full, deny the request
    }

    // Allow the request and decrease the remaining capacity
    bucket.remaining -= 1;
    return true;
  }
}

// Example usage
const leakyBucketRL = new LeakyBucketRL(10, 1); // 10 requests max, 1 request/sec leak rate

function handleIncomingRequest(apiKey: string) {
  if (leakyBucketRL.isRequestAllowed(apiKey)) {
    console.log(`Request allowed for API Key: ${apiKey}`);
  } else {
    console.log(`Rate limit exceeded for API Key: ${apiKey}`);
  }
}

// Simulate some requests
handleIncomingRequest("api-key-1");
handleIncomingRequest("api-key-1");
handleIncomingRequest("api-key-2");
