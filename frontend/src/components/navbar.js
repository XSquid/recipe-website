import React from 'react';
import { Link } from 'react-router-dom';
import './css-files/navbar.css'
import { useNavigate } from "react-router";
import axios from "./axios";
import useAuth from "./hooks/useAuth";
import AdminButton from './admin/adminButton';

export default function Navbar() {

    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const logoutHandler = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line
        const response = await axios.post('/logout')
        setAuth({})
        navigate('/')
    }


    return (
        <div className='navbar-container'>
            <h1>Recipe Book</h1>
            <div className='navbar'>
                {auth?.uid
                ?
                <>
                    <Link to={'/'}><button>Home</button></Link>
                    <Link to={'/browse'}><button>Browse</button></Link>
                    <Link to={'/search'}><button>Search</button></Link>
                    <Link to={'/profile'}><button>Profile</button></Link>
                    <Link to={'/addrecipe'}><button>Add Recipe</button></Link>
                    <button onClick={logoutHandler}>Log Out</button>
                    <AdminButton />
                    

                </>
                :
                <>
                    <Link to={'/'}><button>Home</button></Link>
                    <Link to={'/register'}><button>Register</button></Link>
                    <Link to={'/login'}><button>Login</button></Link>
                    <Link to={'/browse'}><button>Browse</button></Link>
                    <Link to={'/search'}><button>Search</button></Link>
                </>}
            </div>
        </div>
    )
}
