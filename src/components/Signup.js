import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Signup.css'
import axios from 'axios';
import GoogleLogin from 'react-google-login';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            uname: '',
            email: '',
            password: '',
            cpassword: '',
            gid: '',
            error: {
                account: false,
                uname: false,
                email: false,
                password: false,
            }
        }
    }

    signup = () => {

        var pas = this.state.password;
        var e = this.state.email;
        var leng = pas.length;
        var error = this.state.error;
        if (leng < 8 || (this.state.password !== this.state.cpassword)) {
            error.password = true
            this.setState({
                error
            })
            console.log(this.state)
        }
        else {
            error.password = false
            this.setState({
                error
            })
        }
        var email = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
        if (!email.test(e)) {
            error.email = true
            this.setState({
                error
            })
            console.log(this.state)
        }
        else {
            error.email = false
            this.setState({
                error
            })
        }

        if (this.state.uname !== '' && this.state.email !== '' && this.state.account !== '' && this.state.password !== '' && this.state.error.password === false && this.state.error.email === false) {

            var obj = {
                Name: this.state.uname,
                Email: this.state.email,
                Accounttype: this.state.account,
                Password: this.state.password,
                Gid: this.state.gid
            }

            // var link = "http://localhost:8123/user/"+this.state.uname+"/"+this.state.email+"/"+this.state.account+"/"+this.state.password
            var link = "http://localhost:8123/user"
            axios.post(link, obj).then(res => {
                if(res.data === ""){
                    alert("Account already found")
                }
                else{
                    alert("New user created")
                }
            })

            this.setState({
                account: '',
                uname: '',
                email: '',
                password: '',
                cpassword: '',
                error: {
                    account: false,
                    uname: false,
                    email: false,
                    password: false,
                }
            })

        }
    }

    formHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidUpdate() {
        console.log(this.state)
    }


    render() {
        if (localStorage.getItem("webtoken") !== null) {
            return (
                <Redirect path="/" />
            )
        }

        const responseGoogle = (response) => {
            console.log(response);
            if (!response.error) {
                this.setState({
                    uname: response.w3.ig,
                    email: response.w3.U3,
                    gid: response.w3.Eea
                })
            }
        }

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6 signup-content">
                            <center><h3>Signup to Online Store</h3></center>
                            <div className="notice">
                                <label htmlFor="" > Account type</label>
                                <div className="row rad">
                                    <div className="col-md-4">
                                        <label htmlFor="sel">Seller</label><input id="sel" onChange={this.formHandler.bind(this)} name="account" className="form-control" type="radio" value="Seller" />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="buy">Buyer</label> <input id="buy" onChange={this.formHandler.bind(this)} name="account" className="form-control" type="radio" value="Buyer" />
                                    </div>
                                </div>
                                <label htmlFor="">Name</label>
                                <input type="text" className="form-control" name="uname" placeholder="Enter Your Name" onChange={this.formHandler.bind(this)} value={this.state.uname} />
                                <label htmlFor="">Email</label>
                                <input type="email" className="form-control" name="email" placeholder="Enter Your Email ID" onChange={this.formHandler.bind(this)} value={this.state.email} />
                                {this.state.error.email === true ? <p className="error">Enter valid email id</p> : console.log()}
                                <label htmlFor="">Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Enter Your Password" onChange={this.formHandler.bind(this)} value={this.state.password} />
                                <label htmlFor="">Confirm Password</label>
                                <input type="password" className="form-control" name="cpassword" placeholder="Re Enter Your Password" onChange={this.formHandler.bind(this)} value={this.state.cpassword} />
                                {this.state.error.password === true ? <p className="error">Password length should be greater than 8 and password and conform password should match</p> : console.log()}
                                <div className="row">
                                    <div className="col-md-2"><button className="btn btn-success signupbtn" onClick={this.signup.bind(this)}>Signup</button></div>
                                    <div className="col-md-4">
                                        <GoogleLogin
                                            clientId="285651157927-tbqg4amqsci3g6semte4vhkhh938ekld.apps.googleusercontent.com"
                                            buttonText="Signup"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                            className="gsign"
                                        />
                                    </div>
                                </div>
                                <br />
                                <Link className="link" to="/signin">Already have an account? signin here.</Link>
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup