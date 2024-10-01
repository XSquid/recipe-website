const {database} = require('../database')

const getAllRecipes = (request, response) => {
    database.query('SELECT * FROM RECIPES', (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows)
        return response.status(200).json(results.rows)
    })
}

const addRecipe = (request, response) => {
    const {recipe_name, ingredients, steps, additional, tags} = request.body

    database.query('INSERT INTO recipes (name, ingredients, steps, instructions, tags) VALUES ($1, $2, $3, $4, $5)',
        [recipe_name, ingredients, steps, additional, tags], (error, results) => {
            if (error) {
                console.log(`Error: ${error}`)
                response.sendStatus(500)
                return null
            }
            console.log('Recipe Added')
        }
    )
}

module.exports = {
    getAllRecipes,
    addRecipe
}