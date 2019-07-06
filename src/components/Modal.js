import React, { Component } from 'react';
import './DisplayAll.css'
import { Button, ButtonGroup, ButtonToolbar, Nav, Navbar, Form, FormControl } from 'react-bootstrap';


class Modal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.setState({ products: localStorage.getItem("data") !== null ?  JSON.parse(localStorage.getItem("data")) : [] });
    }
    
    render() {
        return (
            <div className="container">
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <h1>Add new asds Product</h1>
                <Form className="newform">
      
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" id="category">
                      <option>Choose</option>
                      <option>Shirt</option>
                      <option>T-shirt</option>
                      <option>Pant</option>
                      <option>Shorts</option>
                    </Form.Control>
                  </Form.Group>
      
                  <Form.Group >
                    <Form.Label>Name of the dress</Form.Label>
                    <Form.Control type="text" placeholder="Name of the Dress" id="name" />
                  </Form.Group>
      
                  <Form.Group >
                    <Form.Label>Maximum Retail Price</Form.Label>
                    <Form.Control type="Number" id="mrp" placeholder="MRP" onChange={this.calculate} />
                  </Form.Group>
      
                  <Form.Group >
                    <Form.Label>Discount</Form.Label>
                    <Form.Control type="Nubmber" id="discount" placeholder="Discount in %" onChange={this.calculate} />
                  </Form.Group>
      
                  <Button variant="primary" className="btnn" onClick={this.add}>
                    Submit
                      </Button>
                  <Button variant="danger" className="btnn" onClick={this.hideForm}>
                    Cancel
                      </Button>
                </Form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    
          </div>
        )
    }
}

export default Modal