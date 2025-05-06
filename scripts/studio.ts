import { createServer } from "node:http"
import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { createStudio } from "drizzle-studio/server"
import * as schema from "../lib/db/schema"

async function main() {
  const connectionString = process.env.db_url || ""

  if (!connectionString) {
    console.error("Database connection string not found. Please set the db_url environment variable.")
    process.exit(1)
  }

  // Create the connection
  const client = postgres(connectionString)
  const db: PostgresJsDatabase<typeof schema> = drizzle(client, { schema })

  // Run migrations if --migrate flag is provided
  if (process.argv.includes("--migrate")) {
    console.log("Running migrations...")
    try {
      await migrate(db, { migrationsFolder: "./drizzle" })
      console.log("Migrations completed successfully")
    } catch (error) {
      console.error("Error running migrations:", error)
      process.exit(1)
    }
  }

  // Start Drizzle Studio
  const port = process.env.STUDIO_PORT ? Number.parseInt(process.env.STUDIO_PORT) : 3333
  const studio = await createStudio({ db, port })

  const server = createServer(studio.handler)
  server.listen(port, () => {
    console.log(`Drizzle Studio is running at http://localhost:${port}`)
  })
}

main().catch((err) => {
  console.error("Error starting Drizzle Studio:", err)
  process.exit(1)
})
