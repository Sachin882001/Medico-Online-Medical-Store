import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../noPage/NoPage.css"; // Optional: Import a CSS file for additional styling

const NoPage = () => {
  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} className="border rounded p-4 bg-light shadow-sm">
          <h1 className="display-1 text-danger">404</h1>
          <h2 className="text-muted mb-4">Page Not Found</h2>
          <p className="mb-4">Sorry, the page you are looking for does not exist. It might have been moved or deleted.</p>
          <Button variant="primary" as={Link} to="/" className="btn-lg">
            Go to Homepage
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NoPage;
