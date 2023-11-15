const Api = {
  USER_API: process.env.EXTERNAL_USER_API_URL || "http://localhost:3004",
  FEED_API: process.env.EXTERNAL_FEED_API_URL || "http://localhost:3001",
  PRESCRIPTION_API: process.env.EXTERNAL_PRESCRIPTION_API_URL || "http://localhost:3005",
}

export default Api;
