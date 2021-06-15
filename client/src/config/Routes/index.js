import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Register , AdminPage , Home , Product , DetailProduct , Cart, Login , Verifikasi , Checkout} from "../../pages";
import styled from "styled-components";

const Routes = () => {
    const Container = styled.div`
        width: 80%;
        margin: auto;
        text-align: center;
        box-sizing: border-box;
    `;

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/products">
                    <Container>
                        <Product />
                    </Container>
                </Route>
                <Route exact path="/detail-product/:param">
                    <Container>
                        <DetailProduct />
                    </Container>
                </Route>
                <Route exact path="/cart">
                    <Container>
                        <Cart />
                    </Container>
                </Route>
                <Route exact path="/adminpage">
                    <AdminPage />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/verifikasi">
                    <Verifikasi />
                </Route>
                <Route exact path="/checkout">
                    <Container>
                        <Checkout />
                    </Container>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes
