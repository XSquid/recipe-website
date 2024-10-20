import React, { useState } from 'react';
import axios from './axios';
import { useNavigate } from 'react-router';
import useAuth from './hooks/useAuth';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [errMsg, setErrMsg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', {
                username,
                password
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (response.status === 200) {
                const username = response?.data.username
                const uid = response?.data.uid
                setAuth({ username, uid })
                navigate('/profile')
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.response?.status === 401) {
                setErrMsg('Wrong Password')
            } else {
                setErrMsg('Login Failed')
            }
        }

    }
    return (
        <div>
            <h1>Login</h1>
            <div className='login-form'>
                <p id='err-msg'>{errMsg}</p>
                <form>
                    <div>
                        <label htmlFor="username">Username</label><br />
                        <input
                            id="username"
                            type="text"
                            onChange={event => setUsername(event.target.value)}
                            value={username}
                            autoComplete='off'
                            required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label><br />
                        <input
                            id="password"
                            type="password"
                            onChange={event => setPassword(event.target.value)}
                            value={password}
                            required />
                    </div>
                    <button type="submit" onClick={handleSubmit} className="login-btn">Login</button>
                </form>
            </div>
        </div>
    )
}