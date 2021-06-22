import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import styled from 'styled-components';
import swal from "sweetalert2";

const Unpaid = () => {
    const Button = styled.button`
        background: ${(props) => props.primary ? 'palevioletred' : '#ff3c2e'};
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
    const [getUnpaid, setGetUnpaid] = useState(false);

    let idUser = JSON.parse(localStorage.getItem("idUser"))

    useEffect(() => {
        axios.get(`http://localhost:3001/user/payment/unpaid?userId=${idUser}`)
        .then(response => {
            setUnpaid(response.data);
            setLoading(false);
        })
    } , [getUnpaid])

    const convertToRupiah = (angka) => {
        let rupiah = '';		
        let angkarev = angka.toString().split('').reverse().join('');
        for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    }

    const payOrder = (e, unpaidItemId) => {
        e.preventDefault();
        
        // submit upload 
        console.log(fotoBukti, unpaidItemId, idUser);

        const form = new FormData();

        form.append('userId', idUser);
        form.append('unpaidItemId', unpaidItemId);
        form.append('verificationImage', fotoBukti);

        fetch('http://localhost:3001/user/payment/paid', {
            method: "POST",
            body: form
        })
        .then(res => res.json())
        .then(data => {
            if(getUnpaid) setGetUnpaid(false);
            else setGetUnpaid(true);
            swal.fire(
                'Upload bukti pembayaran berhasil!',
                'Tunggu admin memverifikasi pembayaranmu',
                'success'
            );
        });
    }

    const deleteOrder = (userId , unpaidId) => {
        swal.fire({
            title: 'Are you sure?',
            text: "Yakin ingin menghapus orderan ini ? ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!' 
        })
        .then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/user/payment/unpaid` , {
                    data: {
                        userId: userId,
                        unpaidItemId: unpaidId
                    }
                })
                .then((response) => {
                    swal.fire(
                        'Deleted!',
                        'Berhasil menghapus orderan.',
                        'success'
                    )
                    window.location.href = '/orders'
                })
            }
        })
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
                                        <div style={{width: '200px' , display: 'flex' , justifyContent: 'space-between' , alignItems: 'center'}}>
                                            <h5 style={{color: 'palevioletred'}}>Belum Dibayar</h5>
                                            <Button onClick={() => deleteOrder(idUser, data._id)}>Hapus</Button>
                                        </div>
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
                                            <form onSubmit={(event) => payOrder(event, data._id)} encType="multipart/form-data">
                                                <input type="file" onChange={(e) => {setFotoBukti(e.target.files[0])}} />
                                                <Button primary type="submit">Simpan</Button>
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
