import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return(
        <div className='home-page'>
            <div className='home-content'>
                <h2>Welcome to the recipe site</h2>
                <p>Click button below to either search for recipes, or create an account and login to save your favourite recipes!</p>
                <Link to='/search'><button>Search recipes</button></Link>
                <Link to='/browse'><button>Browse all recipes</button></Link>
                <Link to='/register'><button>Create Account</button></Link>
                <Link to='/login'><button>Login</button></Link>
            </div>
        </div>
    )
}