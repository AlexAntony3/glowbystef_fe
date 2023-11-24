import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });
  const { username, password, confirm_password } = signUpInfo;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (e) => {
    setSignUpInfo({
      ...signUpInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("before axios")
      await axios.post("/dj-rest-auth/registration/", signUpInfo);
      console.log("after axios")
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={`${styles.Input} ${styles.Placeholder}`}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password">
              <Form.Label className="d-none">Enter Password</Form.Label>
              <Form.Control
                className={`${styles.Input} ${styles.Placeholder}`}
                type="password"
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="confirm_password">
              <Form.Label className="d-none">Enter Password</Form.Label>
              <Form.Control
                className={`${styles.Input} ${styles.Placeholder}`}
                type="password"
                placeholder="Confirm Password"
                name="confirm_password"
                value={confirm_password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              variant="primary"
              type="submit"
            >
              Sign up
            </Button>
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "https://images.pexels.com/photos/205923/pexels-photo-205923.jpeg"
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
