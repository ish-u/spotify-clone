import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const PlaylistBox = ({ playlist }) => {
  return (
    <Col xl={3} lg={4} md={6} sm={10} xs={12}>
      <Link to={`/playlist/${playlist.id}`}>
        <div className="playlist-box-container">
          <div className="playlist-box">
            <img
              src={playlist.images.length !== 0 ? playlist.images[0].url : ""}
              alt="Playlist Cover"
            ></img>
            <span>{playlist.name}</span>
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default PlaylistBox;
