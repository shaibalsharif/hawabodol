import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DB_URL || "",
  },
} satisfies Config
