import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const TutorLogout = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("token");
    console.log("Logged out");
    navigate("/home/tutor/login");
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <Form
            style={{
              padding: "3rem",
              backgroundColor: "#f7f7f7",
              borderRadius: "10px",
            }}
          >
            <h1
              className="text-center"
              style={{ marginBottom: "1rem", textAlign: "center" }}
            >
              Log Out
            </h1>
            <Button
              variant="primary"
              type="submit"
              style={{
                marginTop: "2rem",
                width: "100%",
                backgroundColor: "#4285f4",
                border: "none",
                padding: "1rem",
                borderRadius: "4px",
                fontWeight: "bold",
              }}
              onClick={handleClick}
            >
              Log Out
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TutorLogout;
