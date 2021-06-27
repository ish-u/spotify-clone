import React from "react";
import { Col } from "react-bootstrap";
import defaultPicture from "../default.png";
const ArtitsBox = ({ artist }) => {
  return (
    <Col xl={3} lg={4} md={8} sm={10} xs={12}>
      <div className="artist-box-container">
        <div className="artist-box">
          <img
            src={
              artist.images.length !== 0 ? artist.images[0].url : defaultPicture
            }
            alt="artist Cover"
          ></img>
          <span>{artist.name}</span>
        </div>
      </div>
    </Col>
  );
};

export default ArtitsBox;
