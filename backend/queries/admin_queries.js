require('dotenv').config()
const { database } = require('../database')

const checkAdmin = (req, res, next) => {
    const username = req.user?.username
    const admin = process.env.SITE_ADMIN
    if (username === admin) {
        next()
    } else (
        res.sendStatus(403)
    )
}

const getAllPending = (req, res) => {
    database.query('SELECT * FROM pending', (error, results) => {
        if (error) {
            throw error
        }
        return res.status(200).json(results.rows)
    })
}

const getPendingByID = (req, res) => {
    const id = parseInt(req.params.id)
    database.query('SELECT * FROM pending WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const denyPendingRecipe = (req, res) => {
    const id = parseInt(req.params.id)
    database.query('INSERT INTO denied_recipes SELECT * FROM pending WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        database.query('DELETE FROM pending WHERE id = $1', [id], (error, results) => {
            if (error) {
                throw error
            }
            res.sendStatus(204)
        })
    })
}

const approvePendingRecipe = (req, res) => {
    const id = parseInt(req.params.id) 
    database.query('INSERT INTO recipes (name, ingredients, steps, additional_steps, instructions, tags) SELECT name, ingredients, steps, additional_steps, instructions, tags FROM pending WHERE id = $1 RETURNING *', [id], (error, results) => {
        if (error) {
            throw error
        }
        console.log(`Added recipe ID: ${results.rows[0].id} with name ${results.rows[0].name} to recipes database`)
        database.query('DELETE FROM pending WHERE id = $1', [id], (error, results) => {
            if (error) {
                throw error
            }
  
            res.sendStatus(200)
        })
    })
}

module.exports = {
    checkAdmin,
    getAllPending,
    getPendingByID,
    approvePendingRecipe,
    denyPendingRecipe
}
