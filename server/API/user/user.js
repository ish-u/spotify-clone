import axios from "axios";
import express from "express";
import qs from "qs";

// Express Router
const router = express.Router();

// get the User Profile
router.get("/me/:token", async (req, res) => {
  let token = "Bearer " + req.params.token;
  let requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      Accept: "application/json",
    },
  };
  await axios
    .get(`https://api.spotify.com/v1/me`, requestHeaders)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});

// get the User Top Artists and Tracks
router.get("/me/top/:token", async (req, res) => {
  let token = "Bearer " + req.params.token;
  let top = [];
  let requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      Accept: "application/json",
    },
  };

  // top artist of user
  top = [
    ...top,
    ...(await axios
      .get(`https://api.spotify.com/v1/me/top/artists?limit=4`, requestHeaders)
      .then((response) => {
        return response.data.items;
      })
      .catch(() => {
        return [];
      })),
  ];

  // top tracks of user
  top = [
    ...top,
    ...(await axios
      .get(`https://api.spotify.com/v1/me/top/tracks?limit=4`, requestHeaders)
      .then((response) => {
        let tracks = [];
        response.data.items.forEach((track) => {
          tracks.push(track["album"]);
        });
        return tracks;
      })
      .catch(() => {
        return [];
      })),
  ];

  if (top.length) {
    res.send(top);
  }
  res.status(401).send();
});

// get the User Current Player Settings
router.get("/me/player/:token", (req, res) => {
  let token = "Bearer " + req.params.token;
  let requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      Accept: "application/json",
    },
  };

  axios
    .get(`https://api.spotify.com/v1/me/player`, requestHeaders)
    .then((response) => {
      console.log(response);
      res.send(response.data);
    })
    .catch((err) => console.log(err));
});

router.get("/me/player/:token/:id", (req, res) => {
  let token = "Bearer " + req.params.token;
  let requestBody = {
    device_ids: [req.params.id],
  };

  console.log(qs.stringify(requestBody));
  let requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      Accept: "application/json",
    },
  };

  axios
    .put(`https://api.spotify.com/v1/me/player`, requestBody, requestHeaders)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => console.log(err));
});

// exporting the router
export default router;
