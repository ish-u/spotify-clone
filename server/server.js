import express from "express";
import cors from "cors";

// API routes
import home from "./API/home.js";
import auth from "./API/auth/auth.js";
import search from "./API/search/search.js";

// Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// binding api from "API" folder to express app
app.use("/webapi", home, cors());
app.use("/webapi", auth, cors());
app.use("/webapi", search, cors());

// for 404
app.use("*", (req, res) => res.json({ error: "error" }));

// exporting the App
export default app;
