import axios from "axios";
import { useReducer, useEffect } from "react";
import reducer from "./reducer.js";

const useAuth = () => {
  // inital state
  const initialState = {
    isAuthenticated: false,
    accessToken: "",
    refreshToken: "",
    expiresIn: 0,
    song: "",
    isPlaying: false,
    id: null,
  };

  // saved state in local storage
  const savedState = localStorage.getItem("state");

  // using useReducer Hook for State Management
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(savedState) || initialState
  );

  // getting the access token
  const authenticateUser = () => {
    // playlist-modify-public playlist-modify-private
    var scopes =
      "user-read-private user-read-email streaming user-read-email user-read-playback-state user-modify-playback-state user-top-read user-read-recently-played playlist-read-collaborative playlist-modify-public playlist-modify-private";
    var authURL =
      "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      process.env.REACT_APP_CLIENT_ID +
      (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
      "&redirect_uri=" +
      encodeURIComponent(process.env.REACT_APP_REDIRECT_URL);

    window.location = authURL;
  };

  // authenticating and getting the access token and refresh token
  useEffect(() => {
    console.log("useEffect");
    // get the Access Token
    const getToken = () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (code !== null) {
        axios
          .get(`${process.env.REACT_APP_WEB_API}/auth/${code}`)
          .then((response) => {
            return response.data.response;
          })
          .then((data) => {
            dispatch({ type: "ADD_TOKEN", payload: data });
            window.location = "/";
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    // refresh the Access Token
    const refreshToken = () => {
      if (localStorage.getItem("state") !== null) {
        const refresh = JSON.parse(localStorage.getItem("state")).refreshToken;
        axios
          .get(`${process.env.REACT_APP_WEB_API}/auth/refresh/${refresh}`)
          .then((response) => {
            const token = response.data.response.access_token;
            dispatch({ type: "REFRESH_TOKEN", payload: token });
          })
          .catch((err) => console.log(err));
      }
    };

    // getting the access token
    getToken();

    // refreshing the access token
    const refresh = setInterval(() => {
      refreshToken();
    }, 3000000);

    return () => {
      clearInterval(refresh);
    };
  }, []);
  return { state, dispatch, authenticateUser };
};

export default useAuth;
