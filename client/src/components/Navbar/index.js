import React, { useEffect, useState } from 'react';
import './Navbar.css';
import Dropdown from './Dropdown';
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);

    const [data , setData] = useState([]);
    const [loading , setLoading] = useState(true);
    
    useEffect(() => {

    })

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
        setDropdown(false);
        } else {
        setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
        setDropdown(false);
        } else {
        setDropdown(false);
        }
    };

    const logout = () => {
        localStorage.setItem("isLogged" , false);
        localStorage.removeItem("idUser");
        localStorage.removeItem("userName");
        window.location.href = '/';
    }

    return (
        <>
        <nav className='navbar'>
            <a 
                className='navbar-logo'
                href="/"
            >
            HapeKu
            </a>

            {
                localStorage.getItem("isLogged") === "false" ? (
                    <ul className='nav-menu'>
                        <li className='nav-item'>
                            <a
                                className='nav-links'
                                href="/login"
                            >
                                Login
                            </a>
                        </li>
                        
                        <li className='nav-item'>
                            <a
                                className='nav-links highlight'
                                href="/register"
                            >
                                Register
                            </a>
                        </li>
                    </ul>
                ) : (
                    <ul className='nav-menu'>
                        <li
                            className='nav-item'
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                        >
                            <a
                                className='nav-links'
                            >
                                <i className="fa fa-bell-o"></i> &nbsp;
                                <i className="fa fa-caret-down"></i>
                            </a>
                            {dropdown && <Dropdown />}
                        </li>

                        <li className='nav-item'>
                            <a
                                className='nav-links'
                                href="/cart"
                            >
                                <i className="fa fa-cart-plus"></i>
                            </a>
                        </li>
                        
                        <li className='nav-item'>
                            <a
                                className='nav-links'
                                href="/orders"
                            >
                                Orders
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a
                                className='nav-links highlight'
                                onClick={logout}
                                style={{cursor: 'pointer'}}
                            >
                                {localStorage.getItem("userName")}
                            </a>
                        </li>
                    </ul>
                )
            }
        </nav>
        </>
    );
}

export default Navbar;