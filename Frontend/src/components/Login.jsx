import React, { useState } from 'react'
import {Card, Form, Button} from "react-bootstrap"
import { Link } from 'react-router-dom';
import {toast} from "react-toastify"
import axios from "axios";
import {useNavigate} from "react-router-dom"


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  async function login() {
    if(email && password) {
      try {
        let response = await axios.post("http://localhost:9000/user/login", {
          id:email,
          password:password
        });
        console.log(response);
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("token", response.data.token);
        toast.success("Logged in succesfully");
        window.location.href="http://localhost:5173/products";
      } catch(error) {
        if(error.response.status==404) {
          toast("Invalid credentials");
        } else {
          toast("Something went wrong");
        }
      }
    } else {
      toast("Invalid credentials");
    }
  }

  return (
    <div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <h1>Login</h1>
        <Card style={{ padding: "1rem", width: "40%" }}>
            <Form.Group className="mb-3">
              <Form.Label>Email ID</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                placeholder="Enter email id"
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
              />
            </Form.Group>
            <Button variant='warning' style={{width:"100%"}} onClick={()=>{
              login()
            }}>Submit</Button>
            <p style={{marginTop:"5%"}}>Don't have an account? <Link to="/register" style={{color:"blue"}}>Signup here</Link></p>
          </Card>
    </div>
  )
}
