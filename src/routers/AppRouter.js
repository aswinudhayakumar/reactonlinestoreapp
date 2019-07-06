import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Footer from '../components/Footer'
import Home from '../components/Home'

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <Home/>
                <Footer/>
            </Router>
        )
    }
}

export default AppRouter