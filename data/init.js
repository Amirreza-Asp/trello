import { initSchema } from "./schema.js";
import { seedData } from "./seed.js";

let initialized = false;

function initDb() {
  if (initialized) return;

  console.log("🟢 Initializing database...");
  initSchema();
  seedData();
  initialized = true;
  console.log("✅ Database initialized");
}

initDb();

