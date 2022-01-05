import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Music app</Navbar.Brand>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};
