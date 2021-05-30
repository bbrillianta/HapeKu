import React from 'react'
import styled from 'styled-components'
import {Routes} from "./config";
// import {useHistory} from "react-router-dom";
// import {Navbar} from "./components";

const App = () => {
  const Container = styled.div`
    width: 80%;
    margin: auto;
    text-align: center;
    box-sizing: border-box;
  `;

  // const history = useHistory();

  return (
    <div>  
      {/* <Container> */}
        {/* <Navbar /> */}
        <div class="fixed-top">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <Container>
                <div class="container-fluid d-flex align-items-center justify-content-between">
                  <div class="app-link">
                    <a class="navbar-brand" href="#">HapeKu</a>
                  </div>
                  <div class="link-route">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                      <ul class="navbar-nav">
                          <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#">Home</a>
                          </li>
                          <li class="nav-item">
                              <a href="/products" class="nav-link">Products</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="/checkout">Checkout</a>
                          </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Container>
            </nav>
        </div>
        <Container>
          <Routes></Routes>
        </Container>
      {/* </Container> */}
    </div>
  )
}

export default App
