import React, { Component } from 'react';
import Sidenav from '../components/Sidenav';
import '../components/Admin.css'
import admin from '../admin.png'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from 'jwt-decode'

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decode: '',
            isauth: null,
            users: [],
            cart: [],
            highest: 0,
            seller: '',
            count: 0,
            hcartproductid: 0,
            hcartproductvalue: 0,
        }
    }

    componentWillMount() {
        var jwt = localStorage.getItem("webtoken");
        if (jwt !== null) {
            var decoded = jwt_decode(jwt)
            this.setState({
                decode: decoded,
                isauth: decoded.Account,
                products: []
            })
        }
    }

    componentDidMount() {
        var link1 = "http://localhost:8123/products"
        axios.get(link1).then(res => {
            this.setState({ products: res.data !== null ? res.data : [] });
        })

        var link = "http://localhost:8123/getallcart/"
        var uni = []
        var final = 0
        var hp = 0
        var p = 0
        axios.get(link).then(res => {
            this.setState({ cart: res.data !== null ? res.data : [] });
            res.data.map((data, i) => {
                if (uni.indexOf(data.Productid) < 0) {
                    uni.push(data.Productid)
                }
            })
            uni.map((data, i) => {
                var z = 0
                res.data.map((data1, i) => {
                    if (data == data1.Productid) {
                        z = z + 1
                        p = data1.Productid
                    }
                })
                if (z > final) {
                    final = z
                    hp = p
                }
            })
            this.setState({
                hcartproductid: hp,
                hcartproductvalue: final
            })
            console.log(final, hp)
        })

        if (localStorage.getItem("webtoken") !== null) {
            var link = "http://localhost:8123/users/"
            axios.get(link).then(res => {
                this.setState({ users: res.data !== null ? res.data : [] });
                res.data.map((data, i) => {
                    console.log(data.Accounttype)
                    if (data.Accounttype === 'Seller') {
                        var sum = 0
                        var c = 0
                        this.state.products.map((data1, i) => {
                            // console.log("hi", data.ID ,data1.Actualprice)
                            if (data.ID === data1.Sellerid) {
                                sum = sum + data1.Actualprice
                                c = c + 1
                            }
                            return ''
                        })
                        if (sum > this.state.highest) {
                            this.setState({
                                highest: sum,
                                seller: data.Name,
                                count: c
                            })
                        }
                    }
                })
            })
        }

    }

    render() {
        if (localStorage.getItem("webtoken") === null || this.state.decode.Account !== 'Admin') {
            return (
                <Redirect path="/" />
            )
        }
        console.log(this.state)
        var s = 0
        var b = 0
        return (
            <div className="container">
                <h2 className="admin-top"><img src={admin} height="120px" width="100px" alt="" /> Admin pannel</h2>
                <div className="row">
                    <div className="col-md-5">
                        <div className="diaplay-content">
                            <div>
                                <div> <h5>Seller with highest product price : {this.state.seller}</h5></div>
                                <div> <h5>Total products worth : {this.state.highest}</h5> </div>
                                <div> <h5>Total No.of.products : {this.state.count}</h5> </div>
                            </div>
                            <br />
                            <div>
                                <div> <h5>Product ID with Highest No.of.qunatity in cart : {this.state.hcartproductid}</h5> </div>
                                <div> <h5>Quantity: {this.state.hcartproductvalue}</h5> </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 tt">
                        <h5>Sellers in onlinestore</h5>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>S.no</th>
                                    <th>Seller ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </tbody>
                            {this.state.users.map((data, i) => {
                                return (
                                    <tbody key={i}>
                                        {data.Accounttype === 'Seller' ?
                                            <tr>
                                                <td>{s = s + 1}</td>
                                                <td>{data.ID}</td>
                                                <td>{data.Name}</td>
                                                <td>{data.Email}</td>
                                            </tr>
                                            : ''
                                        }
                                    </tbody>
                                )
                            })
                            }
                        </table>
                        <h5>Buyers in onlinestore</h5>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>S.no</th>
                                    <th>Buyer ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </tbody>
                            {this.state.users.map((data, i) => {
                                return (
                                    <tbody key={i}>
                                        {data.Accounttype === 'Buyer' ?
                                            <tr>
                                                <td>{b = b + 1}</td>
                                                <td>{data.ID}</td>
                                                <td>{data.Name}</td>
                                                <td>{data.Email}</td>
                                            </tr>
                                            : ''
                                        }
                                    </tbody>
                                )
                            })
                            }
                        </table>
                    </div>
                </div>
            </div>
            // <div>
            // <table>
            //     <tbody>
            //         <tr>
            //             <th>S.no</th>
            //             <th>Name</th>
            //             <th>Account type</th>
            //         </tr>
            //     </tbody>
            // </table>
            // {this.state.users.map((data, i) => { 
            //     return (
            //         ''
            //     )
            // }
            //     )}
            // </div>
        )

    }
}

export default Admin