import express from "express";

// Express Router
const router = express.Router();

// home route
router.get("/", (req, res) => {
  res.send({ Home: "Home" });
});

// exporting the router
export default router;
