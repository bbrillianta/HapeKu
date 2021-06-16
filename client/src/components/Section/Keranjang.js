import React,{Component}  from 'react';
import {DataContext} from '../Context'
import {Link} from 'react-router-dom'
import './keranjang.css';
import empty from './empty.svg'

export class Keranjang extends Component {
  static contextType = DataContext;
  
   componentDidMount(){
        this.context.getTotal();
    }
    
  render() {
    const {cart,reduction,increase,removeProduct,total} = this.context;
     if(cart.length === 0){
            return (
                <div className="illustrasi">
                    <img src={empty} alt=" "/>
                    <p> Keranjang masih kosong..</p>
                    <Link to="/"><button> Ayo Belanja !🛒 </button> </Link>
                </div>

                );
        }else{
          return (
            <div className="Keranjang">
                    <div className="container">
                        {
                            cart.map(item =>(
                                <div className="detail" key="item._id">
                                    <img className="detail-img" src={item.src} alt=" "/>
                                    <div className="box">
                                        <div className="row">
                                        <h2> {item.title} </h2>
                                        <span>IDR {item.price * item.count}</span>
                                         <p>{item.description}</p>
                                        <div className="amount">
                                                <button className="count" onClick={() => reduction(item._id)}> - </button>
                                                <span>{item.count}</span>
                                                <button className="count" onClick={() => increase(item._id)}> + </button>
                                        </div>
                                        <div className="delete" onClick={() => removeProduct(item._id)}>X</div>
                                        </div>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                     <div className="total">
                                <Link to="/payment">Payment</Link>
                                <h3>Total: IDR {total}</h3>
                      </div>
            </div>
          );
        }
}
}
export default Keranjang;
