import axios from "axios";
import express from "express";
import qs from "qs";

// Express Router
const router = express.Router();

// create a Playlist
router.post("/createPlaylist/:user_id/:token", async (req, res) => {
  let token = "Bearer " + req.params.token;
  let user_id = req.params.user_id;
  let requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      Accept: "application/json",
    },
  };
  let requestBody = {
    name: req.body.name,
    description: req.body.description,
    public: false,
  };

  await axios
    .post(
      `https://api.spotify.com/v1/users/${user_id}/playlists`,
      requestBody,
      requestHeaders
    )
    .then((response) => {
      console.log(response.status);
      res.send(response.data.id);
    })
    .catch((err) => {
      console.log("err");
    });
});

// add Songs to the Playlist
router.post("/addToPlaylist/:playlistID/:token", (req, res) => {
  let token = "Bearer " + req.params.token;
  let playlist_id = req.params.playlistID;
  let requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      Accept: "application/json",
    },
  };
  let requestBody = {};

  let uris = {
    uris: req.body.uris,
  };

  axios
    .post(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?${qs.stringify(
        uris
      )}`,
      requestBody,
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

// get the User's Playlist
router.get("/getPlaylist/:token", (req, res) => {
  let token = "Bearer " + req.params.token;
  let requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      Accept: "application/json",
    },
  };

  axios
    .get("https://api.spotify.com/v1/me/playlists?limit=40", requestHeaders)
    .then((response) => {
      console.log(response.data.items.length);
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get a Playlist from Playlist ID
router.get("/playlist/:playlist_id/:token", (req, res) => {
  let token = "Bearer " + req.params.token;
  let requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      Accept: "application/json",
    },
  };
  let playlist_id = req.params.playlist_id;
  axios
    .get(`https://api.spotify.com/v1/playlists/${playlist_id}`, requestHeaders)
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
