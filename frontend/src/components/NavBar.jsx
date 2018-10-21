import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Ludus</Link>
          </Navbar.Brand>
        </Navbar.Header>
        {/* <Navbar.Collapse> */}
        <Nav>
          <NavItem eventKey={1} href="#">
            {' '}
            Student Dash{' '}
          </NavItem>
          <NavItem eventKey={2} href="#">
            {' '}
            Teacher Dash{' '}
          </NavItem>
        </Nav>
        {/* </Navbar.Collapse> */}
      </Navbar>
    );
  }
}

export default NavBar;
