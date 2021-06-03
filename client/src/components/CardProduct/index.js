import React, { useState , useEffect } from 'react'
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import Checkout from '../../pages/Checkout';

const CardProduct = ({data}) => {
    const mediaMatch = window.matchMedia('(max-width: 450px)');
    const [matches, setMatches] = useState(mediaMatch.matches);
    const history = useHistory();

    // untuk atur @media
    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addListener(handler);
        return () => mediaMatch.removeListener(handler);
    })

    const Card = styled.div`
        width: 20%;
        margin: 10px;
        box-sizing: border-box;
        border-radius: 10px;
        box-shadow: 0px 0px 10px lightgray;
        padding: 0px 0px 10px 0px;
        cursor: pointer;
        @media (max-width: 450px) {
            width: 100%;
        }
    `;

    const CardInfo = styled.div`
        height: 40%;
        padding: 0 20px;
        text-align: left;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        font-size: 1.2em;
    `;

    const Button = styled.button`
        outline: none;
        border: none;
        padding: 5px;
        box-sizing: border-box;
        cursor: pointer;
        background-color: ${(props) => props.cart ? 'transparent' : ''};
        color: ${(props) => props.cart ? '#d30000' : ''};
        border: 2px solid ${(props) => props.cart ? '#d30000' : ''};
    `

    const addCart = () => {
        localStorage.setItem('productCart' , JSON.stringify(data));
    }

    return (
        <Card key={data.id}>  
            <img 
                style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    height: '60%',
                    borderRadius: '10px',
                }}
                src={data.avatar}
            />
            <CardInfo>
                <p style={{fontWeight: 'bold'}}>{data.first_name} {data.id}</p>
                <p style={styles.email(matches)}>{data.email}</p>
                <Button cart onClick={addCart}>Add to Cart</Button>
                <Button onClick={() => history.push(`/detail-product/${data.id}`)}>Detail Product</Button>
            </CardInfo>
        </Card>
    )
}

const styles = {
    email: isResize => ({
        width: isResize ? '250px' : '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '14px',
    })
}

export default CardProduct
