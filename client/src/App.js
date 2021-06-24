import axios from "axios";
import React, { useReducer, useState, useEffect } from "react";
import reducer from "./reducer.js";
import { Container } from "react-bootstrap";
import Player from "./components/Player.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Error404 from "./views/Error404.js";
import Search from "./views/Search.js";

export const ReducerContext = React.createContext();

function App() {
  // inital state
  const initialState = {
    accessToken: "",
    refreshToken: "",
    searchResults: [],
    song: "",
    isPlaying: false,
  };

  // using useReducer Hook for State Management
  const [state, dispatch] = useReducer(reducer, initialState);

  // isAuthenticated state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // getting the access token
  const authenticateUser = () => {
    var scopes =
      "user-read-private user-read-email playlist-modify-public playlist-modify-private streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state";
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
  }, []);

  return (
    <Router>
      <ReducerContext.Provider value={{ state, dispatch }}>
        {isAuthenticated && <Player />}
      </ReducerContext.Provider>

      <Switch>
        <ReducerContext.Provider value={{ state, dispatch }}>
          <Route exact path="/">
            <Container className="p-5">
              <div style={{ textAlign: "center" }}>
                {!isAuthenticated && (
                  <button
                    className="btn btn-primary"
                    onClick={() => authenticateUser()}
                  >
                    LOGIN
                  </button>
                )}
                {isAuthenticated && (
                  <div>
                    <Link to="/search">Search</Link>
                  </div>
                )}
              </div>
            </Container>
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </ReducerContext.Provider>
        <Route>
          <Error404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
