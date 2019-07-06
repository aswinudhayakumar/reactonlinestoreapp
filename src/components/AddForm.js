import React, { Component } from 'react';
import './AddForm.css';
import love from '../love.png'

class AddForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      show: 'null',
      img: 'null',
      actual_price: 0,
      products: []
    }

    this.displayForm = this.displayForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  print = event => {

    var fileName = document.getElementById("picture").value;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
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
  }

  add = () => {
    console.log('hello add');
    var category = document.getElementById('category').value;
    var mrp = document.getElementById('mrp').value;
    var name = document.getElementById('name').value;
    var discount = document.getElementById('discount').value;
    var ap = this.state.actual_price;
    var products = this.state.products;
    var image = this.state.img;

    if (category !== '' && mrp !== ''  && name !== '' && discount !== '' && ap !== '' && image !== 'null') {
      console.log('category, mrp' + category + mrp);
      var obj = {
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
    console.log("hi " + this.props.showorhide);
    return (
      <div className="addform">
        <h3 className="add">Add new Product</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-9">
                  <form>

                    <label htmlFor="">Product Category</label>
                    <select name="category" id="category" className="form-control">
                      <option value="null">-- choose --</option>
                      <option value="Shirt">Shirt</option>
                      <option value="T-shirt">T-shirt</option>
                      <option value="Pant">Pant</option>
                      <option value="Shorts">Shorts</option>
                    </select>
                    <label htmlFor="">Product Name</label>
                    <input type="text" id="name" className="form-control" placeholder="Name" required />
                    <label htmlFor="">MRP</label>
                    <input required type="text" id="mrp" onChange={this.calculate} className="form-control" placeholder="MRP" />
                    <label htmlFor="" >Discount</label>
                    <div className="row">
                      <div className="col-md-6">
                        <input required type="text" onChange={this.calculate} id="discount" className="form-control" placeholder="Discount" />
                      </div>
                      <div className="col-md-6">
                        <p id="ap">Actual Price <span className="price"> {this.state.actual_price} </span> </p>
                      </div>
                    </div>
                    <p htmlFor="" id="up">Upload product picture (size of 160 x 170 is recommended)</p>
                    <label for="picture" class="custom-file-upload">
                      Custom Upload
                    </label>
                    <input onChange={this.print} type="file" accept="image/x-png,image/gif,image/jpeg" id="picture" className="picture" />

                    <div className="btngrp">
                      <button className="btn btn-success sbtn" onClick={this.add}>Add product</button>
                    </div>

                  </form>
                </div>
                <div className="col-md-3">
                  <img src= { this.state.img !== 'null'? this.state.img : love } className="selectedimage" alt="upload_a_image_to_see_preview" height="160" width="170"/>
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