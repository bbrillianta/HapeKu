import React,{Component}  from 'react';
import {DataContext} from '../Context'
import {Link} from 'react-router-dom'
import back from './backicon.png'
import './Detail.css';

export class Detail extends Component {
  static contextType = DataContext;
    state = {
        product: []
    }

    getProduct = () =>{
        if(this.props.match.params.id){
            const res = this.context.products;
            const data = res.filter(item =>{
                return item._id === this.props.match.params.id
            })
            this.setState({product: data})
        }
    };

    componentDidMount(){
        this.getProduct();
    }

    render() {
        const {product} = this.state;
        const {addCart} = this.context;
        return (
            <div>
            <Link to="/product"><img className="back-img" src={back} alt=""/></Link>
            <div className="container">
               {
                    product.map(item =>(
                        <div className="detail" key={item._id}>
                            <img className="detail-img" src={item.src} alt=" "/>
                            <div className="box">
                                <div className="row">
                                <h2> {item.title} </h2>
                                <span>IDR {item.price}</span>
                                 <p>{item.description}</p>
                                <Link to="/keranjang" ><button className="keranjang-btn" onClick={()=> addCart(product._id)}>+ Keranjang</button></Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            </div>
            
        )
    }
}

export default Detail;
