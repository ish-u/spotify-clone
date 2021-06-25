import { useContext } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { ReducerContext } from "../App";
import { Container } from "react-bootstrap";

const Player = () => {
  const { state } = useContext(ReducerContext);
  const style = {
    position: "fixed",
    bottom: "0",
    left: "0",
    margin: "0 auto",
    zIndex: "100",
    maxHeight: "15vh",
  };
  return (
    <Container fluid style={style}>
      <Container>
        <SpotifyPlayer
          play={state.isPlaying}
          token={state["accessToken"]}
          uris={state.song ? state.song : []}
        ></SpotifyPlayer>
      </Container>
    </Container>
  );
};

export default Player;
