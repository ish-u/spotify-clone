import React from "react";

const TopSearchBox = ({ track, artist, album }) => {
  const top = artist || track || album;
  console.log(top);
  return (
    <>
      {top.length !== 0 && (
        <div className="top-result">
          <img src={top.images[0].url}></img>
          <span>{top.name}</span>
        </div>
      )}
    </>
  );
};

export default TopSearchBox;
