import React, { useEffect, useState } from 'react'
import axios from "axios"
import ProductCards from './components/ProductCards';

const AdminPage = () => {
    const thumbnail = React.createRef();
    const images = React.createRef();
    const [inputs, setInputs] = useState({});
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
        const form = new FormData();

        const imagesInput = images.current.files;
        for(let index = 0; index < imagesInput.length; index++)
            form.append(`images`, imagesInput[index]);
        form.append('name', inputs.name);
        form.append('description', inputs.description);
        form.append('thumbnail', thumbnail.current.files[0]);
        form.append('price', inputs.price);
        form.append('quantity', inputs.quantity)

        fetch('http://localhost:3001/product', {
            method: 'POST',
            body: form
        })
        .then(res => res.json())
        .then(data => setDataProduct([...dataProduct, data]));
    }

    return (
        <div>
            <div style={styles.container}>
                <div style={styles.content}>
                    <form style={styles.form} onSubmit={sendData} encType="multipart/form-data">
                        <h2>Input Data Product</h2>
                        <input name="name" type="text" placeholder="Nama Product" onChange={(e) => setInputs({...inputs,[e.target.name]: e.target.value})}/>
                        <textarea name="description" rows="10" type="text" placeholder="Deskripsi Product" onChange={(e) => setInputs({...inputs,[e.target.name]: e.target.value})}/>
                        <input name="price" type="text" placeholder="Harga" onChange={(e) => setInputs({...inputs,[e.target.name]: e.target.value})} />
                        <label>
                            Thumbnail &nbsp; &nbsp;
                            <input name="thumbnail" type="file" placeholder="Thumbnail" ref={thumbnail} />
                        </label>
                        <label>
                            Images &nbsp; &nbsp;
                            <input name="images" multiple="multiple" type="file" placeholder="Images" ref={images} />
                        </label>
                        <input name="quantity" type="text" placeholder="Quantity" onChange={(e) => setInputs({...inputs,[e.target.name]: e.target.value})} />
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
