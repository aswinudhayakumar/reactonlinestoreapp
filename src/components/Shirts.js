import React, { Component } from 'react';
import './DisplayAll.css'
import './Shirts.css'
import love from '../love.png'

class Shirts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.setState({ products: localStorage.getItem("data") !== null ? JSON.parse(localStorage.getItem("data")) : [] });
    }

    render() {
        var value = 0;
        const display = <div>
            <h2 className="head">Now showing Shirts</h2>
            <div className="row">

                {
                    this.state.products.map((data, i) => {
                        return (
                            data.category === 'Shirt' ?
                                <div className="col-md-3 ren" key={i}>
                                    <div className="row">
                                        <div className="col-md-7"></div>
                                        <div className="col-md-5 off">{data.discount}% off</div>
                                    </div>

                                        <div className="ind_image">
                                            <img src={ data.image !== 'null'? data.image : love } alt="" height="160" width="170"/>
                                        </div>
                                        <div className="card-body">
                                            <b className="name"><center>{data.name}</center></b>
                                            <p>Mrp <strike className="strike">${data.mrp}</strike> Today ${data.actual_price}</p>
                                        </div>
                                    </div>
                                    : console.log('no data')
    
    
                            )
                        })
                    }
            </div>
        </div>
        
                return (
            <div className="DisplayAll">

                    {
                        this.state.products.map((data) => {
                            data.category === 'Shirt' ? value = 1 : console.log('no')
                            return (console.log("done"))
                        })
                    }
                    {value === 1 ? display : <h2 id="nodata">No Products Found</h2>}

                </div>

                )
            }
        }
        
export default Shirts