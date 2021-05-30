import axios from 'axios';
import React, {useState , useEffect} from 'react'
import Carousel from 'react-elastic-carousel'
import {useParams} from "react-router-dom";

const DetailProduct = () => {

  // const items = [
  //   {id: 1, title: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg'},
  //   {id: 2, title: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg'},
  //   {id: 3, title: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg'},
  //   {id: 4, title: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg'},
  //   {id: 5, title: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg'}
  // ]

  let {param} = useParams();

  const [data , setData] = useState({});

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/photos/${param}`)
    .then((response) => {
      setData(response.data)
    })
  } , [])

  return (
    <div>
      <h1 style={{
        margin: '100px 0px 50px 0px',
        boxSizing: 'border-box',
      }}>{data.title}</h1>

      {/* <Carousel>
        {
          items.map(item => {
            return (
              <img key={item.id} src={item.title} />
            ) 
          })
        }
      </Carousel> */}

      <Carousel>
        <img src={data.url} key={data.albumId} />
      </Carousel>

    </div>
  )
}

export default DetailProduct
