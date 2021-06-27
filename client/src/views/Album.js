import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { ReducerContext } from "../App";
import AlbumTrack from "../components/AlbumTrack.js";
import { Link } from "react-router-dom";
const Album = () => {
  // getting the App State
  const { state } = useContext(ReducerContext);

  // getting the album id
  const { id } = useParams();

  // album
  const [album, setAlbum] = useState(null);

  // getting the album
  useEffect(() => {
    // getting the album data
    const getAlbum = () => {
      if (id) {
        axios
          .get(
            `${process.env.REACT_APP_WEB_API}/album/${id}/${state["accessToken"]}`
          )
          .then((response) => {
            setAlbum(response.data);
            console.log(response.data);
          })
          .catch((err) => console.log(err));
      }
    };

    getAlbum();
  }, [id, state]);

  return (
    <Container fluid className="p-5 ">
      <Row>
        {album !== null && (
          <div className="album-cover-container">
            <div className="album-cover">
              <img
                alt="Album Cover"
                src={album !== null ? album.images[0].url : ""}
              ></img>
              <span>
                <h1 className="display-1">
                  <b>{album.name}</b>
                </h1>
                <h5>
                  <em>
                    <Link to={`/artist/${album.artists[0].id}`}>
                      by -{album.artists[0].name} |{" "}
                      {album.release_date.split("-")[0]}
                    </Link>{" "}
                  </em>
                </h5>
              </span>
            </div>
          </div>
        )}
      </Row>
      <Row className="mb-5">
        {album !== null &&
          album.tracks.items.map((track) => {
            return <AlbumTrack key={track.uri} track={track}></AlbumTrack>;
          })}
      </Row>
    </Container>
  );
};

export default Album;
