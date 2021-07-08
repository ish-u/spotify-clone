import axios from "axios";
import "./style.css";
import React, { useReducer, useEffect } from "react";
import reducer from "./reducer.js";
import { Container } from "react-bootstrap";
import Player from "./components/Player.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/Home.js";
import SideBar from "./views/SideBar.js";
import Search from "./views/Search.js";
import Artist from "./views/Artist.js";
import Album from "./views/Album.js";
import Playlist from "./views/Playlist.js";
import Error404 from "./views/Error404.js";

export const ReducerContext = React.createContext();

function App() {
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
  const savedState = localStorage.getItem("initialState");

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
  }, []);

  return (
    <Router>
      <ReducerContext.Provider value={{ state, dispatch }}>
        {state["isAuthenticated"] && (
          <>
            <Player />
            <SideBar />
          </>
        )}
      </ReducerContext.Provider>

      {!state["isAuthenticated"] && (
        <Container style={{ textAlign: "center" }} className="p-5">
          <button
            className="btn btn-primary"
            onClick={() => authenticateUser()}
          >
            LOGIN
          </button>
        </Container>
      )}

      {state["isAuthenticated"] && (
        <div className="main">
          <Container>
            {" "}
            <ReducerContext.Provider value={{ state, dispatch }}>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/search">
                  <Search />
                </Route>
                <Route path="/createPlaylist">
                  <Playlist />
                </Route>
                <Route path="/artist/:id">
                  <Artist />
                </Route>
                <Route path="/album/:id">
                  <Album />
                </Route>
                <Route>
                  <Error404 />
                </Route>
              </Switch>
            </ReducerContext.Provider>
          </Container>
        </div>
      )}
    </Router>
  );
}

export default App;
