import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Spinner,
} from "react-bootstrap";
import { ReducerContext } from "../App";
import TrackBox from "../components/TrackBox";
import TopSearchBox from "../components/TopSearchBox";
import AlbumBox from "../components/AlbumBox";
import ArtitsBox from "../components/ArtistBox";

// cancel token
let cancelToken;

const Search = () => {
  // getting the App State
  const { state } = useContext(ReducerContext);

  // Search Query State
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

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
              setArtists(response.data.artists.items);
              setTracks(response.data.tracks.items);
              setAlbums(response.data.albums.items);
              setLoading(false);
            }
          } else {
            setArtists([]);
            setTracks([]);
            setAlbums([]);
          }
        })
        .catch((error) => {
          setArtists([]);
          setTracks([]);
          setAlbums([]);

          console.log(error);
        });
    };
    if (query !== "") {
      search(query);
    }
    return () => {
      setArtists([]);
      setTracks([]);
      setAlbums([]);
    };
  }, [query, state]);

  return (
    <Container fluid className="p-5">
      <InputGroup
        className="mb-3"
        style={{
          width: "25vw",
        }}
      >
        <FormControl
          style={{
            borderRadius: "25px",
            padding: "10px",
            fontSize: "large",
          }}
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
      {loading && (
        <Container fluid className="p-5" style={{ textAlign: "center" }}>
          <Spinner animation="grow" />
        </Container>
      )}
      {!loading && (
        <Container fluid className="mb-5">
          <Row>
            <Container className="p-3">
              <Row className="gy-5">
                <Col xl={4} lg={6} md={12} sm={12} xs={12}>
                  {(artists.length || tracks.length || albums.length) !== 0 && (
                    <>
                      <TopSearchBox
                        artist={artists.length ? artists[0] : null}
                        track={tracks.length ? tracks[0].album : null}
                        album={albums.length ? albums[0] : null}
                      ></TopSearchBox>
                    </>
                  )}
                </Col>
                <Col>
                  {tracks.length !== 0 && (
                    <>
                      <TrackBox tracks={tracks}></TrackBox>
                    </>
                  )}
                </Col>
              </Row>
            </Container>
          </Row>
          <Row>
            {albums.length !== 0 && (
              <Container className="p-3">
                <Row>
                  <span className="display-4">Albums</span>
                  <br></br>
                </Row>
                <Row className="scroller">
                  {albums.length !== 0 &&
                    albums.map((album) => {
                      return (
                        <AlbumBox key={album.uri} album={album}></AlbumBox>
                      );
                    })}
                </Row>
              </Container>
            )}
          </Row>
          <Row>
            {artists.length !== 0 && (
              <Container className="p-3">
                <Row>
                  <span className="display-4">Artists</span>
                  <br></br>
                </Row>
                <Row className="scroller">
                  {artists.length !== 0 &&
                    artists.map((artist) => {
                      return (
                        <ArtitsBox key={artist.uri} artist={artist}></ArtitsBox>
                      );
                    })}
                </Row>
              </Container>
            )}
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default Search;
