import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

class NavBar extends Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#"> Ludus </a>
          </Navbar.Brand>
        </Navbar.Header>
        {/* <Navbar.Collapse> */}
          <Nav>
            <NavItem eventKey={1} href="#"> Student Dash </NavItem>
            <NavItem eventKey={2} href="#"> Teacher Dash </NavItem>
          </Nav>
        {/* </Navbar.Collapse> */}
      </Navbar>
    );
  }
}

export default NavBar;