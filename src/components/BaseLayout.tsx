import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const BaseLayout = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logOut();
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand>Music app</Navbar.Brand>
          {currentUser && <Button onClick={handleLogOut}>Log Out</Button>}
        </Container>
      </Navbar>
      <div>
        <Outlet />
      </div>
    </>
  );
};
