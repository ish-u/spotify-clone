import axios from "axios";
import express from "express";

// Express Router
const router = express.Router();

router.get("/search/:q/:token", async (req, res) => {
  let token = "Bearer " + req.params.token;
  let requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      Accept: "application/json",
    },
  };
  await axios
    .get(
      `https://api.spotify.com/v1/search?q=${req.params.q}&limit=3&type=track`,
      requestHeaders
    )
    .then((response) => {
      res.send({ data: response.data.tracks });
    })
    .catch((err) => {
      console.log(err);
    });
});

// exporting the router
export default router;
