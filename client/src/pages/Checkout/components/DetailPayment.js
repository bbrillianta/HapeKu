import React from 'react'
import styled from "styled-components";

const DetailPayment = ({total}) => {

    const CardPayment = styled.div`
        width: 100%;
        height: 100px;
        text-align: left;
        padding: 5px;
        box-sizing: border-box;
        box-shadow: 0px 0px 10px lightgray;
    `;

    const Product = styled.div`
        width: 100%;
        padding: 5px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `

    const convertToRupiah = (angka) => {
        let rupiah = '';		
        let angkarev = angka.toString().split('').reverse().join('');
        for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    } 

    const totalBelanja = total();

    return (
        <div>
            <CardPayment>
                <h3>Summary</h3>
                <hr />
                <Product>
                    <span>Total Belanja</span>
                    <span>{convertToRupiah(totalBelanja)}</span>
                </Product>
            </CardPayment>

        </div>
    )
}

export default DetailPayment
