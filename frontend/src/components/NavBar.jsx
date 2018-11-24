import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {
  render() {
    if (this.props.userID) {
      return (
        <div className="Bar">
          <Navbar fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <h1>
                  <Link to="/">Ludus</Link>
                </h1>
              </Navbar.Brand>
            </Navbar.Header>
            {/* <Navbar.Collapse> */}
            <div>
              <Link to="/profile">Profile</Link> <br />
              <Link to="/dashboard">Dashboard</Link>
            </div>
            {/* </Navbar.Collapse> */}
          </Navbar>
        </div>
      );
    } else {
      return (
        <div className="Bar">
          <Navbar fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <h1>
                  <Link to="/">Ludus</Link>
                </h1>
              </Navbar.Brand>
            </Navbar.Header>
            {/* <Navbar.Collapse> */}
            <div>
              <Link to="/signup">Sign Up</Link> <br />
              <Link to="/login">Log In</Link>
            </div>
            {/* </Navbar.Collapse> */}
          </Navbar>
        </div>
      );
    }
  }
}

export default NavBar;
