import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import axios from "axios";
import swal from "sweetalert2";
import './style.css';
import buktii from "../../asset/bukti.jpg";

const Verifikasi = () => {
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
              <h2> Rincian Verifikasi Transaksi </h2>
              
                <div className="card">
                    <img className="img-card" src={buktii} alt="" />
                    <div className="card-body">
                        <p >08-09-2021</p>
                        <p> Mahdiya Aqila </p>
                        <p> Perum Tanah bang permai blok A6 Kediri Tabanan Bali </p>
                        <br />
                        <p style={{opacity:'70%'}}> Total : 500.000</p>
                        <p style={{opacity:'70%'}}> Kuantitas : 12</p>
                        <p style={{opacity:'70%'}}> Samsung,oppo,samsung,vivo,iphone </p>
                    </div>
                    <div className="card-opsi">
                        <OpsiButton className="opsi">❌</OpsiButton>
                        <OpsiButton className="opsi">✔</OpsiButton>
                    </div>
                </div>
                 <div className="card">
                    <img className="img-card" src={buktii} alt="" />
                    <div className="card-body">
                        <p >08-09-2021</p>
                        <p> Mahdiya Aqila </p>
                        <p> Perum Tanah bang permai blok A6 Kediri Tabanan Bali </p>
                        <br />
                        <p style={{opacity:'70%'}}> Total : 500.000</p>
                        <p style={{opacity:'70%'}}> Kuantitas : 12</p>
                        <p style={{opacity:'70%'}}> Samsung,oppo,samsung,vivo,iphone </p>
                    </div>
                    <div className="card-opsi">
                        <OpsiButton className="opsi">❌</OpsiButton>
                        <OpsiButton className="opsi">✔</OpsiButton>
                    </div>
                </div>
                 <div className="card">
                    <img className="img-card" src={buktii} alt="" />
                    <div className="card-body">
                        <p >08-09-2021</p>
                        <p> Mahdiya Aqila </p>
                        <p> Perum Tanah bang permai blok A6 Kediri Tabanan Bali </p>
                        <br />
                        <p style={{opacity:'70%'}}> Total : 500.000</p>
                        <p style={{opacity:'70%'}}> Kuantitas : 12</p>
                        <p style={{opacity:'70%'}}> Samsung,oppo,samsung,vivo,iphone </p>
                    </div>
                    <div className="card-opsi">
                        <OpsiButton className="opsi">❌</OpsiButton>
                        <OpsiButton className="opsi">✔</OpsiButton>
                    </div>
                </div>
              
            </div>
        </div>
    )
}


export default Verifikasi
