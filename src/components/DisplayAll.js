import React, { Component } from 'react';
import './DisplayAll.css'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import love from '../love.png'


class DisplayAll extends Component {

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
        const display = <div>
        <div className="DisplayAll container-fluid">
            <div className="row header">
                <div className="col-md-6"><h2 className="head">Now showing all products</h2><Link className="link splink" to="/add"><Button variant="success" data-toggle="modal" data-target="#exampleModal" className="addbtn sbtn" >Add New</Button></Link></div>
            </div>
            <div className="row">
                {
                    this.state.products.map((data, i) => {
                        return (
                            <div className="col-md-3 ren" key={i}>
                                <div className="row">
                                    <div className="col-md-6"><h5 className="card-title">{data.category}</h5></div>
                                    <div className="col-md-6"><p className="doff">{data.discount}% off</p></div>
                                </div>
                                    <div className="ind_image">
                                        <img src={ data.image !== 'null'? data.image : love } alt="" height="160" width="170"/>
                                    </div>
                                    <div className="card-body">
                                        <b className="name"><center>{data.name}</center></b>
                                        <p>Mrp <strike className="strike">${data.mrp}</strike> Today ${data.actual_price}</p>
                                    </div>
                            </div>
                        )
                    })
                }
            </div>
            </div>
        </div>
        return (
            <div>
                {this.state.products.length !== 0 ? display : <h1 id="nodata">No data Found</h1>}
            </div>

        )
    }
}

export default DisplayAll