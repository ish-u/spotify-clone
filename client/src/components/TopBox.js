import React from "react";
import { Col } from "react-bootstrap";

const TopBox = ({ name, img, id, type }) => {
  return (
    <Col xl={3} lg={4} md={6} sm={12} xs={12}>
      <div className="top-box">
        <img alt={name} src={img}></img>
        <span>
          <a href={`/${type}/${id}`}>{name}</a>
        </span>
      </div>
    </Col>
  );
};

export default TopBox;
