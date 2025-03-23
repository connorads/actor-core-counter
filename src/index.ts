import { createRouter } from "@actor-core/cloudflare-workers";
import { setup } from "actor-core";
import { Hono } from "hono";
import counter from "./counter";

// Create your Hono app inside the fetch handler
const honoApp = new Hono();

// Add your custom routes
honoApp.get("/", (c) => c.text("Welcome to my app!"));
honoApp.get("/hello", (c) => c.text("Hello, world!"));

// Setup the ActorCore app
const app = setup({
  actors: { counter },
  // IMPORTANT: Must specify the same basePath where your router is mounted
  basePath: "/my-path"
});

// Create a router and handler from the app
const { router: actorRouter, ActorHandler } = createRouter(app);

// Mount the ActorCore router at /my-path
honoApp.route("/my-path", actorRouter);

// Export the app type for client usage
export type App = typeof app;

// IMPORTANT: Must export `ActorHandler` as this exact name
export { honoApp as default, ActorHandler };