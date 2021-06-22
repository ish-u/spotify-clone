import axios from "axios";
import express, { response } from "express";
import qs from "qs";

// Express Router
const router = express.Router();

// login route
router.get("/login", (req, res) => {
  var scopes =
    "user-read-private user-read-email playlist-modify-public playlist-modify-private";
  var authURL =
    "https://accounts.spotify.com/authorize" +
    "?response_type=code" +
    "&client_id=" +
    process.env.CLIENT_ID +
    (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
    "&redirect_uri=" +
    encodeURIComponent(process.env.REDIRECT_URL);

  res.redirect(authURL);
});

// auth route
router.get("/auth", async (req, res) => {
  let requestBody = {
    grant_type: "authorization_code",
    code: req.query.code,
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

// exporting the router
export default router;
