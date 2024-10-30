import React from 'react';
import { useState, useEffect } from "react";
import axios from './axios';
import { useParams } from 'react-router';
import './css-files/recipe.css'
import { addFavourite, removeFavourite } from '../functions/getRecipes';
import useAuth from './hooks/useAuth';
import BackButton from './backButton';



export default function Recipe() {

    const { auth, setAuth } = useAuth();
    const { id } = useParams();
    const [recipe, setRecipe] = useState([])
    const [isFavourite, setIsFavourite] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/recipe/${id}`)
            if (response.data[0].id) {
                setRecipe(response.data)
            }
        };

        fetchData();

        // eslint-disable-next-line
    }, [])

    //Render for additional instructions, different from others as it's not saved as array
    const adtInstr = () => {
        let instructions = recipe[0]?.instructions
        instructions = instructions?.slice(2, instructions.length - 2) // Stripping away 2 characters on either side, would be saved in database as {"Instructions"}
        if (instructions?.length > 0) {
            return (<div>
                <h3>Instructions</h3>
                <p>{instructions}</p>
            </div>
            )
        }

    }

    const addHandler = async (id) => {
        const response = await addFavourite(id)
        setAuth({
            username: auth.username,
            uid: auth.uid,
            favouriteRecipes: response
        })
        setIsFavourite(true)
    }

    const removeHandler = async (id) => {
        const response = await removeFavourite(id)
        setAuth({
            username: auth.username,
            uid: auth.uid,
            favouriteRecipes: response
        })
        setIsFavourite(false)
    }

    const favouriteButton = () => {
        if (auth.uid) {
            if ((auth.favouriteRecipes.some(e => e.id === recipe[0]?.id)) || (isFavourite === true)) {
                return (
                    <span className='remove-favourite-button' onClick={() => removeHandler(recipe[0]?.id)}><i className="fa-solid fa-star"></i></span>
                )
            } else {
                return (
                    <span className='add-favourite-button' onClick={() => addHandler(recipe[0]?.id)}><i className="fa-regular fa-star"></i></span>
                )
            }
        }
    }

    return (

        <div className='recipe-page'>
            <BackButton />
            <div className='recipe-card'>
                <div className='recipe-content'>
                    <h1>{recipe[0]?.name} {favouriteButton()}</h1>
                    <h3>Tags</h3>
                    {recipe[0]?.tags.map((tag) => (
                        <><li key={tag}>{tag} </li></>
                    ))}
                    <div>
                        <h3>Ingredients</h3>
                        {recipe[0]?.ingredients.map((item) => (
                            <><li key={item}>{item}</li></>
                        ))}
                    </div>
                    <div>
                        <h3>Steps</h3>
                        {recipe[0]?.steps.map((step) => (
                            <><li key={step}>{step}</li></>
                        ))}
                    </div>
                    {adtInstr()}

                </div>

            </div>
        </div>


    )
}