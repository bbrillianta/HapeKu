import React , {useEffect, useState} from 'react'
import styled from "styled-components";
import {useHistory , useParams} from "react-router-dom";

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

    const history = useHistory();
    const [dataUser , setDataUser] = useState(null);
    const [loading , setLoading] = useState(true);

    useEffect(() => {
            setDataUser(JSON.parse(localStorage.getItem("dataUser")))
            setLoading(false);
    }, [])

    const logout = () => {
        localStorage.setItem("isLogged" , false);
        window.location.href = '/';
    }

    return (
        <div className="topnav" style={{overflow: 'hidden', backgroundColor: '#333'}}>
            <Container style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Anchor href="/" className="nav-brand"><h2>HapeKu</h2></Anchor>
                <div className="account">
                    {
                        localStorage.getItem("isLogged") === "true" && loading === false ? (
                            <div style={styles.account}>
                                <a href="/cart">
                                    <svg width="20" height="20" viewBox="0 0 451 451" fill="none" xmlns="http://www.w3.org/2000/svg" style={{cursor: 'pointer'}} >
                                        <g clip-path="url(#clip0)">
                                            <path d="M143.673 350.322C117.704 350.322 96.6528 371.374 96.6528 397.342C96.6528 423.311 117.705 444.362 143.673 444.362C169.642 444.362 190.693 423.31 190.693 397.342C190.694 371.374 169.642 350.322 143.673 350.322ZM143.673 423.465C129.246 423.465 117.551 411.77 117.551 397.343C117.551 382.916 129.246 371.221 143.673 371.221C158.1 371.221 169.795 382.916 169.795 397.343C169.796 411.77 158.1 423.465 143.673 423.465Z" fill="white"/>
                                            <path d="M342.204 350.322C316.235 350.322 295.184 371.374 295.184 397.342C295.184 423.311 316.236 444.362 342.204 444.362C368.172 444.362 389.224 423.31 389.224 397.342C389.224 371.374 368.173 350.322 342.204 350.322ZM342.204 423.465C327.777 423.465 316.082 411.77 316.082 397.343C316.082 382.916 327.777 371.221 342.204 371.221C356.631 371.221 368.326 382.916 368.326 397.343C368.327 411.77 356.631 423.465 342.204 423.465Z" fill="white"/>
                                            <path d="M448.261 76.0363C446.085 73.6593 443.108 72.1713 439.902 71.8563L99.788 67.1543L90.384 38.4193C83.759 19.2103 65.771 6.24234 45.453 6.02734H10.449C4.678 6.02734 0 10.7053 0 16.4763C0 22.2473 4.678 26.9253 10.449 26.9253H45.453C56.814 27.1763 66.818 34.4713 70.531 45.2113L136.882 245.309L131.658 257.325C125.831 272.351 127.581 289.263 136.36 302.778C145.055 316.052 159.683 324.244 175.544 324.721H378.777C384.548 324.721 389.226 320.043 389.226 314.272C389.226 308.501 384.548 303.823 378.777 303.823H175.543C166.586 303.599 158.341 298.887 153.6 291.284C148.912 283.774 147.949 274.522 150.988 266.206L155.168 256.802L375.119 233.814C399.279 231.153 419.153 213.581 424.752 189.928L449.83 84.9163C450.96 81.8923 450.36 78.4913 448.261 76.0363ZM404.376 185.227C400.984 200.453 388.057 211.684 372.507 212.917L155.168 235.382L106.58 88.0523L426.841 92.7543L404.376 185.227Z" fill="white"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="450.391" height="450.391" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>

                                <span onClick={logout} style={{color: '#fff', cursor: 'pointer'}}><h4>{dataUser.username}</h4></span>
                            </div>
                            
                        ) : (
                            <div>
                                <Anchor href="/login"><span>Login</span></Anchor>
                                <Anchor href="/register"><span>Register</span></Anchor>
                            </div>
                        )
                    }
                </div>
            </Container>
        </div>
    )
}

const styles = {
    account : {
        width: '150px',
        display: 'flex',
        justifyContent: 'space-evenly',
    }
}

export default Navbar
