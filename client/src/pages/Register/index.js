import React, {useState , useEffect} from 'react'
import styled from 'styled-components'
import {useHistory} from "react-router-dom"
import './style.css'

const Register = (props) => {
    const history = useHistory();
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [pesan, setPesan] = useState(null);

    function submitregister(e){
         history.push('/login');
    }

    const Box = styled.div`
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        width: 100%;
        height:300px;
        justify-content: space-evenly;
        box-sizing: border-box;
        flex-direction: row;
        text-align: left;
        @media (max-width: 700px) {
            flex-direction: column;
        }
   `;

    const Box2 = styled.div`
        width :200px
        height : 250px
        box-sizing: border-box;
        border-radius: 10px;
        border-color: #cccccc;
        box-shadow : 0px 8px 10px 0px #D7D7D7;
        border-style: solid;
        padding : 50px;
        margin-bottom : 50px;
    `;

    return (
        <div>
             <Box>
                <div>
                 <h2 style={{
                margin: '30px 0px 30px 100px',
                boxSizing: 'border-box'
               }}>REGISTER</h2>
                    <Box2>
                    <form onSubmit={submitregister} method="post" >
                     <label className="username" htmlFor="username">Username</label><br/>
                        <input className="username" type="username" name="username"  id="username" placeholder="Enter username"/> <br/><br/>
                        <label className="text_email" htmlFor="email-address">Email</label><br/>
                        <input className="email" type="email" name="email-address"  id="email-address" placeholder="Enter email" /> <br/><br/>
                        <label className="text-password" htmlFor="password">Password</label><br/>
                        <input className="password" type="password" name="password"  id="password" placeholder="Enter password"/> <br/><br/>
                        <label className="verify-password" htmlFor="password">Verify Password</label><br/>
                        <input className="password" type="password" name="password"  id="password" placeholder="Enter password"/> <br/><br/>
                        <button type="submit" style={{backgroundColor :'#333', color :'white'}}>REGISTER </button>
                    </form>
                    <p> Sudah memiliki akun? <a href="http://localhost:3000/login"><b>Login</b></a></p>  
                    </Box2>
                </div>
            </Box>
        </div>
        
    )
}

export default Register
