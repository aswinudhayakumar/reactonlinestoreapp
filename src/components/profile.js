import React, { Component } from 'react';
import Sidenav from '../components/Sidenav';
import '../components/profile.css'
import user from '../user.png'
import axios from 'axios';
import {  Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'


class Fav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            decode: '',
            isauth: null,
            products : 0,
            total: 0,
            fav: 0,
            cart: 0,
            highest : 0,
            lowest : 9999999,
        }
    }

    componentWillMount() {
        var jwt = localStorage.getItem("webtoken");
        if (jwt !== null) {
            var decoded = jwt_decode(jwt)
            this.setState({
                decode: decoded,
                isauth: decoded.Account
            })
        }
    }

    componentDidMount() {

        var link1 = "http://localhost:8123/products"
        axios.get(link1).then(res => {
            res.data.map((data, i) => {
                if ( data.Actualprice > this.state.highest ){
                    this.setState({
                        highest : data.Actualprice
                    })
                }
                if ( data.Actualprice < this.state.lowest ){
                    this.setState({
                        lowest : data.Actualprice
                    })
                }
                return ''
            })
            this.setState({ products: res.data !== null ? res.data.length : 0 });
        })

        var link = "http://localhost:8123/getcart/" + this.state.decode.Userid
        axios.post(link).then(res => {
            this.setState({ cart: res.data !== null ? res.data.length : 0 });
        })

        link = "http://localhost:8123/getfav/" + this.state.decode.Userid
        axios.post(link).then(res => {
            this.setState({ fav: res.data !== null ? res.data.length : 0 });
        })

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

        if(localStorage.getItem("webtoken") === null) {
            return( 
                <Redirect path="/" />         
            )
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 toprow">
                        <h2> <img src={user} width="100px" height="100px" alt="" /> User Profile <button onClick={this.signout.bind(this)} className="btn btn-primary sign">Signout</button> </h2>
                        <table className="table">
                            {
                                this.state.isauth === 'Buyer' ?
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td>{this.state.decode.Name}</td>
                                        </tr>
                                        <tr>
                                            <th>Email ID</th>
                                            <td>{this.state.decode.Email}</td>
                                        </tr>
                                        <tr>
                                            <th>Account type</th>
                                            <td>{this.state.isauth}</td>
                                        </tr>
                                        <tr>
                                            <th>Mobile number</th>
                                            <td>7708022202</td>
                                        </tr>
                                        <tr>
                                            <th>Address</th>
                                            <td>2/72, Iduvai, Tiruppur, Tamilnadu</td>
                                        </tr>

                                        <tr>
                                            <th>No.of.products in wishlist</th>
                                            <td>{this.state.fav}</td>
                                        </tr>
                                        <tr>
                                            <th>No.of.products in cart</th>
                                            <td>{this.state.cart}</td>
                                        </tr>

                                        <tr>
                                            <th>No.of.products brought</th>
                                            <td>5</td>
                                        </tr>
                                    </tbody>

                                    :

                                    this.state.isauth === 'Seller' ?

                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td>{this.state.decode.Name}</td>
                                        </tr>
                                        <tr>
                                            <th>Email ID</th>
                                            <td>{this.state.decode.Email}</td>
                                        </tr>
                                        <tr>
                                            <th>Account type</th>
                                            <td>{this.state.isauth}</td>
                                        </tr>
                                        <tr>
                                            <th>Mobile number</th>
                                            <td>7708022202</td>
                                        </tr>
                                        <tr>
                                            <th>Address</th>
                                            <td>2/72, Iduvai, Tiruppur, Tamilnadu</td>
                                        </tr>
                                        <tr>
                                            <th>No.of.products in sale</th>
                                            <td>{this.state.products}</td>
                                        </tr>
                                        <tr>
                                            <th>Highest price for a product</th>
                                            <td>{this.state.highest}</td>
                                        </tr>
                                        <tr>
                                            <th>Lowest price for a product</th>
                                            <td>{this.state.lowest}</td>
                                        </tr>
                                    </tbody>

                                    :

                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td>{this.state.decode.Name}</td>
                                        </tr>
                                        <tr>
                                            <th>Email ID</th>
                                            <td>{this.state.decode.Email}</td>
                                        </tr>
                                        <tr>
                                            <th>Account type</th>
                                            <td>{this.state.isauth}</td>
                                        </tr>
                                    </tbody>

                            }

                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Fav