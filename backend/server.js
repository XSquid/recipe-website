const express = require('express');
const session = require('express-session')
const recipes = require('./queries/recipe_queries')
const accounts = require('./queries/account_queries')
const corsOptions = require('./config/corsOptions')
const credentials = require('./config/credentials')
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
const { database } = require('./database')
const bcrypt = require("bcrypt");
const helmet = require('helmet')

const app = express();
const PORT = 3000;

app.use(helmet());
app.use(session({
    secret: 'meowmeow',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 10 // 10 minutes
    }
}))

//Cors required for cross origin access
//allowedOrigins.js for list of URLs that can directly make calls to server
app.use(credentials)
app.use(cors(corsOptions));

//Body parser required to access req.body
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)


passport.use(new LocalStrategy(function (username, password, done) {
    database.query('SELECT * FROM users WHERE username = $1', [username], (error, user) => {
        if (error) return done(error)
        if (!user.rows[0]) return done(null, false)
        const hash = user.rows[0].password;
        bcrypt.compare(password, hash, function(err, result) {
            if (!result) {
                console.log('Wrong Password')
                return done(null, false)
            } else {
                return done(null, user.rows[0])
            }
        })
    })
}))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    console.log(`Serialize user: ${user.id}`)
    done(null, user.id) //make sure id is same as the column in database
  });

passport.deserializeUser((id, done) => {
    console.log(`Deserialize user: ${id}`)
    database.query('SELECT * FROM users WHERE id = $1', [id], (error, users) => {
        if (error) {
            return done(error)
        }
        done(null, users.rows[0])
    })
})



app.post('/submitrecipe', recipes.addRecipe)
app.get('/getallrecipes', recipes.getAllRecipes)
app.get('/recipe/:id', recipes.getRecipe)
app.get('/recipes', recipes.searchForRecipe)
app.get('/recipes/alltags', recipes.getUniqueTags)
app.get('/profile/favourites', recipes.getFavourites)
app.post('/profile/add', recipes.addFavourite)
app.post('/register/create', accounts.registerUser)
app.post('/login',
    passport.authenticate('local'),
    function (req, res) {
        const uid = req.user.id
        const username = req.user.username
        res.status(200).json({uid, username})
    } 
)
app.post('/logout', accounts.logoutUser)
app.use('/', function (req, res, next) {
    res.send('Homepage')
})


app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);