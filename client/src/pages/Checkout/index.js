import React, {useState, useEffect} from 'react'
import DetailPayment from './components/DetailPayment';
import ProductCards from './components/ProductCards';

const Checkout = () => {
    // const getTotal = () => {
    //     let result = 0;
    //     products.map((product) => {
    //         if (product.subtotal === 0) {
    //             result += product.price;
    //         } else {
    //             result += product.subtotal;
    //         }
    //     })   
    //     return result;
    // }  

    return (
        <div>
            <h1 style={{margin: '50px 0px 50px 0px'}}>Checkout</h1>
            <div style={styles.cardArea}>
                <div style={styles.cardProductArea}>
                    {/* <ProductCards products={products} handleChange={(newDataChild) => getNewData(newDataChild)} /> */}
                    <ProductCards />
                </div>
                <div style={styles.detailPaymentArea}>
                    {/* <DetailPayment total={() => getTotal()} /> */}
                    <DetailPayment />
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
