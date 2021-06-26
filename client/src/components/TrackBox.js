import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import { ReducerContext } from "../App";

const TrackBox = ({ track }) => {
  const { dispatch } = useContext(ReducerContext);
  const time = (ms) => {
    var s = parseInt(ms / 1000);
    return parseInt(s / 60) + ":" + (s % 60);
  };
  return (
    <div
      onClick={() => {
        dispatch({ type: "PLAY_SONG", payload: track["uri"] });
      }}
    >
      <div className="track-box">
        <img src={track["album"]["images"][1]["url"]} alt="track Cover"></img>
        <div>
          <span>{track["name"]}</span>
          {time(track.duration_ms)}
        </div>
      </div>
    </div>
  );
};

export default TrackBox;
