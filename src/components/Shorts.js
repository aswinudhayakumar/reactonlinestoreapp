import React, { Component } from 'react';
import './DisplayAll.css'
import './Shorts.css'
import love from '../love.png'
import Sidenav from '../components/Sidenav'
import Carousal from '../components/Carousal'
import axios from 'axios';

class Shorts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        var link1 = "http://localhost:8123/products"
        axios.get(link1).then(res => {
            this.setState({ products: res.data !== null ? res.data : [] });
            console.log(this.state.products)
        })
    }



    render() {
        var value = 0;
        const display = <div>
            <h2 className="head">Now showing Shorts</h2>
            <div className="row">
                {
                    this.state.products.map((data, i) => {
                        return (
                            data.Category === 'Shorts' ?
                                <div className="col-md-3 ren" key={i}>
                                    <div className="row">
                                        <div className="col-md-7"></div>
                                        <div className="col-md-5 off">{data.Discount}% off</div>
                                    </div>

                                    <div className="ind_image">
                                        <img src={/*data.image !== 'null' ? data.image :*/ love} alt="" height="160" width="170" />
                                    </div>
                                    <div className="card-body">
                                        <b className="name"><center>{data.Name}</center></b>
                                        <p>Mrp <strike className="strike">${data.Mrp}</strike> Today ${data.Actualprice}</p>
                                    </div>
                                </div>
                                : console.log('no data')


                        )
                    })
                }
            </div>
        </div>
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