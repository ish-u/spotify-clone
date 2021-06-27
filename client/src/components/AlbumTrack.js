import React from "react";
import { Col } from "react-bootstrap";

const AlbumTrack = ({ track }) => {
  // get the time in m:s
  const time = (ms) => {
    var s = parseInt(ms / 1000);
    return parseInt(s / 60) + ":" + (s % 60);
  };

  return (
    <Col xl={12} lg={12}>
      <div className="album-track-container">
        <div className="album-track">
          <div className="album-track-name-number">
            <span className="mx-5">{track.track_number}</span>
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

export default AlbumTrack;
