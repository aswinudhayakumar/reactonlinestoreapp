import React, { Component } from 'react';
import Sidenav from '../components/Sidenav';
import {  Redirect } from 'react-router-dom'
import './Cart.css'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import cart from '../cart.png'

class Cart extends Component {

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
        var link = "http://localhost:8123/getcart/"+this.state.decode.Userid
        axios.post(link).then(res => {
            this.setState({ products: res.data !== null ? res.data : [] });
            
        })
    }
    }

    delcart = (e, a) => {
        var link1 = "http://localhost:8123/delcart/" + this.state.decode.Userid + "/" + a
        axios.post(link1).then(res => {
            console.log("successfully deleted")
        })
        alert("Item removed from cart")
        if(localStorage.getItem("webtoken") !== null){
            var link = "http://localhost:8123/getcart/"+this.state.decode.Userid
            axios.post(link).then(res => {
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

        var value = 0
        var total = 0
          var display = <div>
                <div className="DisplayAll container-fluid">
                    <div className="row header">
                    </div>
                    <div className="row">
                    <table className="table">
                                                <tr>
                                                    <th>S.no</th>
                                                    <th>Category</th>
                                                    <th>Name</th>
                                                    <th>Size</th>
                                                    <th>Mrp</th>
                                                    <th>Discount</th>
                                                    <th>Actual price</th>
                                                    <th>Remove from cart</th>
                                                </tr>
                        {
                            this.state.products.map((data, i) => {

                                total = total + data.Actualprice
                                value += 1
                                return (
                                        <tbody>
                                                <tr>
                                                    <td>{value}</td>
                                                    <td>{data.Category}</td>
                                                    <td>{data.Name}</td>
                                                    <td>{data.Size}</td>
                                                    <td>{data.Mrp}</td>
                                                    <td>{data.Discount}</td>
                                                    <td>{data.Actualprice}</td>
                                                    <td><button className="btn btn-danger" onClick={(e => this.delcart(e, data.ID))}>Remove</button></td>
                                                </tr>
                                            </tbody>
                                        /*<div className="col-md-3 ren" key={i}>
                                            <div className="row">
                                                <div className="col-md-6"><h5 className="card-title">{data.Category}</h5> Size {data.Size}</div>
                                                <div className="col-md-6"><p className="doff">{data.Discount}% off</p></div>
                                            </div>
                                            <div className="ind_image">
                                                <img src={/*data.Image !== 'null' ? data.Image : love} alt="" height="160" width="170" />
                                            </div>
                                            <div className="card-body">
                                                <b className="name"><center>{data.Name}</center></b>
                                                <p>Mrp <strike className="strike">${data.Mrp}</strike> Today ${data.Actualprice}</p><br />
                                                <div className="row">
                                                    <div className="col-md-6"><button className="btn btn-danger">Remove</button></div>
                                                </div>
                                            </div>
                                        </div>*/
                                )
                            })
                        }
                         </table>
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
                            <h3><img src={cart}  height="120px" width="100px" alt=""/> {this.state.decode.Name}'s Cart</h3><br/>
                                {this.state.products.length !== 0 ? display : <div><h1 id="nodata">No data Found</h1></div>}<br/>
                                <div className="gtotal">
                                <p>Grand Total : {total} <div>&nbsp;</div><button className="btn btn-primary">Checkout</button></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart