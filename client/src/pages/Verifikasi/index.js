import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import axios from "axios";
import swal from "sweetalert2";
import './style.css';
import buktii from "../../asset/bukti.jpg";

const Verifikasi = () => {
    const [transactions, setTransactions] = useState([]);
    const [changedTransaction, setChangeTransaction] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/admin/transaction')
        .then(res => res.json())
        .then(data => { 
            setTransactions(data); 
        });
    }, [changedTransaction]);

    const convertToRupiah = (angka) => {
        let rupiah = '';		
        let angkarev = angka.toString().split('').reverse().join('');
        for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    } 

    const getTotalTransaction = (products) => {
        let total = 0;

        for(const product of products) {
            total += product.quantity * product.product.price;
        }
        return convertToRupiah(total);
    }

    const verify = (userId, transactionId) => {
        fetch('http://localhost:3001/admin/transaction/verify', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({transactionId, userId})
        })
        .then(res => res.json())
        .then(data => { 
            if(changedTransaction) setChangeTransaction(false);
            else setChangeTransaction(true);
        });
    }   

    const unverify = (userId, transactionId) => {
        fetch('http://localhost:3001/admin/transaction/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({transactionId, userId})
        })
        .then(res => res.json())
        .then(data => { 
            if(changedTransaction) setChangeTransaction(false);
            else setChangeTransaction(true);
        });
    }   

    const OpsiButton = styled.button`
        width: 2em;
        height: 2em;
        border-radius: 50%;
        border: none;
        cursor: pointer;
    `
    return (
        <div className="container" >
            <div className="content-area">
              <h2 style={{}}> Rincian Verifikasi Transaksi </h2>
                {
                    transactions.length === 0 ? (
                        <span style={{margin: '50px auto'}}>Belum ada pembayaran yang siap diverifikasi</span>
                    ) : (
                        transactions.map((transaction) => {
                            return(
                            <div className="card">
                                <img className="img-card" src={`http://localhost:3001/${transaction.payment.confirmation.path}`} alt="" />
                                <div className="card-body">
                                    <p >{transaction.created_at}</p>
                                    <p> {transaction.user.username} </p>
                                    <p> {transaction.address} </p>
                                    <br />
                                    <p style={{opacity:'70%'}}> {getTotalTransaction(transaction.products)}</p>
                                    <p style={{opacity:'70%'}}> { 
                                        transaction.products.map((product) => { return product.product.name + ' x' + product.quantity + ', ' })
                                    } </p>
                                </div>
                                <div className="card-opsi">
                                    <OpsiButton className="opsi" 
                                    onClick={(e) => { 
                                        e.preventDefault();
                                        unverify(transaction.user._id, transaction._id); 
                                    }}>❌</OpsiButton>
                                    <OpsiButton className="opsi" onClick={(e) => { 
                                        e.preventDefault();
                                        verify(transaction.user._id, transaction._id); 
                                    }}>✔</OpsiButton>
                                </div>
                            </div>
                            );
                        })
                    )
                }  
            </div>
        </div>
    )
}


export default Verifikasi
