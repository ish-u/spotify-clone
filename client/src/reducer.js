const reducer = (state, action) => {
  switch (action.type) {
    case "INDEX":
      console.log("INDEX");
      return state;
    case "ADD_TOKEN":
      console.log("AUTHENTICATED");
      localStorage.setItem(
        "initialState",
        JSON.stringify({
          ...state,
          isAuthenticated: true,
          accessToken: action.payload.access_token,
          refreshToken: action.payload.refresh_token,
          expiresIn: action.payload.expires_in,
        })
      );
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
        expiresIn: action.payload.expires_in,
      };
    case "LOGOUT":
      console.log(action);
      localStorage.removeItem("initialState");
      return {};
    case "PLAY_SONG":
      return {
        ...state,
        song: [action.payload, ...state.song],
        isPlaying: true,
      };
    case "SET_USER_ID":
      return {
        ...state,
        id: action.payload,
      };
    default:
      Error("YOU DID SOMETHING YOU WERE NOT SUPPOSE TO DO");
      break;
  }
};

export default reducer;
