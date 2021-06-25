import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Banner from "./banner-iphone.jpg"
import axios from "axios";
import {useHistory} from "react-router-dom"
import CardProduct from '../../components/CardProduct';

const Home = () => {
    const Jumbotron = styled.div`
        width: 100%;
        height: 80vh;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
    `

    const Container = styled.div`
        width: 80%;
        margin: auto;
        text-align: center;
        box-sizing: border-box;
    `;

    const CardWrapper = styled.div`
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-evenly;
        box-sizing: border-box;
        flex-direction: row;
        margin: 50px 0px;
        @media (max-width: 450px) {
            flex-direction: column;
        }
        @media (max-width: 950px) {
            flex-wrap: wrap;
        }
    `;

    const Footer = styled.div`
        width: 100%;
        text-align: center;
        background-color: #333;
        color: #fff;
        margin-top: 50px;
        padding: 20px;
        box-sizing: border-box;
    `

    const [dataProduct , setDataProduct] = useState([]);
    const [loading , setLoading] = useState(true);
    let count = 0;

    useEffect(() => {
        axios.get('http://localhost:3001/product')
        .then((response) => {
            let array = [];
            response.data.filter((data) => {
                if (count < 4) {
                    array.push(data);
                    count += 1;
                }
            })
            setDataProduct(array);
            setLoading(false);
        })
    } , []);

    const history = useHistory();

    if (loading) {
        return <div></div>
    }

    return (
        <div>
            <Container>
                <Jumbotron>
                    <div style={styles.tulisan}>
                        <h1 style={{lineHeight: '2'}}>Ayo beli smartphone sekarang!. Masih ada diskon hingga 90%</h1>
                    </div>
                    <div style={styles.gambar}></div>
                </Jumbotron>
                <div className="produk" style={{marginTop: '50px'}}>
                    <h1>Produk</h1>
                    <div className="productCard">
                        <CardWrapper>
                            {
                                dataProduct.map((data) => (
                                    <CardProduct data={data} />
                                ))
                            }
                        </CardWrapper>
                        <h3 style={{cursor: 'pointer'}} onClick={() => history.push('/products')}>Lihat lebih banyak ...</h3>
                    </div>
                </div>
            </Container>
            <Footer>Copyright Informatics Engineering</Footer>
        </div>
    )
}

const styles = {
    tulisan: {
        width: '50%',
        textAlign: 'left',
        display: 'flex',
        padding: '0px 30px',
        boxSizing: 'border-box',
        alignItems: 'center'
    }, 

    gambar: {
        width: '50%',
        backgroundImage: `url(${Banner})`,
        // border: '2px solid blue',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
}

export default Home
