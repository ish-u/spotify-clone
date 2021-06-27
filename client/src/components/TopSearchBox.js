import React from "react";

const TopSearchBox = ({ track, artist, album }) => {
  let top = "";
  if (artist !== null) {
    top = artist;
  } else if (track !== null) {
    top = track;
  } else if (album !== null) {
    top = album;
  }
  return (
    <>
      <div className="top-result-container">
        <span className="display-4">Top Result</span>
        <br></br>
        <div className="top-result">
          <img alt="Top Result" src={top.images[0].url}></img>
          <span>{top.name}</span>
        </div>
      </div>
    </>
  );
};

export default TopSearchBox;
