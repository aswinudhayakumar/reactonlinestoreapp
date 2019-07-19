import React, { Component } from 'react';
import './DisplayAll.css'
import './Pants.css'
import Sidenav from '../components/Sidenav'
import pant from '../pant.jpg'
import Carousal from '../components/Carousal'
import love from '../love.png'
import love1 from '../love1.png'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';

class Pants extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fav: [],
            cart: [],
            products: [],
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
        axios.post(link).then(res => {
            this.setState({ fav: res.data !== null ? res.data : [] });
        })

    }

    deleteproduct = (e, a, b) => {
        var link1 = "http://localhost:8123/deleteproduct/" + a + "/" + b
        axios.post(link1).then(res => {
            console.log("successfully deleted")
        })


        link1 = "http://localhost:8123/products"
        axios.get(link1).then(res => {
            this.setState({ products: res.data !== null ? res.data : [] });
        })
    }



    render() {
        if (this.state.decode.Account === 'Admin') {
            return (
                <Redirect path="/Admin" />
            )
        }
        var value = 0;
        if (this.state.decode.Account === 'Seller') {
            var display = <div>
                <h2 className="head"> <img src={pant} height="80px" width="60px" alt="" /> Now showing Pants</h2>
                <div className="row">
                    {
                        this.state.products.map((data, i) => {
                            var link = "http://localhost:8123/temp-images/" + data.Image
                            return (
                                data.Sellerid === this.state.decode.Userid ?
                                    data.Category === 'Pant' ?
                                        <div className="col-md-3 ren" key={i}>
                                            <div className="row">
                                                <div className="col-md-7">Size {data.Size}</div>
                                                <div className="col-md-5 off">{data.Discount}% off</div>
                                            </div>

                                            <div className="ind_image">
                                                <img src={data.image !== 'null' ? link : love} alt="" height="160" width="170" />
                                            </div>
                                            <div className="card-body">
                                                <b className="name"><center>{data.Name}</center></b>
                                                <p>Mrp <strike className="strike">${data.Mrp}</strike> Today ${data.Actualprice}</p><br />
                                                <div className="row">
                                                    <div className="col-md-6"><button className="btn btn-danger">Remove</button></div>

                                                </div>
                                            </div>
                                        </div>
                                        : '' : ''


                            )
                        })
                    }
                </div>
            </div>
        }
        else if (this.state.decode.Account === 'Buyer') {
            display = <div>
                <h2 className="head"><img src={pant} height="80px" width="60px" alt="" /> Now showing Pants</h2>
                <div className="row">
                    {
                        this.state.products.map((data, i) => {
                            var link = "http://localhost:8123/temp-images/" + data.Image
                            var d = 0;
                            var f = 0;
                            return (
                                data.Category === 'Pant' ?
                                    <div className="col-md-3 ren" key={i}>
                                        <div className="row">
                                            <div className="col-md-7">Size {data.Size}</div>
                                            <div className="col-md-5 off">{data.Discount}% off</div>
                                        </div>

                                        <div className="ind_image">
                                            <img src={data.image !== 'null' ? link : love} alt="" height="160" width="170" />
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
                                                <div className="col-md-4"><button className="btn btn-primary">Buy</button></div>
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
                                    : ''


                            )
                        })
                    }
                </div>
            </div>
        }
        else {
            display = <div>
                <h2 className="head"><img src={pant} height="80px" width="60px" alt="" /> Now showing Pants</h2>
                <div className="row">
                    {
                        this.state.products.map((data, i) => {
                            var link = "http://localhost:8123/temp-images/" + data.Image
                            return (
                                data.Category === 'Pant' ?
                                    <div className="col-md-3 ren" key={i}>
                                        <div className="row">
                                            <div className="col-md-7">Size {data.Size}</div>
                                            <div className="col-md-5 off">{data.Discount}% off</div>
                                        </div>

                                        <div className="ind_image">
                                            <img src={data.image !== 'null' ? link : love} alt="" height="160" width="170" />
                                        </div>
                                        <div className="card-body">
                                            <b className="name"><center>{data.Name}</center></b>
                                            <p>Mrp <strike className="strike">${data.Mrp}</strike> Today ${data.Actualprice}</p><br />
                                            <div className="row">
                                                <div className="col-md-4"><button disabled className="btn btn-primary">Buy</button></div>
                                                <div className="col-md-6"><button disabled className="btn btn-primary">Add to cart</button></div>
                                            </div>
                                        </div>
                                    </div>
                                    : ''


                            )
                        })
                    }
                </div>
            </div>
        }
        return (
            <div>
                <Carousal />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidenav />
                        </div>
                        <div className="col-md-8 new">

                            {
                                this.state.products.map((data) => {
                                    this.state.decode.Account === 'Seller' ?
                                        data.Category === 'Pant' && data.Sellerid === this.state.decode.Userid ? value = 1 : console.log('') :
                                        data.Category === 'Pant' ? value = 1 : console.log('')
                                    return ('')

                                })
                            }
                            {value === 1 ? display :
                                // <h2 id="nodata">No Products Found</h2>
                                <div className="row">
                                    <div className="col-md-3 ren skeleton"><Skeleton count={10} /></div>
                                    <div className="col-md-3 ren skeleton"><Skeleton count={10} /></div>
                                    <div className="col-md-3 ren skeleton"><Skeleton count={10} /></div>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Pants