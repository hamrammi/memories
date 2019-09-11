import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DirectoryTree from "./DirectoryTree/DirectoryTree";

function App() {
  return (
    <>
      <Container>
        <Row>
          {/*<Col><h1>Memories</h1></Col>*/}
        </Row>
        <Row>
          <Col>
            <DirectoryTree/>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
