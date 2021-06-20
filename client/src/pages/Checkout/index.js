import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import swal from "sweetalert2"

const Checkout = () => {
    const Button = styled.button`
        background: palevioletred;
        color: #fff;
        font-size: 1em;
        margin: 2em 1rem 2rem 0;
        padding: 0.25em 1em;
        border-radius: 3px;
        cursor: pointer;
        text-align: right;
        border: none;
        @media (max-width: 700px) {
            margin: .5rem 0 .5rem 0;
        }
    `;

    const [checkout , setCheckout] = useState([]);
    const [loading , setLoading] = useState(true);
    const [address , setAddress] = useState("")
    const [total , setTotal] = useState(0);

    let idUser = JSON.parse(localStorage.getItem("idUser"))
    
    // get data checkout from cart api
    useEffect(() => {
        axios.get(`http://localhost:3001/user/cart?userId=${idUser}`)
        .then((response) => {
            let totalTemp = 0;
            response.data.map((item) => {
                totalTemp += item.quantity * item.product.price
            })
            setTotal(totalTemp)
            setCheckout(response.data)
            setLoading(false)
        })
    } , [])

    const convertToRupiah = (angka) => {
        let rupiah = '';		
        let angkarev = angka.toString().split('').reverse().join('');
        for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    }

    const makeOrder = () => {
        console.log(idUser);
        if (address !== "" && idUser !== "") {
            axios.post('http://localhost:3001/user/payment/unpaid' , {
                userId: idUser,
                address: address,
            })
            .then((response) => {
                window.location.href = '/orders';
            })
            .catch((error) => console.log(error))
        } else {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Address belum terisi'
            })
        }
    }

    return (
        <div>
            <h1 style={{margin: '30px 0px 30px 0px'}}>Checkout</h1>
            <div style={styles.containerCard}>
                <h3 style={{textAlign: 'left'}}>Shipping Address</h3>
                <textarea 
                    placeholder="Masukkan alamat anda" 
                    style={styles.textareaAddress}
                    onChange={(e) => setAddress(e.target.value)}
                ></textarea>
            </div>
            <div style={styles.containerCard}>
                <h3 style={{textAlign: 'left'}}>Ordered Product</h3>

                {
                    loading ? (
                        <span>loading ...</span>
                    ) : (
                        checkout.map((data) => {
                            return (
                                <div style={styles.cardProduct}>
                                    <img style={{width: '100px' , height: '100px'}} src={`http://localhost:3001/${data.product.thumbnail.path}`} alt="" />
                                    <div style={{textAlign: 'left', display: 'flex' , flexDirection: 'column' , height: '50px' , justifyContent: 'space-evenly'}}>
                                        <h4> {data.product.name}</h4>
                                        <h4 style={{color: 'salmon'}}> {convertToRupiah(data.product.price)} </h4>
                                    </div>
                                    <p>Quantity : {data.quantity}</p>
                                    <h4> {convertToRupiah(data.product.price * data.quantity)}</h4>
                                </div>
                            )
                        })
                    )
                }
                <br />
                <h3>Total : {convertToRupiah(total)}</h3>
            </div>
            <Button onClick={makeOrder}>Make An Order</Button>
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
    textareaAddress : {
        width: '100%' , 
        height: '70px',
        padding: '10px',
        boxSizing: 'border-box',
        resize: 'none',
        marginTop: '20px'
    },
    opsiButton : {
        width: '2em',
        height: '2em',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
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
    }

}

export default Checkout
