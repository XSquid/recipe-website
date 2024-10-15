import React from 'react';
import { useState, useEffect } from "react";
import axios from './axios';
import { useParams } from 'react-router';
import './css-files/recipe.css'

export default function Recipe() {

    const { id } = useParams();
    const [recipe, setRecipe] = useState([])

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
                <h2>Instructions</h2>
                <p>- {instructions}</p>
            </div>
            )
        }

    }


    return (
        recipe[0]?.id
            ?
            <div className='recipe-card'>
                <h1>{recipe[0]?.name}</h1>
                {recipe[0]?.tags.map((tag) => (
                    <span key={tag}>{tag} </span>
                ))}
                <div>
                    <h2>Ingredients</h2>
                    {recipe[0]?.ingredients.map((item) => (
                        <><span key={item}>- {item}</span><br /></>
                    ))}
                </div>
                <div>
                    <h2>Steps</h2>
                    {recipe[0]?.steps.map((step) => (
                        <><span key={step}>- {step}</span><br /></>
                    ))}
                </div>
                {adtInstr()}

            </div>
            :
            <div></div>

    )
}