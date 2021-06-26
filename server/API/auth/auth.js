import axios from "axios";
import express, { response } from "express";
import qs from "qs";

// Express Router
const router = express.Router();

// auth route
router.get("/auth/:code", async (req, res) => {
  let requestBody = {
    grant_type: "authorization_code",
    code: req.params.code,
    redirect_uri: process.env.REDIRECT_URL,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  };

  let requestHeaders = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };

  await axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify(requestBody),
      requestHeaders
    )
    .then((response) => {
      res.send({ response: response.data });
    })
    .catch((error) => console.log(error));
});

// refresh token route
router.get("/auth/refresh/:token", async (req, res) => {
  let requestBody = {
    grant_type: "refresh_token",
    refresh_token: req.params.token,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  };

  let requestHeaders = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };

  await axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify(requestBody),
      requestHeaders
    )
    .then((response) => {
      res.send({ response: response.data });
    })
    .catch((error) => console.log(error));
});

// exporting the router
export default router;
