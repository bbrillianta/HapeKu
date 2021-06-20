import React, { useEffect, useState } from 'react'
import axios from "axios";
import ItemCard from "./ItemCard";
import swal from "sweetalert2";

const CartItems = ({changeTotal , setChangeTotal}) => {
    const [cartItems , setCartItems] = useState([]);
    const [loading , setLoading] = useState(true);

    // untuk get user id from localstorage
    let idUser = JSON.parse(localStorage.getItem("idUser"));

    // ambil data cart dari api cart
    useEffect(() => {
        axios.get(`http://localhost:3001/user/cart?userId=${idUser}`)
        .then((response) => {
            console.log(response.data);
            setCartItems(response.data)
            setLoading(false);
        })
    } , [])

    const deleteData = (id) => {
        axios.delete('http://localhost:3001/user/cart/' , {
            data: {
                userId: idUser,
                itemId: id,
            }
        })
        .then(response => {
            swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Product berhasil dihapus dari cart'
            })
            setCartItems(response.data.cartItems)
            setLoading(false);
            if (changeTotal) {
                setChangeTotal(false)
            } else {
                setChangeTotal(true)
            }
        })
        .catch((error) => console.log(error))
    }

    if(loading) return <div></div>;
    
    return (
        <div>
            {
                loading ? (
                    <span>Loading ...</span>
                ) : (
                    cartItems.length === 0 ? (
                        <span>Cart masih kosong</span>
                    ) : (
                        cartItems.map((item) => {
                            return (
                                <ItemCard 
                                    item={item}
                                    handleDelete={(idValue) => deleteData(idValue)}
                                    changeTotal={changeTotal}
                                    setChangeTotal={setChangeTotal}
                                />
                            )
                        })
                    )
                )
            }
        </div>
    )
}

export default CartItems
