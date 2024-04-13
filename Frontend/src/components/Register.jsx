import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [emailMessage, setEmailMessage] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(false);
  const [cPasswordMessage, setCPasswordMessage] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  function validate(event) {
    if (event.target.name == "email") {
      if (emailRegex.test(event.target.value.toLowerCase())) {
        setEmail(event.target.value.toLowerCase());
        setEmailMessage(false);
      } else {
        setEmail(event.target.value.toLowerCase());
        setEmailMessage(true);
      }
    }

    if (event.target.name == "username") {
      if (
        event.target.value.trim().length >= 2 &&
        !/[^a-zA-Z0-9]/.test(event.target.value.trim())
      ) {
        setUsername(event.target.value.trim());
        setUsernameMessage(false);
      } else {
        setUsername(event.target.value.trim());
        setUsernameMessage(true);
      }
    }

    if (event.target.name == "password") {
      if (
        event.target.value.trim().length >= 6 &&
        !event.target.value.trim().includes(" ")
      ) {
        setPassword(event.target.value.trim());
        setPasswordMessage(false);
      } else {
        setPassword(event.target.value.trim());
        setPasswordMessage(true);
      }
    }

    if (event.target.name == "cPassword") {
      if (event.target.value.trim() == password) {
        setCPassword(event.target.value.trim());
        setCPasswordMessage(false);
      } else {
        setCPassword(event.target.value.trim());
        setCPasswordMessage(true);
      }
    }

    if (event.target.name == "phone") {
      if (phoneRegex.test(event.target.value.trim())) {
        setPhone(event.target.value.trim());
        setPhoneMessage(false);
      } else {
        setPhone(event.target.value.trim());
        setPhoneMessage(true);
      }
    }
  }

  function submitForm() {
    if (
      username &&
      usernameMessage === false &&
      email &&
      emailMessage === false &&
      password &&
      passwordMessage === false &&
      cPassword &&
      cPasswordMessage === false &&
      phone &&
      phoneMessage === false
    ) {
      setIsLoading(true);
      registerUser();
    } else {
      alert("Details are invalid");
    }
  }

  async function registerUser() {

    try {
      let response = await axios.post("http://localhost:9000/user/register", {
        id: email,
        username: username,
        password: password,
        phone: phone,
        role: "USER",
      });
  
      if (response.status == 201) {
        // alert("User registered succesfully!")
        toast.success("register success")
        navigate("/login");
      } 
    } catch(error) {
      if(error.response.status==501) {
        // alert("User already exist")
        toast.error("User Already Exists")
      }
    }

   
    setIsLoading(false);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Signup</h1>
          <Card style={{ padding: "1rem", width: "80%" }}>
            <Form.Group className="mb-3">
              <Form.Label>Email ID</Form.Label>
              <Form.Control
                name="email"
                value={email}
                placeholder="Enter email id"
                onChange={(event) => {
                  validate(event);
                }}
              />
            </Form.Group>
            {emailMessage ? (
              <p style={{ color: "red" }}>Invalid email id</p>
            ) : null}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={username}
                placeholder="Enter username"
                onChange={(event) => {
                  validate(event);
                }}
              />
            </Form.Group>
            {usernameMessage ? (
              <p style={{ color: "red" }}>
                Username is invalid (Length must be 2 and Should not include
                special characters)
              </p>
            ) : null}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(event) => {
                  validate(event);
                }}
              />
            </Form.Group>

            {passwordMessage ? (
              <p style={{ color: "red" }}>Password length is too short</p>
            ) : null}

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="cPassword"
                type="password"
                value={cPassword}
                placeholder="Enter Confirm password"
                onChange={(event) => {
                  validate(event);
                }}
              />
            </Form.Group>

            {cPasswordMessage ? (
              <p style={{ color: "red" }}>
                Password and confirm password must be same
              </p>
            ) : null}

            <Form.Group className="mb-3">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                name="phone"
                type="text"
                value={phone}
                placeholder="Enter phone number"
                onChange={(event) => {
                  validate(event);
                }}
              />
            </Form.Group>

            {phoneMessage ? (
              <p style={{ color: "red" }}>Phone number is invalid</p>
            ) : null}

            <Button
              variant="warning"
              style={{ width: "100%" }}
              onClick={() => {
                submitForm();
              }}
            >
              Signup
            </Button>
          </Card>
        </div>
      )}
    </>
  );
}
