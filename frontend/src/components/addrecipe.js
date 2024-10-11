import React from 'react';
import './css-files/addrecipe.css'
import { submitRecipe } from '../functions/getRecipes';


export default function AddRecipe() {

    return (
        <div className='add-recipe'>
            <h1>Add Recipe</h1>
            <form id='addRecipeForm'>

                <label htmlFor="recipe_name">Recipe Name</label><br />
                <input id="recipe_name" name="recipe_name" type="text" autoComplete="none" required /><br />

                <label htmlFor="ingredients">Ingredients</label><br />
                <textarea id="ingredients" name="ingredients" type="textarea" autoComplete="none" required /><br />

                <label htmlFor="steps">Steps</label><br />
                <textarea id="steps" name="steps" type="textarea" autoComplete="none" required /><br />

                <label htmlFor="additional">Additional Instructions</label><br />
                <textarea id="additional" name="additional" type="textarea" autoComplete="none" /><br />

                <label htmlFor="tags">Tags</label><br />
                <textarea id="tags" name="tags" type="textarea" autoComplete="none" required /><br />

                <button type="submit" onClick={submitRecipe}>Submit</button>

            </form>
        </div>
    )
}