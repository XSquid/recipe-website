import React from 'react';
import useAuth from './hooks/useAuth';
import { getFavourites } from '../functions/getRecipes';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import './css-files/profile.css'
import BackButton from './backButton';

export default function Profile() {

    const { auth, setAuth } = useAuth();
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate();
    let preventCount = 0

    const clickHandler = (rid) => {
        navigate(`/recipe/${rid}`)
    }

    const loadFavourites = async () => {
        if (recipes.length === 0) {
            const uid = auth.uid
            const response = await getFavourites(uid);
            if (response === 'No session found') {
                setAuth({})
                navigate('/')
            } else if (preventCount === 0) {
                const favouriteRecipes = response
                setRecipes(favouriteRecipes)
                setAuth({
                    username: auth.username,
                    uid: auth.uid,
                    favouriteRecipes
                })
            }
        }
    }

    useEffect(() => {
        loadFavourites()
        // eslint-disable-next-line
    }, [])

    return (
        <div className='profile-page'>
            <BackButton />
            <div className='profile-content'>
            <h1>Saved Recipes for {auth.username}</h1>
            {recipes?.map((ea) => (<div key={ea.id} ><span className='profile-select-recipe' onClick={() => clickHandler(ea.id)}>{ea.name}</span></div>))}
            </div>
        </div>

    )
}