import React, { Component } from 'react';
import './Footer.css'



class Footer extends Component {
    render(){
        return(
            <div className="container-fluid total">
                <div className="row foot">
                    <div className="col-md-2"></div>
                    <div className="col-md-2"></div>
                    <div className="col-md-2">
                        <p>Contact us</p>
                        <p>About</p>
                        <p>Technology stack</p>
                        <p>Carrer</p>
                    </div>
                    <div className="col-md-2">
                        <p>Follow us at</p>
                        <p>Facebook</p>
                        <p>Instagram</p>
                        <p>Twitter</p>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        )
    }
}

export default Footer