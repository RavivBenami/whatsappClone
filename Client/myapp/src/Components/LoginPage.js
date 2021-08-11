import React, { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

function LoginPage({ onIdSubmit }) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function createUser() {
    let user = { username: userName, password: password };
    let userResp = await axios.post("http://localhost:5000/user", user);
    onIdSubmit(userResp.data._id);
  }
  async function loginUser() {
    let userResp = await axios.get("http://localhost:5000/user");
    if (userResp.data != []) {
      userResp.data.forEach((user) => {
        if (user.username == userName && user.password == password) {
          onIdSubmit(user._id);
        }
      });
    }
  }

  return (
    <Container className="align-items-center d-flex" style={{ height: "100vh" }}>
      <Form className="w-100">
        <Form.Group>
          <Form.Label>Enter Your Username</Form.Label>
          <Form.Control type="text" onChange={(e) => setUsername(e.target.value)}></Form.Control>
          <Form.Label>Enter Your Password</Form.Label>
          <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type="button" onClick={loginUser} className="mr-2">
          Login
        </Button>
        <Button type="button" variant="secondary" onClick={createUser} className="mr-2">
          Create New User
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
