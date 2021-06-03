import React from 'react'
import styled from "styled-components";

const Navbar = () => {
    const Container = styled.div`
        width: 80%;
        margin: auto;
        text-align: center;
        box-sizing: border-box;
    `;

    const Anchor = styled.a`
        float: left;
        color: #f2f2f2;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 14px;
    `

    return (
        <div class="topnav" style={{overflow: 'hidden', backgroundColor: '#333'}}>
            <Container style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Anchor href="/" class="nav-brand"><h2>HapeKu</h2></Anchor>
                <div class="account">
                    <Anchor href="/login"><span>Login</span></Anchor>
                    <Anchor href="/register"><span>Register</span></Anchor>
                </div>
            </Container>
        </div>
    )
}

export default Navbar
