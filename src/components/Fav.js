import React, { Component } from 'react';
import Sidenav from '../components/Sidenav';
import {  Redirect } from 'react-router-dom'
import './Cart.css'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import love from '../love.png'

class Fav extends Component {

    constructor(props){
        super(props);
        this.state = {
            total : 0,
            decode : '',
            products : [],
        }
    }

    componentWillMount(){
        var jwt = localStorage.getItem("webtoken");
        if (jwt !== null){
          var decoded = jwt_decode(jwt)
          this.setState({
              decode : decoded,
              isauth : decoded.Account
          })
        }
      }

    componentDidMount(){

        if(localStorage.getItem("webtoken") !== null){
        var link = "http://localhost:8123/getfav/"+this.state.decode.Userid
        console.log(link)
        axios.post(link).then(res => {
            console.log(res.data)
            this.setState({ products: res.data !== null ? res.data : [] });
            
        })
    }
    }


    render() {

        if(localStorage.getItem("webtoken") === null || this.state.decode.Account !== 'Buyer')  {
            return( 
                <Redirect path="/" />         
            )
        }

          var display = <div>
                <div className="DisplayAll container-fluid">
                    <div className="row header">
                    </div>
                    <div className="row">

                            {this.state.products.map((data, i) => {

                                return (

                                        <div className="col-md-3 ren" key={i}>
                                            <div className="row">
                                                <div className="col-md-6"><h5 className="card-title">{data.Category}</h5> Size {data.Size}</div>
                                                <div className="col-md-6"><p className="doff">{data.Discount}% off</p></div>
                                            </div>
                                            <div className="ind_image">
                                                <img src={/*{data.Image !== 'null' ? data.Image :*/ love} alt="" height="160" width="170" />
                                            </div>
                                            <div className="card-body">
                                                <b className="name"><center>{data.Name}</center></b>
                                                <p>Mrp <strike className="strike">${data.Mrp}</strike> Today ${data.Actualprice}</p><br />
                                                <div className="row">
                                                    <div className="col-md-6"><button className="btn btn-danger">Remove</button></div>
                                                </div>
                                            </div>
                                        </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
  
        return (
            <div className="cart-top">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidenav />
                        </div>
                        <div className="col-md-8">
                            <div className="cart">
                            <h3>{this.state.decode.Name}'s Favourites</h3><br/>
                                {this.state.products.length !== 0 ? display : <div><h1 id="nodata">No data Found</h1></div>}<br/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Fav