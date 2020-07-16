// Importing Core Dependencies
import { log, Application, oakCors } from "./deps.ts";

// Importing API Calls
import api from "./api.ts";

// Initializing Oak Middleware Application
const app = new Application();
const PORT = 3002;

// Setting Up Logger
await log.setup({
    handlers: {
        console: new log.handlers.ConsoleHandler("INFO"),
    },
    loggers: {
        default: {
            level: "INFO",
            handlers: ["console"],
        }
    },
});

// Errors Listener and Logger
app.addEventListener("error", (event) => {
    log.error(event.error);
});

// Handling Requests Errors
app.use(async (ctx, next) => {
    try {
        await next(); 
    } catch(err) {
        ctx.response.body = "Internal Server Error";
        throw err;
    }
});

// Logging Incoming Requests
app.use(async (ctx, next) => {
    await next();
    const time = ctx.response.headers.get("X-Response-Time");
    log.info(`${ctx.request.method} ${ctx.request.url}: ${time}`);
});

// Measuring Response Time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const delta = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${delta}ms`);
});

// Enabling CORS for All Routes
app.use(oakCors());

// Registering Routes
app.use(api.routes());
app.use(api.allowedMethods());

// Listening to Incoming Requests
if (import.meta.main) {
    log.info(`Starting server on port ${PORT}...`);
    await app.listen({
        port: PORT
    });
}