import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Sidenav.css';

class Sidenav extends Component {
  render() {
    return (
      <div className="con Sidenav">
        <ul>
          <Link className="link" to="/"><li className="bton">Home</li></Link>
          <Link className="link" to="/shirts"><li className="bton" as="li" >Shirts</li></Link>
          <Link className="link" to="/tshirts"><li className="bton" as="li" >T-Shirt</li></Link>
          <Link className="link" to="/pants"><li className="bton" as="li" >Pants</li></Link>
          <Link className="link" to="/shorts"><li className="bton" as="li" >Shorts</li></Link>
        </ul>
      </div>
    )
  }

}
export default Sidenav;