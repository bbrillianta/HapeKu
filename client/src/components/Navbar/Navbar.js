import React,{Component, useState} from 'react';
import {NavLink, Link} from 'react-router-dom';
import logo from './Logo.png';
import './Navbar.css';
import keranjang from './Keranjang.svg';
import search from './search-solid.svg';
import profil from './user-circle-solid.svg';
import {DataContext} from '../Context';

export class Navbar extends Component{
	static contextType = DataContext;
	render(){
		const {cart} = this.context;
		return(
			<>
			<header>
				<div className="nav-logo">
					<Link to={'/'}><img className="Logoo" src={logo} alt="logo"/></Link>
						
				</div>
				<div className="nav-search">
					<input type="text" placeholder="Cari Produk " className="Search-bar" label="Cari produk"/>
					<button className="button-cari"> <img src={search} alt=" "/> </button>
				</div>
				
				<ul type="none">
			        <li><Link to={'/'}><span className="text-menu"> Beranda </span></Link></li>
			         <li><Link to={'/product'}><span className="text-menu"> produk </span></Link></li>
			        <li><Link to={'/Login'}><span className="text-menu login-square">Login</span></Link> </li>
			        <li><Link to={'/Register'}><span className="text-menu">Register</span></Link> </li>
			  
			    </ul>
			    <Link to={'/Keranjang'}>
			    	<div className="nav-keranjang">
			        	<span className="number">{cart.length}</span>
			        	<img src={keranjang} className="keranjang_1" alt="keranjang"/>
			        </div>
			    </Link>
			        <img src={profil} className="profil_1" alt="profil"/>
		    </header>
		    </>
	    )
	}
};
                  
export default Navbar;