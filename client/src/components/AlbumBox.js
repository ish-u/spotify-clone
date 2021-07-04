import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const AlbumBox = ({ album }) => {
  return (
    <Col xl={3} lg={4} md={6} sm={10} xs={12}>
      <Link to={`/album/${album.id}`}>
        <div className="album-box-container">
          <div className="album-box">
            <img src={album.images[0].url} alt="Album Cover"></img>
            <span>{album.name}</span>
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default AlbumBox;
