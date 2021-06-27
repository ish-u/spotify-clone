import React from "react";
import { Col } from "react-bootstrap";

const AlbumBox = ({ album }) => {
  return (
    <Col xl={3} lg={4} md={8} sm={10} xs={12}>
      <div className="album-box-container">
        <div className="album-box">
          <img src={album.images[0].url} alt="Album Cover"></img>
          <span>{album.name}</span>
        </div>
      </div>
    </Col>
  );
};

export default AlbumBox;
