import React from "react";
import { Col } from "react-bootstrap";

const TopBox = ({ name, img }) => {
  return (
    <Col xl={3} l={4} md={6} sm={12} xs={12}>
      <div className="top-box">
        <img alt={name} src={img}></img>
        <span>{name}</span>
      </div>
    </Col>
  );
};

export default TopBox;
