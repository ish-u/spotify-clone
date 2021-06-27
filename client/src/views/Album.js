import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { ReducerContext } from "../App";
import TrackBox from "../components/TrackBox";

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
  }, []);

  return (
    <Container fluid className="p-5">
      {album !== null && (
        <div className="album-cover-container">
          <div className="album-cover">
            <img src={album !== null ? album.images[0].url : ""}></img>
            <span className="display-1">{album.name}</span>
          </div>
          <Container>
            <Row>
              <Col lg={12}></Col>
            </Row>
          </Container>
        </div>
      )}
    </Container>
  );
};

export default Album;
