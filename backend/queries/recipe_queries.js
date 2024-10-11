const {database} = require('../database')

//Retrieve all recipes
const getAllRecipes = (request, response) => {
    database.query('SELECT * FROM RECIPES', (error, results) => {
        if (error) {
            throw error
        }
        return response.status(200).json(results.rows)
    })
}

//Retrieve single recipe
const getRecipe = (request, response) => {
    const id = parseInt(request.params.id)
    database.query('SELECT * FROM recipes WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//Add recipe to database
//Need to add checks for malicious code
//Need to add checks for duplicates
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

const searchForRecipe = (req, res) => {
    //Search by name
    if (req.query.q) {
        const recipeSearch = `%${req.query.q}%`
        database.query('SELECT * FROM recipes WHERE name ILIKE $1', [recipeSearch], (error, results) => {
            if (error) {
                console.log (`Error: ${error}`)
                res.sendStatus(500)
                return null
            }
            return res.status(200).json(results.rows)
        })
    }
    //Search by tag
    if (req.query.tag) {
        //Need to ensure recipeSearch is an array, when only one tag is provided it is not in an array. Put into array tags and flattened to ensure recipeSearch is always a 1d array
        const recipeSearch = [req.query.tag].flat() 
        console.log(recipeSearch)
        database.query('SELECT * FROM RECIPES WHERE tags @> $1', [recipeSearch], (error, results) => {
            if (error) {
                console.log (`Error: ${error}`)
                res.sendStatus(500)
                return null
            }
            return res.status(200).json(results.rows)
        })
    }
}

//Return all unique tags in database
const getUniqueTags = (req, res) => {
    database.query('SELECT DISTINCT tags FROM recipes', (error, results) => {
        if (error) {
            console.log (`Error: ${error}`)
            response.sendStatus(500)
            return null
        }
        //Results is tags for every column, need to only keep unique tags and flatten array
        function onlyUnique(value, index, array) {
            return array.indexOf(value) === index;
          }
        const tags = []
        results.rows.forEach((ea) => tags.push(ea.tags))
        const flatTags = tags.flat()
        const uniqueTags = flatTags.filter(onlyUnique)
        return res.status(200).json(uniqueTags)
    })
}

module.exports = {
    getAllRecipes,
    addRecipe,
    getRecipe,
    searchForRecipe,
    getUniqueTags
}