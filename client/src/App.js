import axios from "axios";
import React, { useReducer, useState, useEffect } from "react";
import reducer from "./reducer.js";
import { Container, InputGroup, FormControl, Row } from "react-bootstrap";
import SongBox from "./components/songBox.js";
import Player from "./components/Player.js";

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
  const [query, setQuery] = useState("");
  useEffect(() => {
    console.log(query);
    if (query) {
      axios
        .get(
          `${process.env.REACT_APP_WEB_API}/search/${query}/${state["accessToken"]}`
        )
        .then((response) => {
          dispatch({
            type: "SEARCH_RESULTS",
            payload: response.data.data.items,
          });
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch({
        type: "CLEAR_SEARCH_RESULTS",
        payload: "",
      });
    }
  }, [query]);

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
    <ReducerContext.Provider value={{ state, dispatch }}>
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
            <Container>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search"
                  aria-label="Search Query"
                  type="text"
                  name="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
              </InputGroup>
              <Container className="p-5">
                <Row style={{ justifyContent: "center" }}>
                  {state["searchResults"] &&
                    state["searchResults"].map((r) => {
                      return (
                        <SongBox
                          key={r["uri"]}
                          song={r}
                          dispatch={dispatch}
                        ></SongBox>
                      );
                      // return <li key={r["uri"]}>{r["name"]}</li>;
                    })}
                </Row>
              </Container>
              <Player />
            </Container>
          )}
        </div>
      </Container>
    </ReducerContext.Provider>
  );
}

export default App;
