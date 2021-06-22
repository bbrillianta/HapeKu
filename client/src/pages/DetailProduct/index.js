import React, { useState , useEffect} from 'react'
import "./style.css"
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router';
import axios from "axios"
import Swal from "sweetalert2" 

const DetailProduct = ({setTriggerCartUpdt}) => {
  const Button = styled.button`
    width: 150px;
    background: ${(props) => props.cart ? 'palevioletred' : 'transparent'};
    color: ${(props) => props.cart ? '#fff' : 'palevioletred'};
    font-size: 1em;
    margin: 2em 1rem 2rem 0;
    padding: 0.25em 1em;
    border-radius: 3px;
    cursor: pointer;
    text-align: center;
    border-width: 2px;
    border-style: ${(props) => props.cart ? 'none' : 'palevioletred'} ;
    border-color: ${(props) => props.cart ? 'none' : 'palevioletred'} ;
    @media (max-width: 700px) {
      margin: .5rem 0 .5rem 0;
    }
  `;
  
  const history = useHistory();

  let {param} = useParams();

  const [data , setData] = useState([]);
  const [loading , setLoading] = useState(true);
  const [thumbnail , setThumbnail] = useState(null);
  let images = [];

  useEffect(() => {
    axios.get(`http://localhost:3001/product/show/${param}`)
    .then((response) => {
      setData(response.data);
      setThumbnail(response.data.thumbnail.path)
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
      images.push(item);
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
          text: 'Berhasil menambah item ke keranjang'
        });
        localStorage.setItem('userCart', JSON.stringify(response.data.cartItems));
        setTriggerCartUpdt(true);
        setTriggerCartUpdt(false);
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Gagal menambah item ke keranjang'
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

  const onMouseOver = (path) => {
    setThumbnail(path)
  }

  return (
    <div style={{padding: '50px 100px' , boxSizing: 'border-box'}}>
      <div style={styles.card}>
        <div style={styles.thumbnail}>
          {/* gambar thumbnail */}
          <img style={styles.imgThumbnail} src={`http://localhost:3001/${thumbnail}`} />
          
          {/* gambar lainnya */}
          <div style={styles.anotherImg}>
            {
              images.map(img => {
                return (
                  <img style={styles.anotherImgItem} src={`http://localhost:3001/${img.path}`} onMouseEnter={() => onMouseOver(img.path)} />
                )
              })
            }
          </div>
        </div>
        <div style={{display: 'flex' , flexDirection: 'column' , justifyContent: 'center' , width: '60%'}}>
          <table>
            <tr>
              <td>Nama</td>
              <td>&nbsp;:&nbsp;</td>
              <td><h3>{data.name}</h3></td>
            </tr>
            <tr>
              <td>Harga</td>
              <td>&nbsp;:&nbsp;</td>
              <td style={{color: 'salmon'}}>{convertToRupiah(data.price)}</td>
            </tr>
            <tr>
              <td>Deskripsi</td>
              <td>&nbsp;:&nbsp;</td>
              <td>{data.description}</td>
            </tr>
            <tr>
              <td>Stok</td>
              <td>&nbsp;:&nbsp;</td>
              <td>{data.quantity}</td>
            </tr>
          </table>
          <div>
            <Button cart onClick={() => addCart(data._id)}>Masukkan ke keranjang</Button>
            <Button onClick={() => history.push("/products")}>Kembali ke katalog</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    maxWidth : '100%',
    boxShadow: '0px 0px 10px lightgray',
    boxSizing: 'border-box',
    height: '400px',
    display: 'flex'
  },
  thumbnail: {
    boxSizing: 'border-box',
    width: '40%',
  },
  imgThumbnail: {
    width: '100%', 
    height: '80%', 
    padding: '20px', 
    boxSizing: 'border-box',
  },
  anotherImg: {
    height: '20%' , 
    boxSizing: 'border-box' , 
    display: 'flex' , 
    justifyContent: 'space-evenly' , 
    alignItems: 'center',
    padding: '5px 5px 10px 5px'
  },
  anotherImgItem: {
    width: '25%' , 
    height: '80%' , 
    boxSizing: 'border-box',
    boxShadow: '0px 0px 10px lightgray',
  }
}

export default DetailProduct
