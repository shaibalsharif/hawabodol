import { addPasswordField } from "@/lib/db/migrations/add-password-field"

async function runMigrations() {
  try {
    console.log("Running migrations...")
    await addPasswordField()
    console.log("Migrations completed successfully")
  } catch (error) {
    console.error("Migration failed:", error)
    process.exit(1)
  }
}

runMigrations()
