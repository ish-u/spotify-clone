import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ReducerContext } from "../App.js";
import Track from "../components/Track.js";

const Playlist = () => {
  // getting the App State
  const { state } = useContext(ReducerContext);
  const { id } = useParams();

  // state
  const [playlist, setPlaylist] = useState(null);

  // getting the Playlist given the Playlist ID
  useEffect(() => {
    //getting the Playlist
    const getPlaylist = () => {
      axios
        .get(
          `${process.env.REACT_APP_WEB_API}/playlist/${id}/${state["accessToken"]}`
        )
        .then((response) => {
          console.log(response.data);
          setPlaylist(response.data);
        })
        .catch((err) => console.log(err));
    };

    getPlaylist();
  }, [id, state]);
  return (
    <Container fluid className="p-5">
      <Row>
        {playlist !== null && (
          <div className="playlist-cover-container">
            <div className="playlist-cover">
              <img
                alt="Playlist Cover"
                src={playlist !== null ? playlist.images[0].url : ""}
              ></img>
              <span>
                <h1 className="display-2">
                  <b>{playlist.name}</b>
                </h1>
                <h6>
                  <em>by {playlist.owner.display_name}</em>
                </h6>
              </span>
            </div>
          </div>
        )}
      </Row>
      <Row className="mb-5">
        {playlist !== null &&
          playlist.tracks.items.map((track) => {
            return <Track key={track.track.uri} track={track.track}></Track>;
          })}
      </Row>
    </Container>
  );
};

export default Playlist;
