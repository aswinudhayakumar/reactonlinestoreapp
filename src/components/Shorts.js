import React, { Component } from 'react';
import './DisplayAll.css'
import './Shorts.css'
import love from '../love.png'
import love1 from '../love1.png'
import Sidenav from '../components/Sidenav'
import Carousal from '../components/Carousal'
import axios from 'axios';
import jwt_decode from 'jwt-decode'

class Shorts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cart :[],
            fav:{},
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
            console.log(this.state.products)
        })
        var link = "http://localhost:8123/getcart/" + this.state.decode.Userid
        console.log(link)
        axios.post(link).then(res => {
            this.setState({ cart: res.data !== null ? res.data : [] });

        })
        var link = "http://localhost:8123/getfav/" + this.state.decode.Userid
        console.log(link)
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
        window.location.replace("http://localhost:3000")
    }

    addfav = (e, a) => {
        var link1 = "http://localhost:8123/addtofav/" + this.state.decode.Userid + "/" + a
        axios.post(link1).then(res => {
            console.log("successfully added")
        })
        window.location.replace("http://localhost:3000")
    }



    render() {
        var value = 0;
        if (this.state.decode.Account === 'Seller') {
            var display = <div>
                <h2 className="head">Now showing Shorts</h2>
                <div className="row">
                    {
                        this.state.products.map((data, i) => {
                            return (
                                data.Sellerid === this.state.decode.Userid ?
                                    data.Category === 'Shorts' ?
                                        <div className="col-md-3 ren" key={i}>
                                            <div className="row">
                                                <div className="col-md-7">Size {data.Size}</div>
                                                <div className="col-md-5 off">{data.Discount}% off</div>
                                            </div>

                                            <div className="ind_image">
                                                <img src={/* data.image !== 'null'? data.image :*/ love} alt="" height="160" width="170" />
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
            var display = <div>
                <h2 className="head">Now showing Shorts</h2>
                <div className="row">
                    {
                        this.state.products.map((data, i) => {
                            var d = 0;
                            var f = 0;
                            return (
                                data.Category === 'Shorts' ?
                                    <div className="col-md-3 ren" key={i}>
                                        <div className="row">
                                            <div className="col-md-7">Size {data.Size}</div>
                                            <div className="col-md-5 off">{data.Discount}% off</div>
                                        </div>

                                        <div className="ind_image">
                                            <img src={/* data.image !== 'null'? data.image :*/ love} alt="" height="160" width="170" />
                                        </div>
                                        <div className="card-body">
                                            <b className="name"><center>{data.Name}</center></b>
                                            <p>Mrp <strike className="strike">${data.Mrp}</strike> Today ${data.Actualprice}</p><br />
                                            <div className="row">
                                            {
                                                    this.state.fav.map((data1, j) => {
                                                        console.log(data.ID, data1.ID)
                                                        if (data.ID === data1.ID) {
                                                            console.log("suc")
                                                            f = 1
                                                        }
                                                    })
                                                }

                                                {f === 1 ? <img src={love} className="love" alt="" height="25px" width="25px" /> : <img src={love1} onClick={(e => this.addfav(e, data.ID))} className="love" alt="" height="25px" width="25px" />}
                                                <div className="col-md-4"><button className="btn btn-primary">Buy</button></div>
                                                <div className="col-md-6">
                                                    {
                                                        this.state.cart.map((data1, j) => {
                                                            console.log(data.ID, data1.ID)
                                                            if (data.ID === data1.ID) {
                                                                console.log("suc")
                                                                d = 1
                                                            }
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
            var display = <div>
                <h2 className="head">Now showing Shorts</h2>
                <div className="row">
                    {
                        this.state.products.map((data, i) => {
                            return (
                                data.Category === 'Shorts' ?
                                    <div className="col-md-3 ren" key={i}>
                                        <div className="row">
                                            <div className="col-md-7">Size {data.Size}</div>
                                            <div className="col-md-5 off">{data.Discount}% off</div>
                                        </div>

                                        <div className="ind_image">
                                            <img src={/* data.image !== 'null'? data.image :*/ love} alt="" height="160" width="170" />
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
                                    console.log(value)
                                    this.state.decode.Account === 'Seller' ?
                                        data.Category === 'Shorts' && data.Sellerid === this.state.decode.Userid ? value = 1 : console.log("no") :
                                        data.Category === 'Shorts' ? value = 1 : console.log("no")
                                    return (console.log("done"))

                                })
                            }
                            {console.log(value)}
                            {value === 1 ? display : <h2 id="nodata">No Products Found</h2>}

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Shorts