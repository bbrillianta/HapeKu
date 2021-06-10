import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Home , Product , DetailProduct , Checkout , Login , Register} from "../../pages";
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
                <Route exact path="/checkout">
                    <Container>
                        <Checkout />
                    </Container>
                </Route>
                <Route exact path="/login">
                    <Container>
                        <Login />
                    </Container>
                </Route>
                <Route exact path="/register">
                    <Container>
                        <Register />
                    </Container>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes
