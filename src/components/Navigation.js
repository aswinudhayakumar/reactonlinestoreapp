import React, { Component } from 'react';
import { Button, Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import fav from '../love.png'
import './Navigation.css'

class Navigation extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Navbar className="navigation">
            <Navbar.Brand><span className="white">OnlineStore</span></Navbar.Brand>
            <Nav className="mr-auto">
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="success" className="sbtn">Search</Button>
            </Nav>
            <Form inline>
              <img alt="fav" src={fav} width="30px" height="30px"></img> <div>&nbsp;</div><div>&nbsp;</div>
              <Button variant="primary">Sign in</Button>
            </Form>
          </Navbar>
        </div>
      </div>
    )
  }
}

export default Navigation