import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { ReducerContext } from "../App";
import TopBox from "../components/TopBox";

const Home = () => {
  // getting the App State
  const { state, dispatch } = useContext(ReducerContext);

  // user state
  const [user, setUser] = useState("");
  const [top, setTop] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  // calling api to get the User Data
  useEffect(() => {
    // get user data
    console.log("useEffect");
    const getUserData = () => {
      axios
        .get(`${process.env.REACT_APP_WEB_API}/me/${state["accessToken"]}`)
        .then((response) => {
          setUser(response.data);
          if (state["id"] === null) {
            dispatch({ type: "SET_USER_ID", payload: response.data.id });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // get user top artists and tracks
    const getTop = () => {
      axios
        .get(`${process.env.REACT_APP_WEB_API}/me/top/${state["accessToken"]}`)
        .then((response) => {
          console.log(response.data);
          setTop(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // get user recently played artitst, albums and tracks
    const getRecent = () => {
      axios
        .get(
          `${process.env.REACT_APP_WEB_API}/me/recent/${state["accessToken"]}`
        )
        .then((response) => {
          console.log(response.data.items);
          setRecent(response.data.items);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getUserData();
    getTop();
    getRecent();
  }, []);

  return (
    <>
      {loading && (
        <Container fluid className="loading">
          <Spinner style={{ height: "50px", width: "50px" }} animation="grow" />
        </Container>
      )}
      {!loading && (
        <Container fluid className="p-5">
          <span className="display-4">
            Welcome, <b>{user["display_name"]}</b>
          </span>
          <br></br>
          <br></br>
          <Container className="m-3">
            <Row className="justify-content-center">
              {top.map((topElement) => {
                return (
                  <TopBox
                    key={topElement["uri"]}
                    name={topElement["name"]}
                    img={topElement["images"][1]["url"]}
                    id={topElement["id"]}
                    type={topElement["type"]}
                  ></TopBox>
                );
              })}
            </Row>
            <Row>
              {/* <ul>
                {recent.map((r) => {
                  return <li>{r.track.name}</li>;
                })}
              </ul> */}
            </Row>
          </Container>
        </Container>
      )}
    </>
  );
};

export default Home;
