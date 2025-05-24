export const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiry
  httpOnly: true, // inaccessible to JS
  secure: true, // HTTPS only
  sameSite: "none", // cross-site allowed
};

// Enable CORS with specific origin and credentials
export const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Replace with your actual frontend origin
  credentials: true,
};
