import express from "express";
import cors from "cors";

// API routes
import home from "./API/home.js";
import auth from "./API/auth/auth.js";
import search from "./API/search/search.js";
import user from "./API/user/user.js";
import albums from "./API/album/album.js";
import artists from "./API/artist/artist.js";

// Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// binding api from "API" folder to express app
app.use("/webapi", home, cors());
app.use("/webapi", auth, cors());
app.use("/webapi", search, cors());
app.use("/webapi", user, cors());
app.use("/webapi", albums, cors());
app.use("/webapi", artists, cors());

// for 404
app.use("*", (req, res) => res.json({ error: "error" }));

// exporting the App
export default app;
