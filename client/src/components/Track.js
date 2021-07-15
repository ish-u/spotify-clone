import React from "react";
import { Col } from "react-bootstrap";

const Track = ({ track, isInArtist, index }) => {
  console.log(track);
  // get the time in m:s
  const time = (ms) => {
    var time = new Date(ms).toISOString().substr(15, 4);
    return time;
  };

  return (
    <Col xl={12} lg={12}>
      <div className="album-track-container">
        <div className="album-track">
          <div className="album-track-name-number">
            <span className="mx-5">
              {!isInArtist ? track.track_number : index}
            </span>
            <span>{track.name}</span>
          </div>
          <div className="mx-5">
            <span>{time(track.duration_ms)}</span>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default Track;
