import React, {useState , useEffect} from 'react'
import {useHistory} from "react-router-dom"

const Register = (props) => {
    const history = useHistory();
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [pesan, setPesan] = useState(null);

    function submitRegister(e){
        e.preventDefault();
        console.log("Berhasil register")
    }

    return (
        <div style={styles.registeContainer}>
            <h2>Register</h2>
            <form style={styles.formRegister} onSubmit={submitRegister}>
                <div style={{display: 'flex', flexDirection: 'column' , width: '100%'}}>
                    <label>Username</label>
                    <input type="text" placeholder="Enter Username" style={styles.input}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column' , width: '100%'}}>
                    <label>Email</label>
                    <input type="email" placeholder="Enter Email" style={styles.input}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column' , width: '100%'}}>
                    <label>Password</label>
                    <input type="password" placeholder="Enter Password" style={styles.input}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column' , width: '100%'}}>
                    <label>Verify Password</label>
                    <input type="password" placeholder="Enter Pasword" style={styles.input}/>
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
