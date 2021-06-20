import axios from 'axios';
import React, {useState , useEffect} from 'react'
import {useHistory , useParams} from "react-router-dom";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import Swal from 'sweetalert2';

const DetailProduct = () => {

  const history = useHistory();

  const ContentContainer = styled.div`
    display: flex;
    @media (max-width: 700px) {
      flex-direction: column;
    }
  `;

  const ImageContainer = styled.div`
    width: 60%;
    height: 500px;
    overflow: auto;
    @media (max-width: 700px) {
      width: 100%;
    }
  `;

  const DetailContainer = styled.div`
    width: 40%; 
    text-align: left; 
    padding: 10px 20px; 
    box-sizing: border-box;
    @media (max-width: 700px) {
      width: 100%;
    }
  `;

  const Button = styled.button`
    background: ${(props) => props.cart ? 'palevioletred' : 'transparent'};
    color: ${(props) => props.cart ? '#fff' : 'palevioletred'};
    font-size: 1em;
    margin: 2em 1rem 2rem 0;
    padding: 0.25em 1em;
    border-radius: 3px;
    cursor: pointer;
    text-align: right;
    border-width: 2px;
    border-style: solid;
    border-color: ${(props) => props.cart ? 'none' : 'palevioletred'} ;
    @media (max-width: 700px) {
      margin: .5rem 0 .5rem 0;
    }
  `;

  let {param} = useParams();

  const [data , setData] = useState({});
  const [loading , setLoading] = useState(true);
  let images = [];

  useEffect(() => {
    axios.get(`http://localhost:3001/product/show/${param}`)
    .then((response) => {
      setData(response.data);
      setLoading(false);
    })
  } ,[])

  if (loading) { 
    return <div></div>
  }

  const convertToRupiah = (angka) => {
    let rupiah = '';		
    let angkarev = angka.toString().split('').reverse().join('');
    for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
    return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
  } 

  if (data.images.length !== 0) {
    data.images.map((item) => {
      let obj = {
        original: `http://localhost:3001/${item.path}`,
        thumbnail: `http://localhost:3001/${item.path}`,
      }
      images.push(obj);
    })
  }

  const addCart = (id) => {
    let isLogged = JSON.parse(localStorage.getItem("isLogged"))
    let idUser = JSON.parse(localStorage.getItem("idUser"))
    if (isLogged == true) {
      axios.post('http://localhost:3001/user/cart/', {
        userId: idUser,
        productId: id,
        quantity: 1
      })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Berhasil menambah item ke cart'
        })
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Gagal menambah item ke cart'
        })
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Anda belum Login / Register'
      }).then(() => {
        window.location.href = "/login"
      })
    }
  }

  return (
    <div>
       <h1 style={{
        margin: '50px 0px 50px 0px',
        boxSizing: 'border-box',
      }}>{data.name}</h1>

      <ContentContainer>
        <ImageContainer>
          <ImageGallery items={images} />
        </ImageContainer>

        <DetailContainer>
          <ul style={{listStyle: 'none'}}>
            <li>Quantity : {data.quantity}</li>
            <li>Description : {data.description}</li>
            <li>Price : {convertToRupiah(data.price)}</li>
          </ul>

          <Button cart onClick={() => addCart(data._id)}>Add to Cart</Button>
          <Button onClick={() => history.push('/products')}>Back to Catalog</Button>
        </DetailContainer>
      </ContentContainer>
    </div>
  )
}

export default DetailProduct
