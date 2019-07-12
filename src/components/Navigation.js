import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import fav from '../love.png'
import cart from '../cart.png'
import './Navigation.css'
import jwt_decode from 'jwt-decode'

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isauth: false,
      decode: null,
      user: null,
    }
  }

  componentDidMount() {
    var jwt = localStorage.getItem("webtoken");
    if (jwt !== null) {
      var decoded = jwt_decode(jwt)
      this.setState({
        decode: decoded,
        user: decoded.Name,
        isauth: true
      })
    }
  }

  getit = () => {
    var jwt = localStorage.getItem("webtoken");
    if (jwt !== null) {
      var decoded = jwt_decode(jwt)
      this.setState({
        decode: decoded,
        user: decoded.Name,
        isauth: true
      })
    }
  }


  signout = () => {
    localStorage.removeItem("webtoken");
    localStorage.removeItem("bos");
    this.setState({
      decode: null,
      user: null,
      isauth: false
    })
    window.location.replace("http://localhost:3000")
  }


  render() {
    return (
      <div className="container-fluid">
        {/* <Navbar className="navigation">
            <Link className="link" to="/"><Navbar.Brand><span className="white">OnlineStore</span></Navbar.Brand></Link>
            <Nav className="mr-auto">
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="success" className="sbtn">Search</Button>
            </Nav>
            <Form inline>
              <img alt="fav" src={fav} width="30px" height="30px"></img> <div>&nbsp;</div><div>&nbsp;</div>
              <Link className="link" to="/signin"><Button variant="primary">Sign in</Button></Link>
            </Form>
          </Navbar> */}
        <nav className="navbar navbar-expand-md navigation">
          <Link className="link" to="/"><p className="navbar-brand">OnlineStore</p></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon navbar-dark"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" />
              </li>
              <li className="nav-item">
                <button className="btn sbtn ss">Search</button>
              </li>
            </ul>
            <div className="my-2 my-lg-0">
              <div className="greet">{this.state.isauth === true ? <span>{this.state.decode.Account === 'Buyer' ? <span><Link className="link" to="/fav"><img src={fav} height="25px" width="25px" alt="" /></Link> <Link className="link" to="/Cart"><img src={cart} height="25px" width="25px" alt="" /></Link></span> : ''} Hello,  {this.state.user}<button onClick={this.signout.bind(this)} className="btn btn-primary sign">Signout</button></span> : <span>Hello, Guest<Link className="link" to="/signin"><button className="sign btn btn-primary">Signin</button></Link></span>}  </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navigation