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
    <Container fluid>
      <Container>
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
          <Container className="p-3">
            <Row className="justify-content-center">
              <Col lg={4}>
                {(artists.length || tracks.length || albums.length) !== 0 && (
                  <TopSearchBox
                    artist={artists.length ? artists[0] : []}
                    track={tracks.length ? tracks[0].album : []}
                    album={albums.length ? albums[0].album : []}
                  ></TopSearchBox>
                )}
              </Col>
              <Col>
                {tracks.map((track) => {
                  return (
                    <>
                      <TrackBox key={track.uri} track={track}></TrackBox>
                    </>
                  );
                })}
              </Col>
            </Row>
            <Row>
              {/* <Col>
              {artists.map((artist) => {
                return <li key={artist.uri}>{artist.name}</li>;
              })}
            </Col> */}
            </Row>
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default Search;
