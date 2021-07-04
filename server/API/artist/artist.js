import axios from "axios";
import express from "express";

// Express Router
const router = express.Router();

// getting a Artist
router.get("/artist/:id/:token", (req, res) => {
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
    .get(`https://api.spotify.com/v1/artists/${id}`, requestHeaders)
    .then((response) => {
      console.log(response.status);
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get the Top Songs Of Artist
router.get("/artist/top/:id/:token/:country", (req, res) => {
  let token = "Bearer " + req.params.token;
  let id = req.params.id;
  let country = req.params.country;
  let requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      Accept: "application/json",
    },
  };

  axios
    .get(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?market=${country}`,
      requestHeaders
    )
    .then((response) => {
      console.log(response.status);
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get the Albums of Artist
router.get("/artist/album/:id/:token", (req, res) => {
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
    .get(`https://api.spotify.com/v1/artists/${id}/albums`, requestHeaders)
    .then((response) => {
      console.log(response.status);
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// exporting the router
export default router;
