const { database } = require('../database')
const bcrypt = require("bcrypt");
require('dotenv').config()

const registerUser = (req, res) => {
    const { username, password, confirmPassword } = req.body
    const saltRounds = 13;
    console.log(username, password, confirmPassword);

    if (password === confirmPassword) {

        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                database.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hash], (error, results) => {
                    if (error) {
                        console.log(`Error: ${error.detail}`)
                        res.sendStatus(400)
                        return null
                    }
                    const user_id = (results.rows[0].id)
                    database.query('INSERT INTO users_recipes (uid) VALUES ($1)', [user_id], (error, results) => {
                        if (error) {
                            console.log(`Error: ${error.detail}`)
                            res.sendStatus(400)
                            return null
                        }
                    })
                    console.log(`Created user with username: ${username}`)
                    res.sendStatus(201)
                })
            })
        })
    }
}

const logoutUser = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy();
        console.log('logging out')
      });
      res.sendStatus(202);
}

module.exports = {
    registerUser,
    logoutUser,

}