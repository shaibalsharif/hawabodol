import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Create the connection
const connectionString = process.env.db_url || ""
const client = postgres(connectionString)
export const db = drizzle(client, { schema })
