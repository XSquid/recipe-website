import axios from "../components/axios";

const config = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
};

export const retrieveTags = async () => {
    const response = await axios.get('/recipe/tags')
    return response.data
}

export const getFavourites = async (uid) => {
    const response = await axios.get('/profile/favourites', {withCredentials:true})
    return response.data
}

export const addFavourite = async (id) => {

    const response = await axios.post('/profile/addFavourite',
        {
            id
        },
        config
    )
    return response.data
}

export const removeFavourite = async (id) => {
    const response = await axios.post('/profile/removeFavourite',
        {
            id
        },
        config
    )
    return response.data
}