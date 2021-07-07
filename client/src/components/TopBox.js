import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopBox = ({ name, img, id, type }) => {
  return (
    <Col xl={3} lg={4} md={6} sm={12} xs={12}>
      <Link to={`/${type}/${id}`}>
        <div className="top-box">
          <img alt={name} src={img}></img>
          <span>{name}</span>
        </div>
      </Link>
    </Col>
  );
};

export default TopBox;
