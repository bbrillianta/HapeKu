import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import axios from "axios";
import swal from "sweetalert2";

// const ProductCards = ({products , handleChange}) => {
const ProductCards = () => {

    const CardProduct = styled.div`
        width: 100%;
        border-radius: 10px;
        box-sizing: border-box;
        margin: 0px 0px 20px 0px;
        padding: 7px;
        box-shadow: 0px 0px 10px lightgray;
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

    const [cartItems , setCartItems] = useState([]);
    const [loading , setLoading] = useState(true);

    // get user id from localstorage
    let userId = JSON.parse(localStorage.getItem("dataUser"));

    // get cart items data
    useEffect(() => {
        axios.get(`http://localhost:3001/user/checkout?userId=${userId._id}`)
        .then((response) => {
            setCartItems(response.data);
            setLoading(false);
        })
    } , [])

    const handlePlusCount = (id) => {
        
    }

    const handleMinusCount = (id) => {
        
    }

    const convertToRupiah = (angka) => {
        let rupiah = '';		
        let angkarev = angka.toString().split('').reverse().join('');
        for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    } 

    const deleteData = (id) => {
        axios.delete('http://localhost:3001/user/cart/' , {
            data: {
                userId: userId._id,
                itemId: id,
            }
        })
        .then(response => {
            swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Product berhasil dihapus dari cart'
            })
            localStorage.setItem("dataUser" , JSON.stringify(response.data));
            setCartItems(response.data.cartItems)
        })
        .catch((error) => console.log(error))
    }

    return (
        <div>
            {
                loading ? (
                    <span>loading ...</span>
                ) : cartItems.length === 0 ? (
                    <span>Cart masih kosong</span>
                ) : (
                    cartItems.map((product) => {
                        return (
                            <CardProduct key={product._id}>
                                <div style={{display: 'flex'}}>
                                    <img 
                                        src={`http://localhost:3001/${product.product.thumbnail.path}`} 
                                        style={{width: '100px' , height: '100%' , marginRight: '10px'}}
                                    />
                                    <DeskripsiProduct>
                                        <h4>{product.product.name}</h4>
                                        <p>5 gram</p>
                                        <h5 style={{color: 'salmon'}}>
                                            {convertToRupiah(product.product.price)}
                                        </h5>
                                    </DeskripsiProduct>
                                    <div style={styles.action}>
                                        <div className="opsi"
                                            style={{display: 'flex',alignItems: 'center',justifyContent: 'space-between'}}>
                                            {/* <OpsiButton onClick={() => handleMinusCount(product._id)}>-</OpsiButton> */}
                                            <OpsiButton>-</OpsiButton>
                                            <span>{product.quantity}</span>
                                            {/* <OpsiButton onClick={() => handlePlusCount(product._id)}>+</OpsiButton> */}
                                            <OpsiButton>+</OpsiButton>
                                            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{cursor: 'pointer'}} onClick={() => deleteData(product._id)}>
                                                <g clip-path="url(#clip0)">
                                                    <rect width="16" height="16" rx="3" fill="white"/>
                                                    <path d="M10.2067 5.79688C9.99977 5.79688 9.83203 5.96462 9.83203 6.17158V13.2535C9.83203 13.4604 9.99977 13.6283 10.2067 13.6283C10.4137 13.6283 10.5814 13.4604 10.5814 13.2535V6.17158C10.5814 5.96462 10.4137 5.79688 10.2067 5.79688Z" fill="#FF0000"/>
                                                    <path d="M5.78486 5.79688C5.5779 5.79688 5.41016 5.96462 5.41016 6.17158V13.2535C5.41016 13.4604 5.5779 13.6283 5.78486 13.6283C5.99183 13.6283 6.15957 13.4604 6.15957 13.2535V6.17158C6.15957 5.96462 5.99183 5.79688 5.78486 5.79688Z" fill="#FF0000"/>
                                                    <path d="M2.56032 4.76335V13.9953C2.56032 14.541 2.76041 15.0534 3.10994 15.4211C3.45786 15.7898 3.94205 15.9991 4.44878 16H11.5383C12.0452 15.9991 12.5294 15.7898 12.8772 15.4211C13.2267 15.0534 13.4268 14.541 13.4268 13.9953V4.76335C14.1216 4.57893 14.5718 3.90768 14.4789 3.19471C14.3858 2.48189 13.7785 1.94867 13.0596 1.94852H11.1411V1.48014C11.1433 1.08626 10.9875 0.708039 10.7087 0.42979C10.4299 0.151688 10.0511 -0.0031709 9.6572 4.92333e-05H6.32992C5.93604 -0.0031709 5.55724 0.151688 5.2784 0.42979C4.99957 0.708039 4.84383 1.08626 4.84603 1.48014V1.94852H2.92756C2.20859 1.94867 1.60131 2.48189 1.50822 3.19471C1.41527 3.90768 1.8655 4.57893 2.56032 4.76335ZM11.5383 15.2506H4.44878C3.80812 15.2506 3.30973 14.7002 3.30973 13.9953V4.79629H12.6774V13.9953C12.6774 14.7002 12.179 15.2506 11.5383 15.2506ZM5.59544 1.48014C5.59295 1.28503 5.66965 1.09724 5.80812 0.959502C5.94643 0.821768 6.13467 0.746095 6.32992 0.749461H9.6572C9.85245 0.746095 10.0407 0.821768 10.179 0.959502C10.3175 1.09709 10.3942 1.28503 10.3917 1.48014V1.94852H5.59544V1.48014ZM2.92756 2.69793H13.0596C13.4321 2.69793 13.734 2.99989 13.734 3.3724C13.734 3.74492 13.4321 4.04688 13.0596 4.04688H2.92756C2.55505 4.04688 2.25309 3.74492 2.25309 3.3724C2.25309 2.99989 2.55505 2.69793 2.92756 2.69793Z" fill="#FF0000"/>
                                                    <path d="M7.9958 5.79688C7.78883 5.79688 7.62109 5.96462 7.62109 6.17158V13.2535C7.62109 13.4604 7.78883 13.6283 7.9958 13.6283C8.20276 13.6283 8.3705 13.4604 8.3705 13.2535V6.17158C8.3705 5.96462 8.20276 5.79688 7.9958 5.79688Z" fill="#FF0000"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0">
                                                        <rect width="16" height="16" rx="3" fill="white"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <br /><hr /><br />
                                <div>
                                    <div className="subtotal" style={styles.flex}>
                                        <h4>Subtotal</h4>
                                        <h4>
                                            {
                                                convertToRupiah(product.quantity * product.product.price)
                                            }
                                        </h4>
                                    </div>
                                    <div className="harga" style={styles.flex}>
                                        <p style={{fontWeight: 'lighter', color: 'grey'}}>Harga</p>
                                        <p style={{fontWeight: 'lighter', color: 'grey'}}>{convertToRupiah(product.product.price)}</p>
                                    </div>
                                    <div className="jumlah" style={styles.flex}>
                                        <p style={{fontWeight: 'lighter', color: 'grey'}}>Jumlah Barang</p>
                                        <p style={{fontWeight: 'lighter', color: 'grey'}}>{product.quantity}</p>
                                    </div>
                                </div>
                            </CardProduct>
                        )
                    })
                )
            }
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
