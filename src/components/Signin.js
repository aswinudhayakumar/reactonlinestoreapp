import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Signin.css'
import GoogleLogin from 'react-google-login';
import axios from 'axios';

class Signin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            invalid: false,
            error: {
                email: '',
                password: '',
            }
        }
    }

    formHandler = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        })

    }

    signin = () => {
        var error = this.state.error;
        if (this.state.email !== null && this.state.password !== null) {
            var link = "http://localhost:8123/signin/" + this.state.email + "/" + this.state.password
            console.log(link)
            axios.post(link).then(res => {
                console.log(res.data)
                if (res.data !== null) {
                    localStorage.setItem("webtoken", res.data)
                    this.setState({
                        invalid: false
                    })
                    window.location.replace("http://localhost:3000")
                }
                else {
                    this.setState({
                        invalid: true
                    })
                }
            }
            )
        }

        if (this.state.email === null) {
            error.email = true
            this.setState({
                error
            })
        }
        if (this.state.password === null) {
            error.password = true
            this.setState({
                error
            })
        }

    }

    signinwithgoogle = (response) => {
        if (!response.error) {

            if (response.w3.U3 !== null && response.w3.Eea != null) {
                var obj = {
                    Name: '',
                    Email: response.w3.U3,
                    Accounttype: '',
                    Password: '',
                    Gid: response.w3.Eea
                }
                var link = "http://localhost:8123/signinwithgoogle"
                axios.post(link, obj).then(res => {
                    console.log(res.data)
                    if (res.data !== null) {
                        localStorage.setItem("webtoken", res.data)
                        this.setState({
                            invalid: false
                        })
                        window.location.replace("http://localhost:3000")
                    }
                    else {
                        this.setState({
                            invalid: true
                        })
                    }
                }
                )

            }

        }
    }


    render() {
        if (localStorage.getItem("webtoken") !== null) {
            return (
                <Redirect path="/" />
            )
        }

        const responseGoogle = (response) => {
            this.signinwithgoogle(response)
        }

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">

                        </div>
                        <div className="col-md-6 content">
                            <center><h3>Signin to Online Store</h3></center>
                            <div>
                                <label htmlFor="">Email</label>
                                <input type="email" name="email" className="form-control" placeholder="Enter your Email" onChange={this.formHandler.bind(this)} value={this.state.email} required />
                                <label htmlFor="">Password</label>
                                <input type="password" name="password" className="form-control" placeholder="Enter your Password" onChange={this.formHandler.bind(this)} value={this.state.password} required />
                                {this.state.invalid === true ? <p className="error">Wrong Email ID and password</p> : ''}
                                <div className="row">
                                    <div className="col-md-2">
                                        <button className="btn btn-success signinbtn" onClick={this.signin.bind(this)}>Signin</button><br /><br />
                                    </div>
                                    <div className="col-md-4">
                                        <GoogleLogin
                                            clientId="285651157927-tbqg4amqsci3g6semte4vhkhh938ekld.apps.googleusercontent.com"
                                            buttonText="Signin"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                            className="gsign"
                                        />
                                    </div>
                                </div>


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
