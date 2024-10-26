import React from 'react';
import { Link } from 'react-router-dom';
import './css-files/home.css'
import useAuth from './hooks/useAuth';

export default function Home() {

    const { auth } = useAuth();

    const buttonDisplay = () => {
        if (auth.uid) {
            return (
                <div className='home-links'>
                    <Link to='/search'><button>Search recipes</button></Link>
                    <Link to='/browse'><button>Browse all recipes</button></Link>
                </div>
            )
        } else {
            return (
                <div className='home-links'>
                    <Link to='/search'><button>Search recipes</button></Link>
                    <Link to='/browse'><button>Browse all recipes</button></Link>
                    <Link to='/register'><button>Create Account</button></Link>
                    <Link to='/login'><button>Login</button></Link>
                </div>
            )
        }
    }

    return (
        <div className='home-page'>
            <div className='home-content'>
                <h2>Welcome to the recipe site</h2>
                <div className='home-description'>
                    <p>Click button below to either search for recipes, or create an account and login to save your favourite recipes for easy viewing in your profile.</p>
                </div>
                {buttonDisplay()}

            </div>
        </div>
    )
}