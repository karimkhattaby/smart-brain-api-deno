// Importing Core Dependencies
import { Router, Client } from "./deps.ts";

// Importing Controllers
import * as signin from "./controllers/signin.ts";
import * as register from "./controllers/register.ts";
import * as profile from "./controllers/profile.ts";
import * as image from "./controllers/image.ts";

// Importing Database Settings
import db_settings from "./private/db.config.ts"

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
    // Extract Request Body
    const body = await ctx.request.body();

    // Check for Bad Requests
    if ( !body.value.email || !body.value.password ) {
        ctx.throw(400, "Incorrect Login Form Submission");
    } else {
        const result = await signin.handleSignin(body.value, db);
        // Check for Errors
        if (result === "Wrong Credentials" || result === "Unable to Get User") {
            ctx.throw(400, result);
        } else {
            ctx.response.body = result;
            ctx.response.status = 200;
        }
    }
});

// POST Register
router.post("/register", async (ctx) => {
    // Extract Request Body
    const body = await ctx.request.body();

    // Check for Bad Requests
    if ( !body.value.email || !body.value.password || !body.value.name ) {
        ctx.throw(400, "Incorrect Registration Form Submission");
    } else {
        let result = await register.handleRegister(body.value, db);

        // Check for Errors
        if (result === "Unable to Register") {
            ctx.throw(400, result);
        } else {
            // Log the User In
            result = await signin.handleSignin(body.value, db);
            ctx.response.body = result;
            ctx.response.status = 201;
        }
    }
});

// GET Profile
router.get("/profile/:id", async (ctx) => {
    if (ctx.params?.id) {
        const result = await profile.handleProfileGet(Number(ctx.params.id), db);
        if (result === "User Not Found") {
            ctx.throw(400, "User Not Found");
        } else {
            ctx.response.body = result;
            ctx.response.status = 200;
        }
    }
    else {
        ctx.throw(400, "Bad Request");
    }
});

// PUT Image
router.put("/image", async (ctx) => {
    // Extract Request Body
    const body = await ctx.request.body();

    // Check for Bad Requests
    if ( !body.value.id ) {
        ctx.throw(400, "Bad Request");
    } else {
        const result = await image.handleImage(Number(body.value.id), db);
        if (result === "User Not Found") {
            ctx.throw(400, "User Not Found");
        } else {
            ctx.response.body = result;
            ctx.response.status = 200;
        }
    }
});

// POST ImageURL
router.post("/imageurl", async (ctx) => {
    // Extract Request Body
    const body = await ctx.request.body();

    // Check for Bad Requests
    if ( !body.value.input ) {
        ctx.throw(400, "Bad Request");
    } else {
        const result = await image.handleAPICall(body.value.input);
        //console.log(result);
        if (result === "API Error") {
            ctx.throw(400, "API Error");
        } else {
            ctx.response.body = result;
            ctx.response.status = 200;
        }
    }
});

// Exporting the Router
export default router;