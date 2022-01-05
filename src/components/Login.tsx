import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseError } from "@firebase/util";

export const Login = () => {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    setError("");
    if (form.checkValidity()) {
      try {
        await login(values.email, values.password);
        navigate("/");
      } catch (error) {
        if (error instanceof FirebaseError) {
          if (error.code === "auth/user-not-found") {
            setError("User not found");
          } else {
            setError("An error occurred. Please try again.");
          }
        }
      }
    } else {
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
    navigate("/");
  };

  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto align-self-center">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Login</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a password.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className="w-100" variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
              <div className="text-center"> or</div>
              <Button
                className="w-100 text-center mt-2"
                onClick={handleGoogleLogin}
              >
                <i className="fab fa-google"></i> Sign in with Google
              </Button>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
