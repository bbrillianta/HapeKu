import React, { useEffect, useState } from 'react';
import './Navbar.css';
import Dropdown from './Dropdown';
import 'font-awesome/css/font-awesome.min.css';
import swal from "sweetalert2";

const Navbar = ({userCart}) => {
    const [dropdown, setDropdown] = useState(false);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem("idUser"));
        fetch(`http://localhost:3001/user/notifications?userId=${userId}`)
        .then(res => res.json())
        .then(data => setMenuItems(data));
    }, []);

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
        swal.fire({
            title: 'Are you sure?',
            text: "Yakin ingin logout ? ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes' 
        })
        .then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("isLogged");
                localStorage.removeItem("idUser");
                localStorage.removeItem("userName");
                localStorage.removeItem("admin")
                window.location.href = '/';
            }
        })
    }

    return (
        <>
        <nav className='navbarr'>
            <a 
                className='navbar-logo'
                href="/"
            >
            HapeKu
            </a>

            {
                localStorage.getItem("isLogged") === null ? (
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
                    localStorage.getItem("admin") === "true" ? (
                        <ul className='nav-menu'>
                            <li className='nav-item'>
                                <a
                                    className='nav-links'
                                    href="/adminpage"
                                >
                                    CRUD Product
                                </a>
                            </li>
                            
                            <li className='nav-item'>
                                <a
                                    className='nav-links'
                                    href="/verifikasi"
                                >
                                    Verifikasi
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className='nav-links highlight'
                                    onClick={logout}
                                >
                                    Logout
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
                                    className='nav-links notif'
                                >
                                    <i className="fa fa-bell-o"></i> &nbsp;
                                    <i className="fa fa-caret-down"></i>
                                    <div className="counter">{menuItems.length}</div>
                                </a>
                                {dropdown && <Dropdown menuItems={menuItems} />}
                            </li>

                            <li className='nav-item'>
                                <a
                                    className='nav-links cart'
                                    href="/cart"
                                >
                                    <i className="fa fa-cart-plus"></i>
                                    <div className="counter">{ userCart.length }</div>
                                </a>
                            </li>
                            
                            <li className='nav-item'>
                                <a
                                    className='nav-links'
                                    href="/orders"
                                >
                                    Pesanan
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
                )
            }
        </nav>
        </>
    );
}

export default Navbar;