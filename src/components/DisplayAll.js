import React, { Component } from 'react';
import './DisplayAll.css'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import love from '../love.png'
import clothes from '../clothes1.jpg'
import love1 from '../love1.png'
import Sidenav from '../components/Sidenav'
import Carousal from '../components/Carousal'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
import Admin from '../components/Admin';
import Skeleton from 'react-loading-skeleton';
import Loader from 'react-loader-spinner'


class DisplayAll extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            cart: [],
            fav: [],
            decode: {},
            isauth: false,
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
            this.setState({ products: res.data !== null ? res.data : [] });
        })
        var link = "http://localhost:8123/getcart/" + this.state.decode.Userid
        axios.post(link).then(res => {
            this.setState({ cart: res.data !== null ? res.data : [] });

        })
        link = "http://localhost:8123/getfav/" + this.state.decode.Userid
        axios.post(link).then(res => {
            this.setState({ fav: res.data !== null ? res.data : [] });

        })

        /* this.setState({ products: localStorage.getItem("data") !== null ? JSON.parse(localStorage.getItem("data")) : [] }); */
    }


    addcart = (e, a) => {
        var link1 = "http://localhost:8123/addtocart/" + this.state.decode.Userid + "/" + a
        axios.post(link1).then(res => {
            console.log("successfully added")
        })

        var link = "http://localhost:8123/getcart/" + this.state.decode.Userid
        console.log("add cart")
        axios.post(link).then(res => {
            this.setState({ cart: res.data !== null ? res.data : [] });

        })
    }

    addfav = (e, a) => {
        var link1 = "http://localhost:8123/addtofav/" + this.state.decode.Userid + "/" + a
        axios.post(link1).then(res => {
            console.log("successfully added")
        })

        var link = "http://localhost:8123/getfav/" + this.state.decode.Userid
        console.log("add fav")
        axios.post(link).then(res => {
            this.setState({ fav: res.data !== null ? res.data : [] });

        })

    }

    delfav = (e, a) => {
        var link1 = "http://localhost:8123/delfav/" + this.state.decode.Userid + "/" + a
        axios.post(link1).then(res => {
            console.log("successfully deleted")
        })

        var link = "http://localhost:8123/getfav/" + this.state.decode.Userid
        console.log("asd")
        axios.post(link).then(res => {
            this.setState({ fav: res.data !== null ? res.data : [] });
        })

    }

    deleteproduct = (e, a, b) => {
        var link1 = "http://localhost:8123/deleteproduct/" + a + "/" + b
        axios.post(link1).then(res => {
            console.log("successfully deleted")
        })

        var link1 = "http://localhost:8123/products"
        console.log("asd")
        axios.get(link1).then(res => {
            this.setState({ products: res.data !== null ? res.data : [] });
        })
    }

    changetext = () => {
        document.getElementById("ctext").innerHTML = "Signin"
        document.getElementById("ctext").style.transition = "0.2s ease-in-out";
    }

    changetext2 = () => {
        document.getElementById("ctext").innerHTML = "Buy"
        document.getElementById("ctext").style.transition = "0.2s ease-in-out";
    }



    render() {


        if (this.state.decode.Account === 'Seller') {
            var display = <div>
                <div className="DisplayAll container-fluid">
                    <div className="row header">
                        <div className="col-md-8"><h2 className="head"> <img src={clothes} height="80px" width="60px" alt="" /> Now showing all products</h2><Link className="link splink" to="/add"><Button variant="success" data-toggle="modal" data-target="#exampleModal" className="addbtn sbtn" >Add New</Button></Link></div>
                    </div>
                    <div className="row">
                        {
                            this.state.products.map((data, i) => {
                                var link = "http://localhost:8123/temp-images/" + data.Image
                                return (
                                    data.Sellerid === this.state.decode.Userid ?
                                        <div className="col-md-3 ren" key={i}>
                                            <div className="row">
                                                <div className="col-md-6"><h5 className="card-title">{data.Category}</h5> Size {data.Size}</div>
                                                <div className="col-md-6"><p className="doff">{data.Discount}% off</p></div>
                                            </div>
                                            <div className="ind_image">
                                                <img src={data.Image !== 'null' ? link : love} alt="" height="160" width="170" />
                                            </div>
                                            <div className="card-body">
                                                <b className="name"><center>{data.Name}</center></b>
                                                <p>Mrp <strike className="strike">${data.Mrp}</strike> Today ${data.Actualprice}</p><br />
                                                <div className="row">
                                                    <div className="col-md-6"><button onClick={(e => this.deleteproduct(e, data.Sellerid, data.ID))} className="btn btn-danger">Remove</button></div>
                                                </div>
                                            </div>
                                        </div>
                                        : ''
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        } else if (this.state.decode.Account === 'Buyer') {

            display = <div>
                <div className="DisplayAll container-fluid">
                    <div className="row header">
                        <div className="col-md-8"><h2 className="head"><img src={clothes} height="80px" width="60px" alt="" /> Now showing all products</h2></div>
                    </div>
                    <div className="row">
                        {
                            this.state.products.map((data, i) => {
                                var link = "http://localhost:8123/temp-images/" + data.Image
                                var d = 0
                                var f = 0
                                var a = 0
                                return (
                                    <div className="col-md-3 ren" key={i}>
                                        <div className="row">
                                            <div className="col-md-6"><h5 className="card-title">{data.Category}</h5> Size {data.Size}</div>
                                            <div className="col-md-6"><p className="doff">{data.Discount}% off</p></div>
                                        </div>
                                        <div className="ind_image">
                                            <img src={data.Image !== 'null' ? link : love} alt="" height="160" width="170" />
                                        </div>
                                        <div className="card-body">
                                            <b className="name"><center>{data.Name}</center></b>
                                            <p>Mrp <strike className="strike">${data.Mrp}</strike> Today ${data.Actualprice}</p><br />
                                            <div className="row">
                                                {
                                                    this.state.fav.map((data1, j) => {
                                                        if (data.ID === data1.ID) {

                                                            f = 1
                                                        }
                                                        return ''
                                                    })
                                                }

                                                {f === 1 ? <img src={love} onClick={(e => this.delfav(e, data.ID))} className="love" alt="" height="25px" width="25px" /> : <img src={love1} onClick={(e => this.addfav(e, data.ID))} className="love" alt="" height="25px" width="25px" />}
                                                <div className="col-md-4">
                                                    <button type="button" data-keyboard='false' data-backdrop='static' class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                                        Buy
                                                    </button>

                                                </div>
                                                <div className="col-md-6">
                                                    {
                                                        this.state.cart.map((data1, j) => {
                                                            if (data.ID === data1.ID) {
                                                                d = 1
                                                            }
                                                            return ''
                                                        })
                                                    }

                                                    {d === 1 ? <button disabled className="btn btn-success">In cart</button> : <button className="btn btn-primary" onClick={(e => this.addcart(e, data.ID))}>Add to cart</button>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        }
        else {

            display = <div>
                <div className="DisplayAll container-fluid">
                    <div className="row header">
                        <div className="col-md-8"><h2 className="head"><img src={clothes} height="100px" width="120px" alt="" /> Now showing all products</h2></div>
                    </div>
                    <div className="row">
                        {
                            this.state.products.map((data, i) => {
                                var link = "http://localhost:8123/temp-images/" + data.Image
                                return (
                                    <div className="col-md-3 ren" key={i}>
                                        <div className="row">
                                            <div className="col-md-6"><h5 className="card-title">{data.Category}</h5>Size {data.Size}</div>
                                            <div className="col-md-6"><p className="doff">{data.Discount}% off</p></div>
                                        </div>
                                        <div className="ind_image">
                                            <img src={data.Image !== 'null' ? link : love} alt="" height="160" width="170" />
                                        </div>
                                        <div className="card-body">
                                            <b className="name"><center>{data.Name}</center></b>
                                            <p>Mrp <strike className="strike">${data.Mrp}</strike> Today ${data.Actualprice}</p><br />
                                            <div className="row">
                                                <div className="col-md-4"><button id="ctext" disabled className="btn btn-primary" >Sign in to access</button></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        }



        return (
            <div>
                {this.state.decode.Account === 'Admin' ? <Admin /> :

                    <div className="display-trans">
                        <Carousal />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-3">
                                    <Sidenav />
                                </div>
                                <div className="col-md-8 new">
                                    <div>

                                        {this.state.products.length !== 0 ? display : <div>
                                            {/* <h1 id="nodata">No data Found</h1> */}
                                            {/* <Loader
                                                type="TailSpin"
                                                color="#b2bec3"
                                                height="200"
                                                width="200"
                                                className="loader"
                                            /> */}
                                            <div className="row">
                                                <div className="col-md-3 ren skeleton"><Skeleton count={10} /></div>
                                                <div className="col-md-3 ren skeleton"><Skeleton count={10}/></div>
                                                <div className="col-md-3 ren skeleton"><Skeleton count={10} /></div>
                                            </div>
                                            {this.state.decode.Account === 'Seller' ? <Link className="link splink" to="/add"><Button variant="success" data-toggle="modal" data-target="#exampleModal" className="addbtn sbtn" >Add New</Button></Link> : ''}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )

    }
}

export default DisplayAll