import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Footer from '../components/Footer'
import DisplayAll from '../components/DisplayAll';
import Shirts from '../components/Shirts'
import Tshirts from '../components/Tshirts'
import Pants from '../components/Pants'
import Shorts from '../components/Shorts'
import AddForm from '../components/AddForm';
import Navigation from '../components/Navigation'
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import Cart from '../components/Cart';
import Fav from '../components/Fav';
import Profile from '../components/profile';
import Admin from '../components/Admin';

class AppRouter extends Component {
    render() {
        return (
            <Router>
            <Navigation/>
                <Switch>
                        <Route exact path="/" component={DisplayAll} />
                        <Route  path="/shirts" component={Shirts} />
                        <Route  path="/tshirts" component={Tshirts} />
                        <Route  path="/pants" component={Pants} />
                        <Route  path="/shorts" component={Shorts} />
                        <Route  path="/add" component={AddForm} />
                        <Route  path="/signin" component={Signin} />
                        <Route  path="/signup" component={Signup} />
                        <Route  path="/cart" component={Cart} />
                        <Route  path="/fav" component={Fav} />
                        <Route  path="/profile" component={Profile} />
                        <Route  path="/Admin" component={Admin} />
                </Switch>
            <Footer/>
            </Router>
        )
    }
}

export default AppRouter