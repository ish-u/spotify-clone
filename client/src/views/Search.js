import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Container, Row, InputGroup, FormControl } from "react-bootstrap";
import { ReducerContext } from "../App";
import SongBox from "../components/songBox";

const Search = () => {
  // getting the App State
  const { state, dispatch } = useContext(ReducerContext);

  // Search Query State
  const [query, setQuery] = useState("");
  // Get Search Results
  const search = (query) => {
    console.log(query);
    if (query) {
      axios
        .get(
          `${process.env.REACT_APP_WEB_API}/search/${query}/${state["accessToken"]}`
        )
        .then((response) => {
          dispatch({
            type: "SEARCH_RESULTS",
            payload: response.data.data.items,
          });
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch({
        type: "CLEAR_SEARCH_RESULTS",
        payload: "",
      });
    }
  };

  return (
    <Container className="p-5">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search"
          aria-label="Search Query"
          type="text"
          name="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            search(e.target.value);
          }}
        />
      </InputGroup>
      <Container className="p-5">
        <Row className="justify-content-center">
          {state["searchResults"] &&
            state["searchResults"].map((r) => {
              return (
                <SongBox key={r["uri"]} song={r} dispatch={dispatch}></SongBox>
              );
            })}
        </Row>
      </Container>
    </Container>
  );
};

export default Search;
