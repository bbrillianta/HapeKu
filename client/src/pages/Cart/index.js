import React, {useState, useEffect} from 'react'
import DetailPayment from './components/DetailPayment';
import CartItems from './components/CartItems';
import axios from 'axios';

const Cart = () => {
    const [total , setTotal] = useState(null);
    const [gantiTotal , setGantiTotal] = useState(true)
    
    let idUser = JSON.parse(localStorage.getItem("idUser"))

    // perhitungan total pembelian
    useEffect(() => {
        axios.get(`http://localhost:3001/user/cart?userId=${idUser}`)
        .then((response) => {
            let total = 0;
            response.data.map((item) => {
                total += item.quantity * item.product.price
            })
            setTotal(total);
        })
    } , [gantiTotal])

    return (
        <div>
            <h1 style={{margin: '30px 0px 30px 0px'}}>Cart</h1>
            <div style={styles.cardArea}>
                <div style={styles.cardProductArea}>
                    <CartItems changeTotal={gantiTotal} setChangeTotal={setGantiTotal}/>
                </div>
                <div style={styles.detailPaymentArea}>
                    <DetailPayment total={total}/>
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


export default Cart
