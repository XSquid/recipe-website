const { database } = require('../database')

//Retrieve all recipes
const getAllRecipes = (req, res) => {
    database.query('SELECT * FROM RECIPES ORDER BY name', (error, results) => {
        if (error) {
            throw error
        }
        return res.status(200).json(results.rows)
    })
}

//Retrieve single recipe
const getRecipe = (req, res) => {
    const id = parseInt(req.params.id)
    database.query('SELECT * FROM recipes WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

//Add recipe to pending database
const addRecipe = (req, res) => {

    const uid = req.user?.id
    const submitBy = req.user?.username
    const { recipe_name, ingredients, steps, additional, tags } = req.body

    if (uid) {
        database.query('INSERT INTO pending (name, ingredients, steps, instructions, tags, submit) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [recipe_name, ingredients, steps, additional, tags, submitBy], (error, results) => {
                if (error) {
                    console.log(`Error: ${error}`)
                    res.sendStatus(500)
                    return null
                }
                const recipe = results.rows[0]
                console.log(`Recipe ID ${recipe.id} and name ${recipe.name} has been submitted by user ${recipe.submit}`)
                return res.sendStatus(201)
            }
        )
    } else {
        res.send('No session found')
    }
}

const searchForRecipe = (req, res) => {
    //Search by name
    if (req.query.q) {
        const recipeSearch = `%${req.query.q}%`
        database.query('SELECT * FROM recipes WHERE name ILIKE $1', [recipeSearch], (error, results) => {
            if (error) {
                console.log(`Error: ${error}`)
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
        database.query('SELECT * FROM RECIPES WHERE tags @> $1', [recipeSearch], (error, results) => {
            if (error) {
                console.log(`Error: ${error}`)
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
            console.log(`Error: ${error}`)
            res.sendStatus(500)
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

//Get favourites for user
const getFavourites = (req, res) => {
    const uid = req.user?.id
    if (uid) {
        database.query('SELECT recipes.id, recipes.name, UNNEST(users_recipes.favourites) as rid FROM recipes, users_recipes WHERE users_recipes.uid = $1;', [uid], (error, results) => {
            if (error) {
                console.log(`Error: ${error}`)
                res.sendStatus(500)
                return null
            }
            const data = results.rows
            const returnArray = data.filter((el) => parseInt(el.id) === parseInt(el.rid))
            return res.status(200).json(returnArray)
        })
    } else {
        res.send('No session found')
    }


}


//Add recipe to favourite list for user
const addFavourite = (req, res) => {
    const { id } = req.body
    const uid = req.user?.id
    if (uid) {
        database.query('SELECT * FROM users_recipes WHERE uid = $1', [uid], (error, results) => {
            if (error) {
                console.log(`Error: ${error}`)
                res.sendStatus(500)
                return null
            }

            const data = results.rows[0].favourites
            //Checking if recipe is already saved. If saved, check will be set to true
            let check = false
            if (data !== null) {
                data.forEach(el => {
                    if (el[0] == (id)) {
                        // console.log(`${el[0]} already favourited`)
                        check = true
                    }
                })
            }

            //If recipe is not saved
            let recipeBook
            if (!check) {
                const recipeBookID = results.rows[0].id
                if (data !== null) {
                    recipeBook = data.map(e => [parseInt(e[0])])
                } else {
                    recipeBook = [];
                }
                recipeBook.push([id])
                database.query('UPDATE users_recipes SET favourites = $1 WHERE id = $2', [recipeBook, recipeBookID], (error, results) => {
                    if (error) {
                        console.log(`Error: ${error}`)
                        res.sendStatus(500)
                        return null
                    }
                    // console.log(`Added recipe ID ${id} to recipeBook ${recipeBookID}`)
                    return res.status(201).json(recipeBook)
                })
            }


        })
    }

}

//Remove favourite from users favourite list
const removeFavourite = (req, res) => {
    const { id } = req.body
    const uid = req.user?.id
    if (uid) {
        database.query('SELECT * FROM users_recipes WHERE uid = $1', [uid], (error, results) => {
            if (error) {
                console.log(`Error: ${error}`)
                res.sendStatus(500)
                return null
            }
            var data = results.rows[0].favourites
            const newFavourites = data.filter((fav) => fav != id)
            database.query('UPDATE users_recipes SET favourites = $1 WHERE uid = $2', [newFavourites, uid], (error, results) => {
                if (error) {
                    console.log(`Error: ${error}`)
                    res.sendStatus(500)
                    return null
                }
                // console.log(`Removed recipe ID ${id} from recipe book for user ID ${uid} `)
                return res.status(201).json(newFavourites)
            })
            

        })
    }
}

module.exports = {
    getAllRecipes,
    addRecipe,
    getRecipe,
    searchForRecipe,
    getUniqueTags,
    getFavourites,
    addFavourite,
    removeFavourite
}