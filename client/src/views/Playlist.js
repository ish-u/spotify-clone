import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { ReducerContext } from "../App.js";

// cancel token
let cancelToken;

const Playlist = () => {
  // getting the App State
  const { state } = useContext(ReducerContext);

  // state
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");

  // Get Search Results
  useEffect(() => {
    const search = async (q) => {
      setLoading(true);
      //Check if there are any previous pending requests
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.");
      }
      console.log(q);
      cancelToken = axios.CancelToken.source();
      await axios
        .get(
          `${process.env.REACT_APP_WEB_API}/search/${q}/${state["accessToken"]}`,
          { cancelToken: cancelToken.token }
        )
        .then((response) => {
          if (q !== "") {
            if (response) {
              setTracks(response.data.tracks.items);
              setLoading(false);
            }
          } else {
            setTracks([]);
          }
        })
        .catch((error) => {
          setTracks([]);
          console.log(error);
        });
    };
    if (query !== "") {
      search(query);
    }
    return () => {
      setTracks([]);
    };
  }, [query, state]);

  const createPlaylist = async () => {
    // extracting the Track URIs
    let URIS = [];
    playlistTracks.forEach((track) => {
      URIS.push(track.uri);
    });

    // request body
    let body = {
      name: playlistName,
      description: playlistDescription,
    };

    // making the POST request
    const playlistID = await axios
      .post(
        `${process.env.REACT_APP_WEB_API}/createPlaylist/${state["id"]}/${state["accessToken"]}`,
        body
      )
      .then((response) => {
        return response.data.id;
        console.log(response);
      })
      .catch((err) => console.log(err));

    await axios
      .post(
        `${process.env.REACT_APP_WEB_API}/addToPlaylist/${playlistID}/${state["id"]}/${state["accessToken"]}`,
        {
          uris: URIS.join(","),
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container fluid className="p-5">
      <Row></Row>
      <Row>
        <Col xl={6} lg={6}>
          <Container>
            <InputGroup
              className="mb-3"
              style={{
                width: "25vw",
                margin: "0 auto",
              }}
            >
              <FormControl
                placeholder="Search..."
                aria-label="Search Query"
                type="text"
                name="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </InputGroup>

            {tracks.length !== 0 && (
              <div className="playlist-container">
                {tracks.map((track) => {
                  return (
                    <div
                      key={track.uri}
                      className="track-box"
                      onClick={() => {
                        if (playlistTracks.includes(track) === false) {
                          setPlaylistTracks([...playlistTracks, track]);
                        }
                      }}
                    >
                      <img
                        src={track["album"]["images"][1]["url"]}
                        alt="track Cover"
                      ></img>
                      <div>
                        <span>{track["name"]}</span>
                        <i className="bi bi-plus-circle"></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </Col>
        <Col xl={6} lg={6}>
          {playlistTracks.length !== 0 && (
            <Container>
              <InputGroup
                className="mb-3"
                style={{
                  width: "30vw",
                  margin: "0 auto",
                }}
              >
                <FormControl
                  placeholder="Playlist Name"
                  aria-label="Playlist Name"
                  value={playlistName}
                  type="text"
                  onChange={(e) => setPlaylistName(e.target.value)}
                />
                <Button variant="secondary" onClick={() => createPlaylist()}>
                  Save Playlist
                </Button>
              </InputGroup>
              <InputGroup
                style={{
                  width: "30vw",
                  margin: "0 auto",
                }}
              >
                <FormControl
                  placeholder="Description"
                  value={playlistDescription}
                  type="text"
                  onChange={(e) => setPlaylistDescription(e.target.value)}
                />
              </InputGroup>
              {
                <div className="playlist-container">
                  {playlistTracks.map((track) => {
                    return (
                      <div
                        key={track.uri}
                        className="track-box"
                        onClick={() => {
                          if (playlistTracks.includes(track) === true) {
                            setPlaylistTracks(
                              playlistTracks.filter((t) => t !== track)
                            );
                          }
                        }}
                      >
                        <img
                          src={track["album"]["images"][1]["url"]}
                          alt="track Cover"
                        ></img>
                        <div>
                          <span>{track["name"]}</span>
                          <i className="bi bi-dash-circle"></i>
                        </div>
                      </div>
                    );
                  })}
                </div>
              }
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Playlist;
