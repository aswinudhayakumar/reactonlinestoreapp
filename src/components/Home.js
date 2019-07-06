import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import DisplayAll from '../components/DisplayAll';
import Shirts from '../components/Shirts'
import Tshirts from '../components/Tshirts'
import Pants from '../components/Pants'
import Shorts from '../components/Shorts'
import AddForm from '../components/AddForm';
import Navigation from '../components/Navigation'
import Carousal from '../components/Carousal'
import '../components/Sidenav.css'
import Sidenav from './Sidenav';

class Home extends Component {
    render() {
        return (
            <div>
            <Navigation />
            <Carousal />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Sidenav/>
                    </div>
                    <div className="col-md-8 new">
                        <Route exact path="/" component={DisplayAll} />
                        <Route path="/shirts" component={Shirts} />
                        <Route path="/tshirts" component={Tshirts} />
                        <Route path="/pants" component={Pants} />
                        <Route path="/shorts" component={Shorts} />
                        <Route path="/add" component={AddForm} />
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Home