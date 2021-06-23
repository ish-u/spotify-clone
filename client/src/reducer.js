const reducer = (state, action) => {
  switch (action.type) {
    case "INDEX":
      console.log("INDEX");
      return state;
    case "ADD_TOKEN":
      console.log("AUTHENTICATED");
      return {
        ...state,
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
      };
    case "SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "CLEAR_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: [],
      };
    case "PLAY_SONG":
      return {
        ...state,
        song: [action.payload, ...state.song],
        isPlaying: true,
      };
    default:
      Error("YOU DID SOMETHING YOU WERE NOT SUPPOSE TO DO");
      break;
  }
};

export default reducer;
