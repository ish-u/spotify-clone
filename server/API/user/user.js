import axios from "axios";
import express from "express";

// Express Router
const router = express.Router();

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
      console.log(err);
    });
});

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
      .catch((err) => {
        console.log(err);
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
      .catch((err) => {
        console.log(err);
      })),
  ];

  res.send(top);
});

// exporting the router
export default router;
