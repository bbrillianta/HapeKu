import React, {useState, useEffect} from 'react'
import DetailPayment from './components/DetailPayment';
import CartItems from './components/CartItems';

const Cart = () => {
    const [total , setTotal] = useState(null);
    const [gantiTotal , setGantiTotal] = useState(true)

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("dataUser"));
        
        if (user.cartItems.length !== 0) {
            let total = 0;
            user.cartItems.map((item) => {
                total += item.quantity * item.product.price
            })
            setTotal(total);
        } else {
            setTotal(0)
        }
    } , [gantiTotal])

    return (
        <div>
            <h1 style={{margin: '50px 0px 50px 0px'}}>Cart</h1>
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
