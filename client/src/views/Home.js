import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { ReducerContext } from "../App";
import TopBox from "../components/TopBox";

const Home = () => {
  // getting the App State
  const { state } = useContext(ReducerContext);

  // user state
  const [user, setUser] = useState("");
  const [top, setTop] = useState([]);
  const [loading, setLoading] = useState(true);

  // calling api to get the User Data
  useEffect(() => {
    // get user data
    console.log("useEffect");
    const getUserData = async () => {
      await axios
        .get(`${process.env.REACT_APP_WEB_API}/me/${state["accessToken"]}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // get user top artists and tracks
    const getTop = async () => {
      await axios
        .get(`${process.env.REACT_APP_WEB_API}/me/top/${state["accessToken"]}`)
        .then((response) => {
          console.log(response.data);
          setTop(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
    getTop();
  }, [state]);

  return (
    <>
      {loading && (
        <Container fluid className="loading">
          <Spinner style={{ height: "50px", width: "50px" }} animation="grow" />
        </Container>
      )}
      {!loading && (
        <Container fluid>
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
                  ></TopBox>
                );
              })}
            </Row>
          </Container>
        </Container>
      )}
    </>
  );
};

export default Home;
