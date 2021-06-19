import React, { useEffect, useState } from 'react'
import axios from "axios"

const Paid = () => {
    const [paidItems , setPaid] = useState([]);
    const [loading , setLoading] = useState(true);

    let user = JSON.parse(localStorage.getItem("dataUser"))

    // useEffect(() => {
    //     axios.get(`http://localhost:3001/user/payment/unpaid?userId=${user._id}`)
    //     .then(response => {
    //         user.unpaidItems = [...response.data]
    //         localStorage.setItem("dataUser" , JSON.stringify(user))
    //         setUnpaid(response.data);
    //         setLoading(false);
    //         console.log(response.data)
    //     })
    // } , [])

    // percobaan pakai api jsonplaceholder
    useEffect(() => {
        axios.get('https://reqres.in/api/users?page=2')
        .then((response) => {
            setPaid(response.data.data);
            setLoading(false);
        })
    } , []) 

    return (
        <div>
            {
                loading ? (
                    <span>Loading ... </span>
                ) : (
                    paidItems.map((data) => {
                        return (
                            <div style={styles.cardProduct}>
                                <img style={{width: '100px' , height: '100px'}} src={data.avatar} alt="" />
                                <div style={{textAlign: 'left', display: 'flex' , flexDirection: 'column' , height: '50px' , justifyContent: 'space-evenly'}}>
                                    <h4> {data.first_name}</h4>
                                    <h4 style={{color: 'salmon'}}> {data.last_name} </h4>
                                </div>
                                <p>Quantity : {data.id}</p>
                            </div>      
                        )
                    })
                )
            }
        </div>
    )
}

const styles = {
    cardProduct : {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        boxShadow: '0px 0px 5px lightgray',
        padding: '10px',
        marginTop: '10px',
        justifyContent: 'space-between'
    }
}

export default Paid
