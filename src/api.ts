// Importing Core Dependencies
import { Router } from "./deps.ts";

// Initializing API Calls Router
const router = new Router();

// GET root
router.get("/", (ctx) => {
    ctx.response.body = "Welcome to Smart Brain API.";
});

// Exporting the Router
export default router;