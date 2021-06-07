import React, {useState , useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios';
import CardProduct from '../../components/CardProduct';

const Product = () => {
    const [datas , setData] = useState([]);

    // percobaan get data
    useEffect(() => {
        axios.get('https://reqres.in/api/users?page=1')
        .then((response) => {
            setData(response.data.data);
        })
    },[]);

    const CardWrapper = styled.div`
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-evenly;
        box-sizing: border-box;
        flex-direction: row;
        overflow: auto;
        @media (max-width: 700px) {
            flex-direction: column;
        }
    `;

    return (
        <div>
            <h1 style={{
                margin: '50px 0px 50px 0px',
                boxSizing: 'border-box'
            }}>Katalog Product</h1>

            <CardWrapper>
                {
                    datas.map((data) => (
                        <CardProduct data={data} />
                    ))
                }
            </CardWrapper>
        </div>
    )
}

export default Product
