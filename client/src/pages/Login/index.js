import React, {useState , useEffect} from 'react'
import {useHistory} from "react-router-dom"
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    function submitLogin(e){
        e.preventDefault();

        if (email === "admin@gmail.com" && password === "admin") {
            localStorage.setItem("admin" , true)
            window.location.href = "/adminpage"
        }

        axios.post('http://localhost:3001/auth/login' , {
            email   : email,
            password : password,
        })
        .then((user) => {
            if (user.status === 200) {
                localStorage.setItem("idUser" , JSON.stringify(user.data._id))
                localStorage.setItem("userName" , user.data.username)
                localStorage.setItem("userCart" , JSON.stringify(user.data.cartItems))
                localStorage.setItem("isLogged" , true);
                window.location.href = '/';
            } 
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email / Password salah!'
            })
        })
    }

    return (
        <div style={styles.loginContainer}>
            <h2>Login</h2>
            <form style={styles.formLogin} onSubmit={submitLogin}>
                <div style={{display: 'flex', flexDirection: 'column' , width: '100%'}}>
                    <label>Email</label>
                    <input type="email" placeholder="Enter Email" style={styles.input} onChange={(e) => setEmail(e.target.value)} autoComplete/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column' , width: '100%'}}>
                    <label>Password</label>
                    <input type="password" placeholder="Enter Password" style={styles.input}  onChange={(e) => setPassword(e.target.value)} autoComplete/>
                </div>
                <button style={styles.button} type="submit">LOGIN</button>
            </form>
            <p style={{fontSize: '14px'}}>Belum memiliki akun ? <span style={{fontWeight: 'bold', cursor: 'pointer'}} onClick={() => history.push('/register')} >Register</span></p>
        </div>
    )
}

const styles = {
    loginContainer : {
        maxWidth: '400px',
        height: '50vh',
        margin: '20px auto',
        boxShadow: '0px 0px 10px lightgray',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px',
        boxSizing: 'border-box',
    },

    formLogin: {
        display: 'flex',
        width: '70%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    input: {
        margin: '3px 0px', 
        boxSizing: 'border-box',
        padding: '5px',
    },

    button: {
        backgroundColor :'#333', 
        color :'white', 
        padding: '5px', 
        boxSizing: 'border-box', 
        cursor: 'pointer', 
        width: '100%',
    }
}

export default Login
