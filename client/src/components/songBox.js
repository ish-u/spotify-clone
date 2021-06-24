import React from "react";
import { Col } from "react-bootstrap";

const SongBox = ({ song, dispatch }) => {
  console.log(song);
  return (
    <Col
      className="col-3 p-3 align-items-center"
      style={{
        height: "40vh",
        border: "2px solid black",
        borderRadius: "10px",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
      onClick={() => {
        dispatch({ type: "PLAY_SONG", payload: song["uri"] });
      }}
    >
      <div>
        <img
          src={song["album"]["images"][1]["url"]}
          style={{ height: "20vh" }}
        ></img>
      </div>
      <div>
        <h6>{song["name"]}</h6>
      </div>
    </Col>
  );
};

export default SongBox;
