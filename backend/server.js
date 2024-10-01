const express = require('express');
const session = require('express-session')
const recipes = require('./queries/recipe_queries')
const corsOptions = require('./config/corsOptions')
const credentials = require('./config/credentials')
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(session({
    secret: 'meowmeow',
    resave: false,
    saveUninitialized: true,
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

app.post('/submitrecipe', recipes.addRecipe)
app.get('/getallrecipes', recipes.getAllRecipes)

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