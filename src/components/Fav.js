import React, { Component } from 'react';
import Sidenav from '../components/Sidenav';
import {  Redirect } from 'react-router-dom'
import './Cart.css'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import love from '../love.png'
import fav from '../love.png'

class Fav extends Component {

    constructor(props){
        super(props);
        this.state = {
            total : 0,
            decode : '',
            cart : [],
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
        axios.post(link).then(res => {
            this.setState({ products: res.data !== null ? res.data : [] });
            
        })
    }

    link = "http://localhost:8123/getcart/" + this.state.decode.Userid
    axios.post(link).then(res => {
        this.setState({ cart: res.data !== null ? res.data : [] });

    })

    }

    delfav = (e, a) => {
        var link1 = "http://localhost:8123/delfav/" + this.state.decode.Userid + "/" + a
        axios.post(link1).then(res => {
            console.log("successfully deleted")
        })

        if(localStorage.getItem("webtoken") !== null){
            var link = "http://localhost:8123/getfav/"+this.state.decode.Userid
            axios.post(link).then(res => {
                this.setState({ products: res.data !== null ? res.data : [] });
                
            })
        }

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
                                var link = "http://localhost:8123/temp-images/" +data.Image
                                var d = 0
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
                                                    <div className="col-md-5"><button onClick={(e => this.delfav(e, data.ID))} className="btn btn-danger">Remove</button></div>
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
  
        return (
            <div className="cart-top">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidenav />
                        </div>
                        <div className="col-md-8">
                            <div className="cart">
                            <h3><img src={fav}  height="120px" width="120px" alt=""/> {this.state.decode.Name}'s Favourites</h3><br/>
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