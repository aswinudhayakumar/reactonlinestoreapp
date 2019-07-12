import React, { Component } from 'react';
import {  Redirect } from 'react-router-dom'
import './AddForm.css';
import love from '../love.png'
import Sidenav from '../components/Sidenav'
import Carousal from '../components/Carousal'
import axios from 'axios';
import jwt_decode from 'jwt-decode'

class AddForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      show: 'null',
      img: 'null',
      actual_price: 0,
      category: 'Shirt',
      pname: '',
      mrp: '',
      size: '',
      discount: '',
      decode : '',
      isauth : null,
      products: [],
      error: {
        size: '',
        mrp: '',
        discount: '',
        image: '',
      }
    }

    this.displayForm = this.displayForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  formHandler = (event) => {

    this.setState({
      [event.target.name]: event.target.value
    })

    if(event.target.name === 'mrp' || event.target.name === 'discount'){
      this.calculate();
    }
  }

  print = event => {

    var fileName = document.getElementById("picture").value;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
      var z;

      const file = event.target.files[0];
      getBase64(file).then(base64 => {
        z = base64;
        console.debug("file stored", z);
        this.setState({
          img: z
        })
      })
    } else {
      alert("Only jpg/jpeg and png files are allowed!");
    }
  }

  componentDidMount() {
    this.setState({ products: localStorage.getItem("data") !== null ? JSON.parse(localStorage.getItem("data")) : [] });

    var jwt = localStorage.getItem("webtoken");
    if (jwt !== null){
      var decoded = jwt_decode(jwt)
      this.setState({
          decode : decoded,
          isauth : decoded.Account
      })
    }
    else{
      this.setState({
        decode : null,
    })
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

  add = () => {

    console.log('hello add');
    var category = this.state.category;
    var mrp = this.state.mrp;
    var name = this.state.pname;
    var discount = this.state.discount;
    var ap = this.state.actual_price;
    /*var products = this.state.products;*/
    var image = this.state.img;

    if (category !== '' && mrp !== '' && name !== '' && discount !== '' && ap !== '' && image !== 'null') {
      

      var link = "http://localhost:8123/addproduct/"+this.state.category+"/"+this.state.pname+"/"+this.state.mrp+"/"+this.state.size+"/"+this.state.discount+"/"+this.state.actual_price+"/"+this.state.decode.Userid
      console.log(link)
      axios.post(link).then(res => {
          alert("Product added successfully")
          console.log(res)
      })

      /*var obj = {
        category: category,
        mrp: mrp,
        name: name,
        discount: discount,
        actual_price: ap,
        image: image
      }
      products.push(obj);
      this.setState({
        products,
        show: 'null'
      })
      var jsonData = JSON.stringify(this.state.products);
      localStorage.setItem("data", jsonData);
      console.log("final" + this.state.products);
      */
    }
    else {
      alert("Fill out all fields and upload only images");
      console.log('null values');
    }
  }


  displayForm() {
    this.setState({
      show: 'form'
    })
    console.log(this.state.show);
  }

  hideForm() {
    this.setState({
      show: 'null'
    })
    console.log(this.state.show);
  }

  calculate() {
    const mrp = document.getElementById('mrp').value;
    const discount = document.getElementById('discount').value;
    var ap = mrp;
    if (discount >= 0 && discount < 100) {
      ap = mrp - (mrp * (discount / 100));
    }
    else {
      alert("Discount value ranges from 0 to 99 only");
    }

    this.setState({
      actual_price: ap
    })

  }


  render() {
    if(localStorage.getItem("webtoken") === null || this.state.decode.Account !== 'Seller'){
      return( 
              <Redirect path="/" />         
      )
    }
    console.log("hi " + this.state.decode.Account);
    return (
      <div>
        <Carousal />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <Sidenav />
            </div>
            <div className="col-md-8 new">
              <div className="addform">
                <h3 className="add">Add new Product</h3>
                <div className="container">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-md-9">
                          <div>

                            <label htmlFor="">Product Category</label>
                            <select name="category" id="category" onChange={this.formHandler.bind(this)} value={this.state.category} className="form-control">
                              <option value="Shirt">Shirt</option>
                              <option value="T-shirt">T-shirt</option>
                              <option value="Pant">Pant</option>
                              <option value="Shorts">Shorts</option>
                            </select>
                            <label htmlFor="">Product Name</label>
                            <input type="text" id="name" name="pname" className="form-control" onChange={this.formHandler.bind(this)} value={this.state.pname} placeholder="Name" required />
                            <div className="row">
                              <div className="col-md-6">
                                <label htmlFor="">Size</label>
                                <input required type="text" name="size" className="form-control" onChange={this.formHandler.bind(this)} value={this.state.size} placeholder="Size" />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="">MRP</label>
                                <input required type="text" id="mrp" name="mrp" className="form-control" onChange={this.formHandler.bind(this)} value={this.state.mrp} placeholder="MRP" />
                              </div>
                            </div>
                            <label htmlFor="" >Discount</label>
                            <div className="row">
                              <div className="col-md-6">
                                <input required name="discount" type="text" id="discount" className="form-control" onChange={this.formHandler.bind(this)} value={this.state.discount} placeholder="Discount" />
                              </div>
                              <div className="col-md-6">
                                <p id="ap">Actual Price <span className="price"> {this.state.actual_price} </span> </p>
                              </div>
                            </div>
                            <p htmlFor="" id="up">Upload product picture (size of 160 x 170 is recommended)</p>
                            <label htmlFor="picture" className="custom-file-upload">
                              Custom Upload
                    </label>
                            <input onChange={this.print} type="file" accept="image/x-png,image/gif,image/jpeg" id="picture" className="picture" />

                            <div className="btngrp">
                              <button className="btn btn-success sbtn" onClick={this.add}>Add product</button>
                            </div>

                          </div>
                        </div>
                        <div className="col-md-3">
                          <img src={this.state.img !== 'null' ? this.state.img : love} className="selectedimage" alt="upload_a_image_to_see_preview" height="160" width="170" />
                        </div>
                      </div>



                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


}

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

export default AddForm