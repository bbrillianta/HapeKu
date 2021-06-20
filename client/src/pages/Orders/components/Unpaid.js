import React, { useEffect, useState } from 'react'
import axios from "axios"
import styled from 'styled-components';

const Unpaid = () => {
    const Button = styled.button`
        background: palevioletred;
        color: #fff;
        font-size: 1em;
        padding: 0.25em 1em;
        border-radius: 3px;
        cursor: pointer;
        text-align: right;
        border: none;
        @media (max-width: 700px) {
            margin: .5rem 0 .5rem 0;
        }
    `;

    const [unpaidItems , setUnpaid] = useState([]);
    const [loading , setLoading] = useState(true);
    const [fotoBukti , setFotoBukti] = useState(null);

    let idUser = JSON.parse(localStorage.getItem("idUser"))

    useEffect(() => {
        axios.get(`http://localhost:3001/user/payment/unpaid?userId=${idUser}`)
        .then(response => {
            setUnpaid(response.data);
            setLoading(false);
        })
    } , [])

    const convertToRupiah = (angka) => {
        let rupiah = '';		
        let angkarev = angka.toString().split('').reverse().join('');
        for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    }

    const payOrder = (e) => {
        e.preventDefault();
        
        // submit upload 
    }

    return (
        <div>
            {
                loading ? (
                    <span>Loading ... </span>
                ) : 
                (
                    unpaidItems.length === 0 ? (
                        <span>Belum ada pesanan</span>
                    ) : (
                        unpaidItems.map((data) => {
                            let unpaidProducts = [...data.products];
                            let total = 0;
                            return (
                                <div style={styles.containerCard}>
                                    <div style={styles.title}>
                                        <h4>Pesanan : <span style={{color: 'palevioletred'}}>{data._id}</span></h4>
                                        <h5 style={{color: 'palevioletred'}}>Belum Dibayar</h5>
                                    </div>
    
                                    {
                                        unpaidProducts.map((product) => {
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
                                    <div style={{display: 'flex' , justifyContent: 'space-between' , marginTop: '20px' , alignItems: 'center'}}>
                                        <div style={{textAlign: 'left'}}>
                                            <label>Upload bukti pembayaran : </label> <br />
                                            <form onSubmit={payOrder} encType="multipart/form-data">
                                                <input type="file" onChange={(e) => {setFotoBukti(e.target.files[0])}} />
                                                <Button type="submit">Submit</Button>
                                            </form>
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

export default Unpaid
