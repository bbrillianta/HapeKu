import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Product , DetailProduct , Checkout} from "../../pages";

const Routes = () => {
    return (
        
        <Router>
            <Switch>
                <Route exact path="/products">
                    <Product />
                </Route>
                <Route exact path="/detail-product/:param">
                    <DetailProduct />
                </Route>
                <Route exact path="/checkout">
                    <Checkout />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes
