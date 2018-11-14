import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    if (this.props.userID) {
      return (
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Ludus</Link>
            </Navbar.Brand>
          </Navbar.Header>
          {/* <Navbar.Collapse> */}
          <div>
            <Link to="/profile">Profile</Link> <br />
            <Link to="/signup">Dashboard</Link>
          </div>
          {/* </Navbar.Collapse> */}
        </Navbar>
      );
    } else {
      return (
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Ludus</Link>
            </Navbar.Brand>
          </Navbar.Header>
          {/* <Navbar.Collapse> */}
          <div>
            <Link to="/signup">Sign Up</Link> <br />
            <Link to="/login">Log In</Link>
          </div>
          {/* </Navbar.Collapse> */}
        </Navbar>
      );
    }
  }
}

export default NavBar;
