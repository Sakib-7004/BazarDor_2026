import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

const isProduction = process.env.NODE_ENV === "production";
const authSecret = process.env.BETTER_AUTH_SECRET;
const authUrl = process.env.BETTER_AUTH_URL;

if (isProduction && !authSecret) {
  throw new Error("BETTER_AUTH_SECRET must be configured in production.");
}

if (isProduction && !authUrl) {
  throw new Error("BETTER_AUTH_URL must be configured in production.");
}

// SQLite is intended for local development. Use a persistent database and a
// compatible Better Auth adapter before deploying to serverless hosting.
const database = new Database(process.env.DATABASE_URL || "./bazardor.db");

export const auth = betterAuth({
  database,
  trustedOrigins: [...new Set([authUrl, ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS || "").split(",")].filter((origin): origin is string => Boolean(origin?.trim())).map((origin) => origin.trim()))],
  baseURL: authUrl || "http://localhost:3000",
  secret: authSecret || "local-development-secret-change-this-123456789",
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
  },
});
