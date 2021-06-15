import React, { useState } from 'react'
import styled from "styled-components";
import axios from "axios";

const DetailPayment = ({total}) => {

    const CardPayment = styled.div`
        width: 100%;
        text-align: left;
        padding: 20px;
        box-sizing: border-box;
        box-shadow: 0px 0px 10px lightgray;
    `;

    const Product = styled.div`
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `

    const Button = styled.button`
        background: palevioletred;
        color: #fff;
        font-size: 1em;
        margin: 2em 1rem 2rem 0;
        padding: 0.25em 1em;
        border-radius: 3px;
        cursor: pointer;
        text-align: right;
        @media (max-width: 700px) {
            margin: .5rem 0 .5rem 0;
        }
    `;

    const convertToRupiah = (angka) => {
        let rupiah = '';		
        let angkarev = angka.toString().split('').reverse().join('');
        for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    } 

    const [address , setAddress] = useState("");

    const checkout = (e) => {
        e.preventDefault();
        let user = JSON.parse(localStorage.getItem("dataUser"))
        if (address !== "") {
            axios.post('http://localhost:3001/user/payment/unpaid' , {
                userId: user._id,
                address: address,
            })
            .then((response) => {
                console.log(response);
            })
        } else {
            alert("address diisi")
        }
    }

    return (
        <div>
            <CardPayment>
                <h3>Summary</h3>
                <hr />
                <br />
                <Product>
                    <span>Total Belanja</span>
                    {
                        total === null ? (
                            <span>Rp. 0</span>
                        ) : (
                            <span>{convertToRupiah(total)}</span>
                        )
                    } 
                </Product>
            </CardPayment>

            {/* alamat */}
            <form style={styles.form} onSubmit={checkout}>
                <textarea 
                    placeholder="Masukkan alamat disini" 
                    style={{
                        width: '100%' , 
                        height: '100px',
                        padding: '10px',
                        boxSizing: 'border-box',
                        fontSize: '16px',
                        resize: 'none',
                    }}
                    onChange={(e) => setAddress(e.target.value)}
                ></textarea>
                <Button type="submit">Checkout</Button>
            </form>

        </div>
    )
}

const styles = {
    form: {
        width: '100%',
        marginTop: '30px'
    }
}

export default DetailPayment
