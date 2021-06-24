import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const SideBar = () => {
  const style = {
    position: "fixed",
    left: "0",
    top: "0",
    height: "100vh",
    width: "20vw",
    background: "#8377D1",
    color: "black",
  };
  return (
    <Container className="p-5" style={style}>
      <Link to="/search">Search</Link>
      <br></br>
      <Link to="/">Home</Link>
    </Container>
  );
};

export default SideBar;
