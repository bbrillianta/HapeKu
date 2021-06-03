import React, {useState, useEffect} from 'react'
import DetailPayment from './components/DetailPayment';
import ProductCards from './components/ProductCards';

const Checkout = () => {

    const [products , setProducts] = useState([
        {
            "_id":"1",
            "title":"Iphone X",
            "src" : "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/MTA-2601902/apple_apple-iphone-xr-128-gb-smartphone-_full30.jpg",
            "description": "Good Iphone",
            "price" : 100000,
            "count":1,
            "subtotal":0
        },
        {
            "_id":"2",
            "title":"Iphone 10",
            "src" : "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/MTA-2601902/apple_apple-iphone-xr-128-gb-smartphone-_full30.jpg",
            "description": "Good Iphone",
            "price" : 70000,
            "count":1,
            "subtotal":0
        },
        {
            "_id":"3",
            "title":"Iphone XE",
            "src" : "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/MTA-2601902/apple_apple-iphone-xr-128-gb-smartphone-_full30.jpg",
            "description": "Good Iphone",
            "price" : 10000,
            "count":1,
            "subtotal":0
        }
    ])

    const getNewData = (newData) => {
        setProducts(newData);
    }

    const getTotal = () => {
        let result = 0;
        products.map((product) => {
            if (product.subtotal === 0) {
                result += product.price;
            } else {
                result += product.subtotal;
            }
        })   
        return result;
    }  

    return (
        <div>
            <h1 style={{margin: '50px 0px 50px 0px'}}>Checkout</h1>
            <div style={styles.cardArea}>
                <div style={styles.cardProductArea}>
                    <ProductCards products={products} handleChange={(newDataChild) => getNewData(newDataChild)} />
                </div>
                <div style={styles.detailPaymentArea}>
                    <DetailPayment total={() => getTotal()} />
                </div>
            </div>
        </div>
    )

}

const styles = {
    cardArea: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardProductArea: {
        width: '55%',
        maxHeight: '70vh',
        padding: '0px 20px',
        boxSizing: 'border-box',
        overflow: 'auto',
    },
    detailPaymentArea: {
        width: '35%',
        maxHeight: '70vh',
    },
}


export default Checkout
