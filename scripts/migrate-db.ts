import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import * as dotenv from "dotenv"
import * as schema from "../lib/db/schema"

dotenv.config({ path: ".env.local" })

const runMigrations = async () => {
  if (!process.env.db_url) {
    throw new Error("DATABASE_URL is not set")
  }

  const migrationClient = postgres(process.env.db_url, { max: 1 })
  const db = drizzle(migrationClient, { schema })

  console.log("Running migrations...")

  try {
    await migrate(db, { migrationsFolder: "drizzle" })
    console.log("Migrations completed successfully")
  } catch (error) {
    console.error("Migration failed:", error)
    process.exit(1)
  } finally {
    await migrationClient.end()
  }

  // Check if --seed flag is provided
  if (process.argv.includes("--seed")) {
    console.log("Seeding database...")
    try {
      const { seedDatabase } = await import("./seed-db")
      await seedDatabase()
      console.log("Database seeded successfully")
    } catch (error) {
      console.error("Seeding failed:", error)
      process.exit(1)
    }
  }
}

runMigrations()
