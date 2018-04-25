import React from 'react';
import { Row, Col, Jumbotron } from 'reactstrap';

const Temp = ({ temp }) => (
  <div>
    <Row>
      <Jumbotron className="bg-primary text-white">
        <h1>{temp}</h1>
      </Jumbotron>
    </Row>
  </div>
);

export default Temp;
