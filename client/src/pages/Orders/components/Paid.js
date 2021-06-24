import React, { useEffect, useState } from 'react'
import axios from "axios"

const Paid = () => {
    const [paidItems , setPaid] = useState([]);
    const [loading , setLoading] = useState(true);

    let idUser = JSON.parse(localStorage.getItem("idUser"))

    useEffect(() => {
        axios.get(`http://localhost:3001/user/payment/paid?userId=${idUser}`)
        .then(response => {
            setPaid(response.data);
            setLoading(false);
        })
    } , [])

    const convertToRupiah = (angka) => {
        let rupiah = '';		
        let angkarev = angka.toString().split('').reverse().join('');
        for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    }

    return (
        <div>
            {
                loading ? (
                    <span>Loading ... </span>
                ) : 
                (
                    paidItems.length === 0 ? (
                        <span>Belum ada pesanan yang sudah dibayar</span>
                    ) : (
                        paidItems.map((data) => {
                            let paidProducts = [...data.products];
                            let total = 0;
                            return (
                                <div style={styles.containerCard}>
                                    <div style={styles.title}>
                                        <h4>Transaksi : <span style={{color: 'palevioletred'}}>{data._id}</span></h4>
                                        <h5 style={{color: 'palevioletred'}}>
                                            {
                                                data.delivered === false ? (
                                                    <span>Barang belum dikirim</span>
                                                ) : (
                                                    <span>Barang proses pengiriman</span>
                                                )
                                            }
                                        </h5>
                                    </div>
    
                                    {
                                        paidProducts.map((product) => {
                                            total += product.product.price * product.quantity
                                            return (
                                                <div style={styles.cardProduct}>
                                                    <img style={{width: '100px' , height: '100px'}} src={`http://localhost:3001/${product.product.thumbnail.path}`} alt="" />
                                                    <div style={{textAlign: 'left', display: 'flex' , flexDirection: 'column' , height: '50px' , justifyContent: 'space-evenly'}}>
                                                        <h4> {product.product.name}</h4>
                                                        <h4 style={{color: 'salmon'}}> {convertToRupiah(product.product.price)} </h4>
                                                    </div>
                                                    <p>Quantity : {product.quantity}</p>
                                                    <h4> {convertToRupiah(product.product.price * product.quantity)}</h4>
                                                </div>
                                            )
                                        })
                                    }
                                    <div style={{display: 'flex' , justifyContent: 'space-between' , marginTop: '20px'}}>
                                        <div style={{display: 'flex'}}>
                                            <h4 style={{color: 'palevioletred'}}>Sudah dibayar</h4>
                                            {
                                                data.payment.verified 
                                                ?
                                                    <h4 style={{color: 'green', marginLeft: '10px'}}>(Sudah diverifikasi)</h4>
                                                : 
                                                    <h4 style={{color: 'red', marginLeft: '10px'}}>(Belum diverifikasi)</h4>
                                            }
                                        </div>
                                        <h4>Total : <span style={{color: 'palevioletred'}}>{convertToRupiah(total)}</span></h4>
                                    </div>
                                </div>                            
                            )
                        })
                    )
                )
            }
        </div>
    )
}

const styles = {
    containerCard : {
        boxShadow: '0px 0px 5px lightgray',
        padding: '20px',
        boxSizing: 'border-box',
        marginBottom: '20px',
    },
    cardProduct : {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        boxShadow: '0px 0px 5px lightgray',
        padding: '10px',
        marginTop: '10px',
        justifyContent: 'space-between'
    },
    title : {
        display: 'flex',
        justifyContent: 'space-between'
    }
}

export default Paid
