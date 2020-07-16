// Importing Core Dependencies
import { Router, Client } from "./deps.ts";

// Importing Controllers
import * as signin from "./controllers/signin.ts";

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

// POST SignIn
router.post("/signin", async (ctx) => {
    // Extract Body
    const body = await ctx.request.body();

    // Check for Bad Requests
    if ( !body.value.email || !body.value.password ) {
        ctx.response.body = "Bad Request";
        ctx.response.status = 400;
    } else {
        const result = await signin.handleSignin(body.value, db);
        ctx.response.body = result;
        // Check for Errors
        if (result === "Wrong Credentials" || result === "Unable to Get User") {
            ctx.response.status = 400;
        } else {
            ctx.response.status = 201;
        }
    }
});

// Exporting the Router
export default router;