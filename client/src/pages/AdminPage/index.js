import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import axios from "axios"
import ProductCards from './components/ProductCards';

const AdminPage = () => {
    const Container = styled.div`
        width: 80%;
        margin: auto;
        text-align: center;
        box-sizing: border-box;
    `;

    const Anchor = styled.a`
        float: left;
        color: #f2f2f2;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 14px;
    `

    const [nameProduct , setNameProduct] = useState(null);
    const [description , setDescription] = useState(null);
    const [price , setPrice] = useState(null);
    const [quantity , setQuantity] = useState(null);
    const [thumbnail , setThumbnail] = useState(null);
    const [images , setImages] = useState(null);
    const [dataProduct , setDataProduct] = useState([]);
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3001/product')
        .then((response) => {
            setDataProduct(response.data)
            setLoading(false)
        })
    } , [])

    const sendData = (e) => {
        e.preventDefault();
        // console.log(nameProduct)
        // console.log(description)
        // console.log(price)
        // console.log(quantity)
        // console.log(thumbnail)
        // console.log(images)
    }

    return (
        <div>
            <div style={styles.container}>
                <div style={styles.content}>
                    <form style={styles.form} onSubmit={sendData} encType="multipart/form-data" >
                        <h2>Input Data Product</h2>
                        <input name="nama" type="text" placeholder="Nama Product" onChange={(e) => setNameProduct(e.target.value)}/>
                        <textarea name="deskripsi" rows="10" type="text" placeholder="Deskripsi Product" onChange={(e) => setDescription(e.target.value)}/>
                        <input name="price" type="text" placeholder="Harga" onChange={(e) => setPrice(e.target.value)} />
                        <label>
                            Thumbnail &nbsp; &nbsp;
                            <input name="thumbnail" type="file" placeholder="Thumbnail" onChange={(e) => setThumbnail(e.target.files)} />
                        </label>
                        <label>
                            Images &nbsp; &nbsp;
                            <input name="images" multiple="multiple" type="file" placeholder="Images" onChange={(e) => setImages(e.target.files)} />
                        </label>
                        <input name="quantity" type="text" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
                        <button style={styles.button} type="submit">Save</button>
                    </form>

                    <div style={styles.product}>
                        {
                            loading ? 
                            (
                                <span>Loading</span>
                            ) : 
                            (
                                dataProduct.map((data) => (
                                    <ProductCards data={data} />
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        width: '80%',
        margin: 'auto',
        textAlign: 'center',
        boxSizing: 'border-box',
    },
    content: {
        display: 'flex',
        height: '80vh',
        justifyContent: 'space-between'
    },

    form: {
        marginTop: '20px',
        width : '40%',
        height: '100%',
        display: 'flex',
        flexDirection:  'column',
        justifyContent: 'space-evenly',
        boxShadow: '0px 0px 10px lightgray',
        textAlign: 'center',
        padding: '10px',
        boxSizing: 'border-box',
        overflow: 'hidden',
    },

    button: {
        background: 'palevioletred',
        color: '#fff',
        fontSize: '1em',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '5px'
    },

    product: {
        marginTop: '20px',
        boxSizing: 'border-box',
        width: '58%',
        height: '100%',
        boxShadow: '0px 0px 10px lightgray',
        overflow: 'auto',
    }
}

export default AdminPage
