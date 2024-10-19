import axios from "../components/axios";

const config = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
};


export const submitRecipe = async (e) => {
    e.preventDefault();
    //Need to make a more robust check for if everything is good to submit
    var recipe_name = document.getElementById('recipe_name').value
    var ingredients = document.getElementById('ingredients').value.split('\n')
    var steps = document.getElementById('steps').value.split('\n')
    var additional = document.getElementById('additional').value.split('\n')
    var tags = document.getElementById('tags').value.split('\n')
    console.log(recipe_name.length)
    console.log(ingredients.length)
    console.log(steps.length)
    console.log(ingredients.length)
    if (recipe_name.length > 1 && ingredients.length > 1 && steps.length > 1 && tags.length >= 1) {
        const response = await axios.post('/submitrecipe',
            {
                recipe_name,
                ingredients,
                steps,
                additional,
                tags
            }
        )
        console.log(response)

    } else {
        alert('Missing information')
    }

}

export const retrieveTags = async () => {
    const response = await axios.get('/recipes/alltags')
    return response.data
}

export const getFavourites = async (uid) => {
    const response = await axios.get('/profile/favourites', {withCredentials:true})
    return response.data
}

export const addFavourite = async (id) => {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await axios.post('/profile/add',
        {
            id
        },
        config
    )
    return response.data
}