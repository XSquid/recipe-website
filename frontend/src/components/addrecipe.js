import React from 'react';
import './css-files/addrecipe.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from './axios';

export default function AddRecipe() {

    const [submitSuccess, setSubmitSuccess] = useState('')
    const navigate = useNavigate();

    function sanitize(string) {
        const map = {
            '&': '',
            '<': '',
            '>': '',
            '"': '',
            "'": '',
            "/": '',
        };
        const reg = /[&<>"'/]/ig;
        return string.toString().replace(reg, (match) => (map[match]));
    }

    const submitRecipe = async (e) => {
        e.preventDefault();

        //Need to make a more robust check for if everything is good to submit
        var recipe_name = sanitize(document.getElementById('recipe_name').value)
        var ingredients = sanitize(document.getElementById('ingredients').value).split('\n')
        var steps = sanitize(document.getElementById('steps').value).split('\n')
        var additional = sanitize(document.getElementById('additional').value).split('\n')
        var tags = sanitize(document.getElementById('tags').value).split('\n')

        if (recipe_name.length > 1 && ingredients.length > 1 && steps.length > 1 && tags.length >= 1) {
            e.currentTarget.disabled = true;
            const response = await axios.post('/submitrecipe',
                {
                    recipe_name,
                    ingredients,
                    steps,
                    additional,
                    tags
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(response)
            if (response.status === 201) {
                setTimeout(function () {
                    setSubmitSuccess('Submitting recipe...')
                    setTimeout(function () {
                        setSubmitSuccess('Recipe submitted for review!')
                        setTimeout(function () {
                            navigate('/profile')
                        }, 2000)
                    }, 2000)
                }, 200)
            }

        } else {
            alert('Missing information')
        }

    }

    return (
        <div className='add-recipe'>
            <div className='title-container'>
                <h1 className='title'>Add Recipe</h1>
                <div className='tooltip'>
                    ?
                    <div className='tooltip-text'>
                        <h2>Instructions</h2>
                        <p>Must include recipe name</p>
                        <p>Add a new ingredient, step or tag by hitting Enter and typing on the next line. Do not include - on new line.</p>
                        <p>Example: <br/>
                        2 cups flour <br />
                        1/2 cup sugar <br />
                        tsp salt <br /></p>
                        <p>Must include: <br/>
                        Recipe Name <br/>
                        At least 2 ingredients <br />
                        At least 2 steps <br/>
                        Additiona Instructions not required <br/>
                        At least one tag</p>
                        <p>Examples of tags: chicken, beef, pasta, dinner, lunch, dessert, etc..</p>
                    </div>
                </div>

            </div>


            <div className='add-recipe-form'>
                <h2>{submitSuccess}</h2>
                <form id='addRecipeForm'>

                    <label htmlFor="recipe_name">Recipe Name</label><br />
                    <input id="recipe_name" name="recipe_name" type="text" autoComplete="off" required /><br />

                    <label htmlFor="ingredients">Ingredients</label><br />
                    <textarea id="ingredients" name="ingredients" type="textarea" autoComplete="off" rows='5' required /><br />

                    <label htmlFor="steps">Steps</label><br />
                    <textarea id="steps" name="steps" type="textarea" autoComplete="off" required rows='5' /><br />

                    <label htmlFor="additional">Additional Instructions</label><br />
                    <textarea id="additional" name="additional" type="textarea" autoComplete="off" /><br />

                    <label htmlFor="tags">Tags</label><br />
                    <textarea id="tags" name="tags" type="textarea" autoComplete="off" required rows='2' /><br />

                    <button type="submit" onClick={submitRecipe}>Submit</button>

                </form>
            </div>

        </div>
    )
}