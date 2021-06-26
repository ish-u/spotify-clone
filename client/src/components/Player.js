import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { ReducerContext } from "../App";

const Player = () => {
  const { state } = useContext(ReducerContext);
  const style = {
    position: "fixed",
    bottom: "0",
    left: "0",
    margin: "0 auto",
    zIndex: "100",
    maxHeight: "15vh",
    width: "100%",
    padding: "10px 50px",
    background: "white",
  };
  const [ID, setID] = useState("");

  useEffect(() => {
    const setPlayback = async (id) => {
      await axios
        .get(
          `${process.env.REACT_APP_WEB_API}/me/player/${state["accessToken"]}/${id}`
        )
        .then((response) => {
          console.log(response);
          return response.data.device;
        })
        .catch((error) => console.log(error));
    };
    setPlayback(ID);
  }, [ID]);

  return (
    <div style={style}>
      <SpotifyPlayer
        syncExternalDevice={true}
        play={state.isPlaying}
        callback={(e) => {
          if (e.currentDeviceId) {
            setID(e.currentDeviceId);
          }
        }}
        token={state["accessToken"]}
        uris={state.song ? state.song : []}
      ></SpotifyPlayer>
    </div>
  );
};

export default Player;
