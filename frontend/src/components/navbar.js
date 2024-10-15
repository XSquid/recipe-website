import React from 'react';
import { Link } from 'react-router-dom';
import './css-files/navbar.css'
import LogButton from './logbutton';

export default function Navbar() {


    return (
        <div className='navbar-container'>
            <h1>Recipe Website</h1>
            <div className='navbar'>
                <Link to={'/'}><button>Home</button></Link>
                <LogButton />
                <Link to={'/search'}><button>Search</button></Link>
                <Link to={'/browse'}><button>Browse</button></Link>
                <Link to={'/addrecipe'}><button>Add Recipe</button></Link>
            </div>
        </div>
    )
}

