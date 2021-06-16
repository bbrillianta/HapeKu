import React, { useEffect, useState } from 'react'
import axios from "axios"

const Unpaid = () => {
    const [unpaidItems , setUnpaid] = useState([]);
    const [loading , setLoading] = useState(true);

    let user = JSON.parse(localStorage.getItem("dataUser"))

    useEffect(() => {
        axios.get(`http://localhost:3001/user/payment/unpaid?userId=${user._id}`)
        .then(response => {
            setUnpaid(response.data);
            setLoading(false);
        })
    } , [])

    return (
        <div>
            unpaid items
            {
                loading ? (
                    <span>Loading</span>
                ) : (
                    unpaidItems.map((data) => {
                        <div>{data._id}</div>
                    })
                )
            }
        </div>
    )
}

export default Unpaid
