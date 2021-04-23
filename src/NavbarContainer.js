/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import {useAuth0} from '@auth0/auth0-react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

export default function NavbarContainer() {
  const {isAuthenticated} = useAuth0()
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        Jarriola VMachine
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
         {
           isAuthenticated ? (<LogoutButton/>) : (<LoginButton/>) 
         }        
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

