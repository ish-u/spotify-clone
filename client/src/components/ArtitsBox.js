import React from "react";
import { Col } from "react-bootstrap";
import defaultPicture from "../default.png";
import { Link } from "react-router-dom";

const ArtitsBox = ({ artist }) => {
  return (
    <Col xl={3} lg={4} md={8} sm={10} xs={12}>
      <Link to={`/artist/${artist.id}`}>
        <div className="artist-box-container">
          <div className="artist-box">
            <img
              src={
                artist.images.length !== 0
                  ? artist.images[0].url
                  : defaultPicture
              }
              alt="artist Cover"
            ></img>
            <span>{artist.name}</span>
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default ArtitsBox;
