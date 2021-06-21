import axios from 'axios';
import React, {useState} from 'react'
import {useHistory} from "react-router-dom"
import Swal from "sweetalert2";

const Register = () => {
    const history = useHistory();
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirm, setConfirm] = useState(null);

    function submitRegister(e){
        e.preventDefault();
        if (password === confirm) {
            axios.post('http://localhost:3001/auth/register', {
                email : email,
                password : password,
                username : username,
            })
            .then((user) => {
                if (user.status === 200) {
                    localStorage.setItem("idUser" , JSON.stringify(user.data._id))
                    localStorage.setItem("isLogged" , true);
                    localStorage.setItem("userName" , user.data.username);
                    window.location.href = '/';
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Tidak bisa register'
                })
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password dan Verify Password tidak sama!'
            })
        }
    }

    return (
        <div style={styles.registeContainer}>
            <h2>Register</h2>
            <form style={styles.formRegister} onSubmit={submitRegister}>
                <div style={{display: 'flex', flexDirection: 'column' , width: '100%'}}>
                    <label>Username</label>
                    <input type="text" placeholder="Enter Username" style={styles.input} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column' , width: '100%'}}>
                    <label>Email</label>
                    <input type="email" placeholder="Enter Email" style={styles.input} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column' , width: '100%'}}>
                    <label>Password</label>
                    <input type="password" placeholder="Enter Password" style={styles.input} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column' , width: '100%'}}>
                    <label>Verify Password</label>
                    <input type="password" placeholder="Enter Pasword" style={styles.input} onChange={(e) => setConfirm(e.target.value)} />
                </div>
                <button style={styles.button} type="submit">REGISTER</button>
            </form>
            <p style={{fontSize: '14px'}}>Sudah memiliki akun ? <span style={{fontWeight: 'bold', cursor: 'pointer'}} onClick={() => history.push('/login')} >Login</span></p>
        </div>
    )
}

const styles = {
    registeContainer : {
        maxWidth: '400px',
        height: '80vh',
        margin: '20px auto',
        boxShadow: '0px 0px 10px lightgray',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px',
        boxSizing: 'border-box',
    },

    formRegister: {
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

export default Register
