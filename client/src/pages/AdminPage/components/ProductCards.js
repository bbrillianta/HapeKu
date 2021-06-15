import React, { useState } from 'react'
import styled from "styled-components";

const ProductCards = ({data}) => {
    const CardProduct = styled.div`
        width: 100%;
        /* border-radius: 10px; */
        box-sizing: border-box;
        margin: 0px 0px 20px 0px;
        padding: 7px;
        box-shadow: 0px 0px 5px lightgray;
    `

    const DeskripsiProduct = styled.div`
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        overflow: hidden;
        text-align: left;
        padding: 5px;
        box-sizing: border-box;
    `;

    const OpsiButton = styled.button`
        width: 2em;
        height: 2em;
        border-radius: 50%;
        border: none;
        cursor: pointer;
    `

    const convertToRupiah = (angka) => {
        let rupiah = '';		
        let angkarev = angka.toString().split('').reverse().join('');
        for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    } 

    return (
        <div>
            <CardProduct key={data._id}>
                <div style={{display: 'flex'}}>
                    <img 
                        src={`http://localhost:3001/${data.thumbnail.path}`} 
                        style={{width: '15%' , height: '15%' , marginRight: '10px'}}
                    />
                    <DeskripsiProduct>
                        <h4>{data.name}</h4>
                        <p>{data.description}</p>
                        <h5 style={{color: 'salmon'}}>
                            {convertToRupiah(data.price)}
                        </h5>
                    </DeskripsiProduct>
                </div>
            </CardProduct>
        </div>
    )
}

const styles = {
    action: {
        width: '30%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: '5px',
        boxSizing: 'border-box'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '5px 0px'
    }
}

export default ProductCards
