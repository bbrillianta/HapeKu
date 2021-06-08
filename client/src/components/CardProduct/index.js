import React, { useState , useEffect } from 'react'
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import Checkout from '../../pages/Checkout';

const CardProduct = ({data}) => {
    const mediaMatch = window.matchMedia('(max-width: 450px)');
    const history = useHistory();

    const Card = styled.div`
        width: 20%;
        max-height: 800px;
        margin: 10px;
        box-sizing: border-box;
        border-radius: 10px;
        box-shadow: 0px 0px 10px lightgray;
        padding: 0px 0px 10px 0px;
        cursor: pointer;
        @media (max-width: 700px) {
            margin: 15px auto;
            width: 90%;
        }
    `;

    const CardInfo = styled.div`
        height: 40%;
        padding: 10px 20px;
        text-align: left;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        font-size: 1.2em;
        @media (max-width: 700px) {
            justify-content: space-evenly;
        }
    `;

    const convertToRupiah = (angka) => {
        let rupiah = '';		
        let angkarev = angka.toString().split('').reverse().join('');
        for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    } 

    return (
        <Card key={data._id} onClick={() => history.push(`/detail-product/${data._id}`)}>  
            <img 
                style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    height: '60%',
                    borderRadius: '10px',
                }}
                src={`http://localhost:3001/${data.thumbnail.path}`}
            />
            <CardInfo>
                <p style={{fontWeight: 'bold'}}>{data.name} </p>
                <p style={{fontSize: '16px' , color: '#d30000'}}>{convertToRupiah(data.price)}</p>
                <p style={{fontSize: '14px' , color: '#d30000'}}>Stok : {data.quantity}</p>
            </CardInfo>
        </Card>
    )
}

export default CardProduct
