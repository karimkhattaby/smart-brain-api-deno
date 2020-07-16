// Importing Core Dependencies
import { Router, Client } from "./deps.ts";

// Importing Database Settings
import db_settings from "../private/db.config.ts"

// Initializing API Calls Router
const router = new Router();

// Initializing Database
const db = new Client(db_settings);
await db.connect();

// GET root
router.get("/", (ctx) => {
    ctx.response.body = "Welcome to Smart Brain API.";
});

// Exporting the Router
export default router;