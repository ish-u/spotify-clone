import React, { useContext } from "react";
import { ReducerContext } from "../App";

const TrackBox = ({ tracks }) => {
  console.log(tracks);
  const { dispatch } = useContext(ReducerContext);
  const time = (ms) => {
    var s = parseInt(ms / 1000);
    return parseInt(s / 60) + ":" + (s % 60);
  };
  return (
    <div className="track-box-container">
      <span className="display-4">Tracks</span>
      <br></br>
      {tracks.map((track) => {
        return (
          <>
            <div
              className="track-box"
              onClick={() => {
                dispatch({ type: "PLAY_SONG", payload: track["uri"] });
              }}
            >
              <img
                src={track["album"]["images"][1]["url"]}
                alt="track Cover"
              ></img>
              <div>
                <span>{track["name"]}</span>
                {time(track.duration_ms)}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default TrackBox;
