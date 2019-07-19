import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Sidenav.css';
import clothes from '../clothes1.jpg'
import pant from '../pant.jpg'
import shirts from '../shirts1.png'
import short from '../shorts.jpg'
import tshirt from '../tshirt.png'

class Sidenav extends Component {
  render() {
    return (
      <div className="con Sidenav">
        <ul>
          <Link className="link" to="/"><li className="bton"><img src={clothes} className="round" height="35px" width="35px" alt=""/> Home</li></Link>
          <Link className="link" to="/shirts"><li className="bton" as="li" ><img src={shirts} className="round" height="35px" width="35px" alt=""/> Shirts</li></Link>
          <Link className="link" to="/tshirts"><li className="bton" as="li" ><img src={tshirt} className="round" height="35px" width="35px" alt=""/> T-Shirt</li></Link>
          <Link className="link" to="/pants"><li className="bton" as="li" ><img src={pant} className="round" height="35px" width="35px" alt=""/> Pants</li></Link>
          <Link className="link" to="/shorts"><li className="bton" as="li" ><img src={short} className="round" height="35px" width="35px" alt=""/> Shorts</li></Link>
        </ul>
      </div>
    )
  }

}
export default Sidenav;