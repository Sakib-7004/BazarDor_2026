import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

// Simple local SQLite database. For deployment, use a persistent supported database.
const database = new Database(process.env.DATABASE_URL || "./bazardor.db");
export const auth = betterAuth({
  database,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "local-development-secret-change-this-before-deploying-123456",
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? { google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET } } : {}),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? { github: { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET } } : {})
  }
});
