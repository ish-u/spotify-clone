import "./style.css";
import React from "react";
import { Container } from "react-bootstrap";
import Player from "./components/Player.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/Home.js";
import SideBar from "./views/SideBar.js";
import Search from "./views/Search.js";
import Artist from "./views/Artist.js";
import Album from "./views/Album.js";
import Playlist from "./views/Playlist.js";
import CreatePlaylist from "./views/CreatePlaylist.js";
import Error404 from "./views/Error404.js";
import useAuth from "./useAuth.js";

export const ReducerContext = React.createContext();

function App() {
  // custom hook for authentication
  const { state, dispatch, authenticateUser } = useAuth();

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
                  <CreatePlaylist />
                </Route>
                <Route path="/artist/:id">
                  <Artist />
                </Route>
                <Route path="/album/:id">
                  <Album />
                </Route>
                <Route path="/playlist/:id">
                  <Playlist />
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
