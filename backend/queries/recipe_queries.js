const {database} = require('../database')

const getAllRecipes = (request, response) => {
    database.query('SELECT * FROM RECIPES', (error, results) => {
        if (error) {
            throw error
        }
        return response.status(200).json(results.rows)
    })
}

const getRecipe = (request, response) => {
    const id = parseInt(request.params.id)
    database.query('SELECT * FROM recipes WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
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
            return response.status(201)
        }
    )
}

const searchByName = (req, res) => {
    const recipeSearch = `%${req.query.q}%`
    database.query('SELECT * FROM recipes WHERE name ILIKE $1', [recipeSearch], (error, results) => {
        if (error) {
            console.log (`Error: ${error}`)
            response.sendStatus(500)
            return null
        }
        console.log(results.rows)
        return res.status(200).json(results.rows)
    })
}

module.exports = {
    getAllRecipes,
    addRecipe,
    getRecipe,
    searchByName
}