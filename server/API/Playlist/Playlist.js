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

  console.log(qs.stringify(requestBody));

  let playlist_id = "";

  await axios
    .post(
      `https://api.spotify.com/v1/users/${user_id}/playlists`,
      requestBody,
      requestHeaders
    )
    .then((response) => {
      console.log(response.data);
      playlist_id = response.data.id;
      res.send(response.data.id);
    })
    .catch((err) => {
      console.log("err");
    });
});

router.post("/addToPlaylist/:playlistID/:user_id/:token", async (req, res) => {
  let token = "Bearer " + req.params.token;
  let requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      Accept: "application/json",
    },
  };

  let uris = {
    uris: req.body.uris,
  };

  await axios
    .post(
      `api.spotify.com/v1/playlists/${
        req.params.playlistID
      }/tracks?${qs.stringify(uris)}`,
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

// exporting the router
export default router;
