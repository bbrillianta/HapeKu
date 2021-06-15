import React, { useState } from 'react'
import axios from "axios";
import ItemCard from "./ItemCard";
import swal from "sweetalert2";

const CartItems = ({changeTotal , setChangeTotal}) => {
    const [cartItems , setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // get user id from localstorage
    let user = JSON.parse(localStorage.getItem("dataUser"));

    const deleteData = (id) => {
        axios.delete('http://localhost:3001/user/cart/' , {
            data: {
                userId: user._id,
                itemId: id,
            }
        })
        .then(response => {
            swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Product berhasil dihapus dari cart'
            })
            localStorage.setItem("dataUser" , JSON.stringify(response.data));
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
                user.cartItems.length === 0 ? (
                    <span>Cart masih kosong</span>
                ) : (
                    user.cartItems.map((item) => {
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
            }
        </div>
    )
}

export default CartItems
