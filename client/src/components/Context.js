import hp from './hp.jpg';
import React, { Component } from 'react'

export const DataContext = React.createContext();

export class DataProvider extends Component {
    state={
      products: [
        {
          "_id":"1",
          "title":"Iphone X",
          "src" : "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/MTA-2601902/apple_apple-iphone-xr-128-gb-smartphone-_full30.jpg",
          "description": "Good Iphone",
          "price" : 100000,
          "count":1
        },
         {
          "_id":"2",
          "title":"Iphone 10",
          "src" : "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/MTA-2601902/apple_apple-iphone-xr-128-gb-smartphone-_full30.jpg",
          "description": "Good Iphone",
          "price" : 70000,
          "count":1
        },
        {
          "_id":"3",
          "title":"Iphone XE",
          "src" : "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/MTA-2601902/apple_apple-iphone-xr-128-gb-smartphone-_full30.jpg",
          "description": "Good Iphone",
          "price" : 10000,
          "count":1
        }
      ],
      cart: [],
      total: 0
    };


    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item._id !== id
        })
        if(check){
            const data = products.filter(product =>{
                return product._id === id
            })
            this.setState({cart: [...cart,...data]})
        }else{
            alert("The product has been added to cart.")
        }
    };

    reduction = (id) =>{
       const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    increase = (id) =>{
       const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };


     removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            const {cart} = this.state;
            cart.forEach((item, index) =>{
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        }
       
    };

     getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        this.setState({total: res})
    };

   render() {

        const {products,cart,total} = this.state;
        const {addCart,reduction,increase, removeProduct,getTotal} = this;

        return (
            <DataContext.Provider value={{products,addCart,cart,reduction,increase,removeProduct,total,getTotal}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}