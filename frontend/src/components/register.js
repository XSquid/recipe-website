import React, { useState } from 'react';
import axios from './axios';
import { useNavigate } from 'react-router';
import './css-files/register.css'

export default function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword && password && username && confirmPassword) {
            const response = await axios.post('/register/create', {
                username,
                password,
                confirmPassword
            })
            if (response.data === 'Created') {
                navigate('/login')
            }
        } else {
            //Change this to a visual display showing password mismatch instead of alert
            alert('Please make sure there is a username, and passwords match')
        }

    }

    return (
        <div className='register-page'>
            <div className='register-form'>

                <form>
                    <h3>Registration</h3>
                    <div>
                        <label htmlFor="username">Username</label><br />
                        <input id="username" name="username" type="text" autoComplete="off" onChange={event => setUsername(event.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label><br />
                        <input id="password" name="password" type="password" autoComplete="off" onChange={event => setPassword(event.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="confirmpassword">Confirm Password</label><br />
                        <input id="confirmpassword" name="confirmpassword" type="text" autoComplete="off" onChange={event => setConfirmPassword(event.target.value)} required />
                    </div>
                    <div>
                        <button type="submit" onClick={handleSubmit}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}