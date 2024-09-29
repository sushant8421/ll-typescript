class UrlShortener {
  private urlMap: Map<string, string>; // Map to store short URL to long URL mapping
  private baseUrl: string; // Base URL for the shortener
  private counter: number; // Counter to generate unique IDs
  private chars: string; // Base62 character set

  constructor(baseUrl: string) {
    this.urlMap = new Map();
    this.baseUrl = baseUrl;
    this.counter = 1; // Start with counter 1
    this.chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  }

  // Encode an integer to base62
  private encode(id: number): string {
    let shortCode = "";
    while (id > 0) {
      const remainder = id % 62;
      shortCode = this.chars[remainder] + shortCode;
      id = Math.floor(id / 62);
    }
    return shortCode;
  }

  // Shorten the long URL and return the short URL
  public shortenUrl(longUrl: string): string {
    const shortCode = this.encode(this.counter);
    const shortUrl = `${this.baseUrl}/${shortCode}`;

    // Map the short URL to the long URL
    this.urlMap.set(shortCode, longUrl);
    this.counter++; // Increment counter for the next URL

    return shortUrl;
  }

  // Retrieve the original URL using the short URL
  public retrieveUrl(shortCode: string): string | null {
    return this.urlMap.get(shortCode) || null;
  }
}

// Example usage:

// Create a new URL shortener instance
const shortener = new UrlShortener("https://short.ly");

// Shorten a URL
const shortUrl = shortener.shortenUrl(
  "https://www.example.com/some-really-long-url"
);
console.log("Short URL:", shortUrl); // e.g., "https://short.ly/a"

// Retrieve the original URL using the short URL
const originalUrl = shortener.retrieveUrl("a");
console.log("Original URL:", originalUrl);
