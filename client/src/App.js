import axios from "axios";
import { useReducer, useState, useEffect } from "react";
import reducer from "./reducer.js";

function App() {
  // inital state
  const initialState = {
    accessToken: "",
    refreshToken: "",
  };

  // using useReducer Hook for State Management
  const [state, dispatch] = useReducer(reducer, initialState);
  // isAuthenticated state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // getting the access token
  const authenticateUser = () => {
    var scopes =
      "user-read-private user-read-email playlist-modify-public playlist-modify-private";
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
    const code = new URLSearchParams(window.location.search).get("code");
    if (code !== null) {
      axios
        .get(`${process.env.REACT_APP_WEB_API}/auth/${code}`)
        .then((response) => {
          return response.data.response;
        })
        .then((data) => {
          dispatch({ type: "ADD_TOKEN", payload: data });
          setIsAuthenticated(true);
          window.history.pushState({}, null, "/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [new URLSearchParams(window.location.search).get("code")]);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {!isAuthenticated && (
          <button onClick={() => authenticateUser()}>LOGIN</button>
        )}
        {isAuthenticated && <h1>Welcome</h1>}
      </div>
    </>
  );
}

export default App;
