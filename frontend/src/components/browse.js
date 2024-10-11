import React from 'react';
import { useState, useEffect } from "react";
import axios from './axios';
import { useNavigate } from 'react-router-dom';
import './css-files/browse.css'

export default function Browse() {

    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate();

    const clickHandler = (rid) => {
        navigate(`/recipe/${rid}`)
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/getallrecipes')
            setRecipes(response.data)
        };

        fetchData();
    }, [])


    return (
        <div className='recipe-browse'>
            <h1>List of all recipes</h1>
            {recipes.map((item) => (
                <div key={item.id} onClick={() => clickHandler(item.id)}><span>{item.name}</span></div>
            ))}

        </div>
    )
}