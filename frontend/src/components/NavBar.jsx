import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import Contacts from './Contacts';
import LearningPath from '../scenes/LearningPath';
import Home from '../scenes/Home';
import Login from '../scenes/Login';
/*class NavBar extends Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#"> Ludus </a>
          </Navbar.Brand>
        </Navbar.Header>
        {/!* <Navbar.Collapse> *!/}
        <Nav>
          <NavItem eventKey={1} href="#">
            {' '}
            Student Dash{' '}
          </NavItem>
          <NavItem eventKey={2} href="#">
            {' '}
            Teacher Dash{' '}
          </NavItem>
          <a href="../user_profile.html">User Profile</a>
        </Nav>
        {/!* </Navbar.Collapse> *!/}
      </Navbar>
    );
  }
}*/

class NavBar extends Component {
  render() {
    return (
      <Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/learningpath" component={LearningPath} />

          <Route exact path="/contacts" component={Contacts} />
        </Switch>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/LearningPath">LearningPath</Link>
            </li>
            <li>
              <Link to="/contacts">contacts</Link>
            </li>
          </ul>
        </nav>
      </Navbar>
    );
  }
}

export default NavBar;
