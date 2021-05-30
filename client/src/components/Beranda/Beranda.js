import React, {Component} from 'react';
import './style.css';
import {Link} from 'react-router-dom'
import {DataContext} from '../Context'


export class Beranda extends Component {
   static contextType = DataContext;

    render() {
        const {products,addCart} = this.context;
        return (
        <div className="container">
            <div className="Banner-area"></div>
                
        </div>
        )
    }
}

export default Beranda;