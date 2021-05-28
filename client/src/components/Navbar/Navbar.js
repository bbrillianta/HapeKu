import React,{Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
import logo from './Logo.png';
import {FontAwesomeIcons} from "@fortawesome/react-fontawesome";
import './Navbar.css';

export class Navbar extends Component{
	state = {
		toggle: false
	}

	menuToggle = () =>{
		this.setState({toggle: !this.state.toggle})
	}


	render(){
		return(
			<>
			<header>
				<div>
					<Link to={'/'}><img className="Logoo" src={logo} alt="logo"/></Link>
						<input type="text" placeholder="🔎 Cari Produk " className="Search-bar" label="Cari produk"/>
						<button className="button-cari"> cari </button>
				</div>
				<ul type="none">
			        <li><Link to={'/'}><span className="text-menu"> Beranda </span></Link></li>
			        <li><Link to={'/Tentang'}><span className="text-menu">Tentang</span></Link></li>
			        <li><Link to={'/Login'}><span className="text-menu login-square">Login</span></Link> </li>
					<li className="close" onClick={this.menuToggle}>x</li>		   	
			    </ul>
			    <div className="menu-square" onClick={this.menuToggle}>Menu </div>
		    </header>
		    </>
	    )
	}
};
                  
export default Navbar;