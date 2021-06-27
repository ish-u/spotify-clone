import axios from "axios";
import express from "express";

// Express Router
const router = express.Router();

// getting a Album
router.get("/album/:id/:token", (req, res) => {
  let token = "Bearer " + req.params.token;
  let id = req.params.id;
  let requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      Accept: "application/json",
    },
  };

  axios
    .get(`https://api.spotify.com/v1/albums/${id}`, requestHeaders)
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// exporting the router
export default router;
