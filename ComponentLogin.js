import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComponentRequest from './ComponentRequest';


function ComponentLogin() {
    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [registered, setRegistered] = useState(false)
    const [login, setLogin] = useState(false)
    return(
        
        <div>
            {!registered ? <div>
                <h3>Register</h3>
            <label style={{
                textAlign: 'left'
            }}>User</label><br/>
            <input type='text' name='user' placeholder='User' value={user} onChange={(event) => {setUser(event.currentTarget.value)}}/>
            <br/><br/>
            <label>Password</label><br/>
            <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' value={pass} onChange={(event) => {setPass(event.currentTarget.value)}} /><br/><br/>
            {/* <button onClick={() => {setShowPassword(!showPassword)}}>Show Password</button> */}
            <button
                onClick={() => {
                    axios.post(`http://localhost:9735/api/user/`, {username: user, email: 'something@gkas.re', password: pass})
                    .then(response => setRegistered(true))
                    .catch(error => console.log(error))   
                }}
            > 
                Register
            </button>
            <button
                onClick={()=>{
                    setRegistered(true)
                }}
            >
                Login
            </button>
        </div> : 
        <div>
            <h3>Login</h3>
            <label style={{
                textAlign: 'left'
            }}>User</label><br/>
            <input type='text' name='user' placeholder='User' value={user} onChange={(event) => {setUser(event.currentTarget.value)}}/>
            <br/><br/>
            <label>Password</label><br/>
            <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' value={pass} onChange={(event) => {setPass(event.currentTarget.value)}} /><br/><br/>
            <button
                onClick={() => {
                    axios.post(`http://localhost:9735/api/user-login/`, {username: user, password: pass})
                    .then(response => setLogin(true))
                    .catch(error => setLogin(false))   
                }}
            > 
                Login
            </button>
            <button
                onClick={()=>{setRegistered(false)}}
            >
                Register
            </button>
        </div>}
        {login&&<button
          onClick={()=>{
            axios.post('http://localhost:9735/api/user-logout/', {}).then(response => console.log(response)).catch(error => console.log(error))
            setLogin(false)
          }}
        >
          Logout
        </button>}
        {login&&<ComponentRequest/>}
        </div>
    )
}

export default ComponentLogin
