import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Container, Row, InputGroup, FormControl } from "react-bootstrap";
import { ReducerContext } from "../App";
import SongBox from "../components/songBox";
// cancel token
let cancelToken;

const Search = () => {
  // getting the App State
  const { state, dispatch } = useContext(ReducerContext);

  // Search Query State
  const [query, setQuery] = useState("");

  // Get Search Results
  useEffect(() => {
    const search = async (q) => {
      //Check if there are any previous pending requests
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.");
      }
      console.log(q);
      cancelToken = axios.CancelToken.source();
      await axios
        .get(
          `${process.env.REACT_APP_WEB_API}/search/${q}/${state["accessToken"]}`,
          { cancelToken: cancelToken.token }
        )
        .then((response) => {
          if (q !== "") {
            console.log(q);
            dispatch({
              type: "SEARCH_RESULTS",
              payload: response.data.data.items,
            });
          } else {
            dispatch({
              type: "CLEAR_SEARCH_RESULTS",
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: "CLEAR_SEARCH_RESULTS",
          });
          console.log(error);
        });
    };
    search(query);
  }, [query, dispatch]);

  return (
    <Container fluid>
      <Container>
        <InputGroup
          className="mb-3"
          style={{
            width: "25vw",
          }}
        >
          <FormControl
            style={{
              borderRadius: "25px",
              padding: "10px",
              fontSize: "large",
            }}
            placeholder="Search..."
            aria-label="Search Query"
            type="text"
            name="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </InputGroup>
        <Container className="p-5">
          <Row className="justify-content-center">
            {state["searchResults"] &&
              state["searchResults"].map((r) => {
                return (
                  <SongBox
                    key={r["uri"]}
                    song={r}
                    dispatch={dispatch}
                  ></SongBox>
                );
              })}
          </Row>
        </Container>
      </Container>
    </Container>
  );
};

export default Search;
