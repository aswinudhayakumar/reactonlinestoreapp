import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap';
import one from '../f1.jpg'
import two from '../nf2.jpg'
import three from '../nf3.png'
import './Sidenav.css'

class Carousal extends Component{
    render(){
        return(
            <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={three}
      height="500px"
      alt="First slide"
    />
    <Carousel.Caption>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={one}
      alt="Second slide"
      height="500px"
    />

    <Carousel.Caption>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={two}
      height="500px"
      alt="Third slide"
    />

    <Carousel.Caption>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
        )
    }
}

export default Carousal
