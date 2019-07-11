import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Signin.css'
import axios from 'axios';

class Signin extends Component {

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            error : {
                email :'',
                password:'',
            }
        }
    }

    formHandler = (event) => {

        this.setState({
          [event.target.name]: event.target.value
        })

    }

    signin = () =>{
        var link = "http://localhost:8123/signin/"+this.state.email+"/"+this.state.password
        console.log(link)
        axios.post(link).then(res => {
            localStorage.setItem("webtoken", res.data)
            window.location.replace("http://localhost:3000")
        }
        )
    }

  

    render() {
        if(localStorage.getItem("webtoken") !== null){
            return( 
                    <Redirect path="/" />         
            )
        }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6 content">
                            <center><h3>Signin to Online Store</h3></center>
                            <div>
                                <label htmlFor="">Email</label>
                                <input type="email" name="email" className="form-control" placeholder="Enter your Email" onChange={this.formHandler.bind(this)} value={this.state.email} required/>
                                <label htmlFor="">Password</label>
                                <input type="password" name="password" className="form-control" placeholder="Enter your Password" onChange={this.formHandler.bind(this)} value={this.state.password} required/>
                                <button className="btn btn-success signinbtn" onClick={this.signin.bind(this)}>Signin</button><br/><br/>
                                <Link className="link" to="/signup">New User? Create new account here.</Link>
                                
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin
