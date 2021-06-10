import React, {useState , useEffect} from 'react'
import styled from 'styled-components'
import {useHistory} from "react-router-dom"
import './style.css'

const Login = (props) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();
    
    function submitlogin(e){
    	 history.push('/');
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
    `;

    return (
        <div>
            <h2 style={{
                margin: '30px 0px 30px 0px',
                boxSizing: 'border-box'
            }}>LOGIN</h2>
             <Box>
            	<div>
            		<Box2>
	            	<form onSubmit={submitlogin} method="post">
		                <label className="text_email" htmlFor="email-address">Email</label><br/>
				        <input className="email" type="email" name="email-address"  id="email-address" placeholder="Enter email"/> <br/><br/>
				        <label className="text-password" htmlFor="password">Password</label><br/>
				        <input className="password" type="password" name="password"  id="password" placeholder="Enter password"/> <br/><br/>
				        <button type="submit" style={{backgroundColor :'#333', color :'white'}}>LOGIN </button>
				    </form>
				    <p>Belum mempunyai akun? <a href="http://localhost:3000/register"><b>Register</b></a></p>  
                	</Box2>
                </div>
            </Box>
        </div>
        
    )
}

export default Login
