import React, {Component} from 'react';
import '../Beranda/style.css';
import {Link} from 'react-router-dom'
import {DataContext} from '../Context'


export class Produk extends Component {
   static contextType = DataContext;

    render() {
        const {products,addCart} = this.context;
        return (
        <div className="container">
            <div className="Banner-area"></div>
                <div className="Content-area">
                <div id="product" className="wrapper">
                 {
                     products.map(product =>(
                       <div className="card" key={product._id}>
                          <Link to={`/product/${product._id}`}>
                               <img className="card-img" src={product.src} alt=""/>
                           </Link>
                           <div className="content">
                               <h3>
                                   <Link className="card_title" to={`/product/${product._id}`}>{product.title}</Link>
                               </h3>
                               <span className="card_desc">IDR {product.price}</span>
                                <p className="card_desc" >{product.description}</p>
                                <button className="card_btn alert" onClick={()=> addCart(product._id)}>+ Keranjang</button>
                                <button className="card_btn ordinary">Lihat Detail</button>
                           </div>
                       </div>
                   ))
                 }
                </div>
                </div>
        </div>
        )
    }
}

export default Produk;