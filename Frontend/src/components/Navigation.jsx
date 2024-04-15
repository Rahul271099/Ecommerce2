import React, { useContext } from "react";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { CartPlus, Person } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";

export default function Navigation() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          ITV Mart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>

            {localStorage.getItem("role") == "ADMIN" ? (
              <Nav.Link as={Link} to="/addproduct">
                Add Product
              </Nav.Link>
            ) : null}

            {localStorage.getItem("token") ? (
              <Nav.Link
                as={Link}
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "http://localhost:5173/products";
                }}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
          <div
            className="d-flex"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <CartPlus as={Button} color="white" size="40" />
          </div>
          <Badge pill bg="warning">
            {userContext && userContext.user && userContext.user.productsInCart
              ? userContext.user.productsInCart.length
              : 0}
          </Badge>

          {localStorage.getItem("token") && localStorage.getItem("id") ? (
            <>
              <div className="d-flex" style={{ marginLeft: "20px" }}>
                <Person as={Button} color="white" size="40" />
              </div>

              <div className="d-flex">
                <p style={{ color: "white", marginTop: "15px" }}>
                  {userContext && userContext.user && userContext.user.username
                    ? userContext.user.id
                    : null}
                </p>
              </div>
            </>
          ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
