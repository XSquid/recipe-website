const express = require('express')
const router = express.Router()
const recipes = require('../queries/recipe_queries')

router.get('/favourites', recipes.getFavourites)
router.post('/addFavourite', recipes.addFavourite)
router.post('/removeFavourite', recipes.removeFavourite)

module.exports = router


