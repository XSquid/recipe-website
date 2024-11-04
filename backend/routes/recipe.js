const express = require('express')
const router = express.Router()
const recipes = require('../queries/recipe_queries')

router.post('/submit', recipes.addRecipe)
router.get('/all', recipes.getAllRecipes)
router.get('/tags', recipes.getUniqueTags)
router.get('/:id', recipes.getRecipe)

module.exports = router
