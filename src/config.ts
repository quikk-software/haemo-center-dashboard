const Api = {
  DOCUMENT_API:
    process.env.NEXT_PUBLIC_EXTERNAL_DOCUMENT_API_URL ||
    "http://localhost:3002",
  MESSAGING_API:
    process.env.NEXT_PUBLIC_EXTERNAL_MESSAGING_API_URL ||
    "http://localhost:3003",
  USER_API:
    process.env.NEXT_PUBLIC_EXTERNAL_USER_API_URL || "http://localhost:3004",
  FEED_API:
    process.env.NEXT_PUBLIC_EXTERNAL_FEED_API_URL || "http://localhost:3001",
  PRESCRIPTION_API:
    process.env.NEXT_PUBLIC_EXTERNAL_PRESCRIPTION_API_URL ||
    "http://localhost:3005",
  SCHEDULING_API:
    process.env.NEXT_PUBLIC_EXTERNAL_SCHEDULING_API_URL ||
    "http://localhost:3001",
};

export default Api;
