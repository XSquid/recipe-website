import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from '../axios';

export default function Admin() {

    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false)
    const [pendingRecipes, setPendingRecipes] = useState([])


    const checkAdmin = async () => {
        try {
            const check = await axios.get('/admin', { withCredentials: true })
            if (check.status === 200) {
                setAuthenticated(true)
            }
        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response')
                navigate('/')
            } else if (err.response?.status === 403) {
                console.log('Access Forbidden')
                navigate('/')
            } else {
                console.log('Login Failed')
                navigate('/')
            }
        }

    }

    const loadPending = async () => {
        const response = await axios.get('/admin/get_pending', { withCredentials: true })
        setPendingRecipes(response.data)
    }

    const pendingClickHandler = (id) => {
        navigate(`/admin/review/${id}`)
    }

    useEffect(() => {
        checkAdmin();
        loadPending()
        // eslint-disable-next-line
    }, [authenticated])

    return (
        authenticated
            ?
            <div>
                <div className='admin-pending-recipes'>
                    <h1>Recipes for review</h1>
                    {pendingRecipes.map((item) => (
                        <div key={item.id} onClick={() => pendingClickHandler(item.id)}><span>{item.name}</span></div>
                    ))}

                </div>

            </div>
            :
            <div>
                Waiting for authorization
            </div>
    )
}