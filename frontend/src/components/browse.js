import React from 'react';
import { useState, useEffect } from "react";
import axios from './axios';
import { useNavigate } from 'react-router-dom';
import './css-files/browse.css'


export default function Browse() {

    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate();

    //Navigate to recipe
    const clickHandler = (rid) => {
        navigate(`/recipe/${rid}`)
    }

    //Retrieve all recipe data on page load
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/recipe/all')
            setRecipes(response.data)
        };

        fetchData();
    }, [])


    return (
        <div className='browse-page'>
            <div className='browse-content'>
                <h1>Browse all recipes</h1>
                {recipes.map((item) => (
                    <div key={item.id} className='browse-recipe'><li className='browse-select-recipe' onClick={() => clickHandler(item.id)} >{item.name}</li></div>
                ))}
            </div>


        </div>
    )
}