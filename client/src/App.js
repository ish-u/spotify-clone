import axios from "axios";
import "./style.css";
import React, { useReducer, useEffect } from "react";
import reducer from "./reducer.js";
import { Container } from "react-bootstrap";
import Player from "./components/Player.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Error404 from "./views/Error404.js";
import Search from "./views/Search.js";
import Home from "./views/Home.js";
import SideBar from "./views/SideBar.js";

export const ReducerContext = React.createContext();

function App() {
  // inital state
  const initialState = {
    isAuthenticated: false,
    accessToken: "",
    refreshToken: "",
    searchResults: [],
    song: "",
    isPlaying: false,
  };

  // saved state in local storage
  const savedState = localStorage.getItem("intialState");

  // using useReducer Hook for State Management
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(savedState) || initialState
  );

  // isAuthenticated state
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // getting the access token
  const authenticateUser = () => {
    var scopes =
      "user-read-private user-read-email playlist-modify-public playlist-modify-private streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state user-top-read";
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
          <Container className="p-5">
            {" "}
            <ReducerContext.Provider value={{ state, dispatch }}>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/search">
                  <Search />
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
