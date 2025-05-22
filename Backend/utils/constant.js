export const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiry
  httpOnly: true, // inaccessible to JS
  secure: true, // HTTPS only
  sameSite: "none", // cross-site allowed
};
