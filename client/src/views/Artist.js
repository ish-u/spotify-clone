import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { ReducerContext } from "../App";
import { Container, Row } from "react-bootstrap";
import AlbumTrack from "../components/Track.js";
import AlbumBox from "../components/AlbumBox.js";

const Artist = () => {
  // getting the App State
  const { state } = useContext(ReducerContext);

  // getting the artist id
  const { id } = useParams();

  // artist
  const [artist, setArtist] = useState(null);
  const [artistTop, setArtistTop] = useState(null);
  const [artistAlbum, setArtistAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  // getting the artist object
  useEffect(() => {
    // get Artist Data
    const getArtist = async () => {
      if (id) {
        await axios
          .get(
            `${process.env.REACT_APP_WEB_API}/artist/${id}/${state["accessToken"]}`
          )
          .then((response) => {
            setArtist(response.data);
            console.log(response.data);
          })
          .catch((err) => console.log(err));
      }
    };

    // get Artist Top Tracks
    const getArtistTop = async () => {
      if (id) {
        await axios
          .get(
            `${process.env.REACT_APP_WEB_API}/artist/top/${id}/${state["accessToken"]}/IN`
          )
          .then((response) => {
            setArtistTop(response.data);
            console.log(response.data);
          })
          .catch((err) => console.log(err));
      }
    };

    // get Artist Albums
    const getArtistAlbum = async () => {
      if (id) {
        await axios
          .get(
            `${process.env.REACT_APP_WEB_API}/artist/album/${id}/${state["accessToken"]}`
          )
          .then((response) => {
            setArtistAlbum(response.data);
            console.log(response.data);
          })
          .catch((err) => console.log(err));
      }
    };

    getArtist();
    getArtistTop();
    getArtistAlbum();
    setLoading(false);
  }, [id, state]);

  return (
    <Container fluid className="p-5">
      {!loading && (
        <>
          <Row>
            {artist !== null && (
              <div className="artist-info-container">
                <div className="artist-info">
                  <img alt="Artist" src={artist.images[0].url}></img>
                  <span>
                    <h1 className="display-1">{artist.name}</h1>
                  </span>
                </div>
              </div>
            )}
          </Row>
          <h1 className="display-4"> Top Tracks</h1>
          <Row className="mb-5">
            {artistTop !== null &&
              artistTop.tracks.map((track, index) => {
                return (
                  <AlbumTrack
                    key={track.uri}
                    track={track}
                    isInArtist={true}
                    index={index + 1}
                  ></AlbumTrack>
                );
              })}
          </Row>
          <h1 className="display-4"> Albums</h1>
          <Row className="scroller mb-5">
            {artistAlbum !== null &&
              artistAlbum.items.map((album) => {
                return <AlbumBox key={album.uri} album={album}></AlbumBox>;
              })}
          </Row>
        </>
      )}
    </Container>
  );
};

export default Artist;
