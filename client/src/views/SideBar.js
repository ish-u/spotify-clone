import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const SideBar = () => {
  const location = useLocation();
  return (
    <div className="side-bar">
      <Container className="p-3">
        <Row style={{ flexDirection: "column", rowGap: "1vh" }}>
          <Col>
            <div
              className={`${location.pathname === "/" ? "active" : ""} navLink`}
            >
              <Link to="/">Home</Link>
            </div>
          </Col>
          <Col>
            <div
              className={`${
                location.pathname === "/search" ? "active" : ""
              } navLink`}
            >
              <Link to="/search">Search</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SideBar;
