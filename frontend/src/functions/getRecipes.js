import axios from "../components/axios";


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