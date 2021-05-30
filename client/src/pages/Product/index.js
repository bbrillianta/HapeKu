import React, {useState , useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios';
import {useHistory} from "react-router-dom";

const Product = () => {
    const mediaMatch = window.matchMedia('(max-width: 450px)');
    const [matches, setMatches] = useState(mediaMatch.matches);
    const [datas , setData] = useState([]);

    const history = useHistory();

    // percobaan get data
    useEffect(() => {
        axios.get('https://reqres.in/api/users?page=1')
        .then((response) => {
            setData(response.data.data);
        })
    },[]);

    // untuk atur @media
    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addListener(handler);
        return () => mediaMatch.removeListener(handler);
    })

    const CardWrapper = styled.div`
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-evenly;
        box-sizing: border-box;
        flex-direction: row;
        @media (max-width: 450px) {
            flex-direction: column;
        }
    `;

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

    const ButtonCart = styled.button`
        outline: none;
        border: none;
        padding: 10px;
        box-sizing: border-box;
        cursor: pointer;
    `

    return (
        <div>
            <h1 style={{
                margin: '100px 0px 50px 0px',
                boxSizing: 'border-box'
            }}>Katalog Product</h1>

            <CardWrapper>
                {
                    datas.map((data) => (
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
                                <p>{data.first_name} {data.id}</p>
                                <h4 style={styles.email(matches)}>{data.email}</h4>
                                <ButtonCart onClick={() => history.push(`/detail-product/${data.id}`)}>Detail Product</ButtonCart>
                            </CardInfo>
                        </Card>
                    ))
                }    
            </CardWrapper>

        </div>
    )
}

const styles = {
    email: isResize => ({
        width: isResize ? '250px' : '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    })
}

export default Product
