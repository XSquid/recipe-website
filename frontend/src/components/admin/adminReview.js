import React from 'react';
import { useState, useEffect } from "react";
import axios from '../axios';
import { useParams } from 'react-router';
import { useNavigate } from "react-router";

export default function AdminReview() {

    const { id } = useParams();
    const [recipe, setRecipe] = useState([])
    const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = useState('')

    const fetchData = async () => {
        const response = await axios.get(`/admin/review/${id}`, { withCredentials: true })
        if (response.data[0].id) {
            setRecipe(response.data)
        }
    }

    const adtInstr = () => {
        let instructions = recipe[0]?.instructions
        instructions = instructions?.slice(2, instructions.length - 2) // Stripping away 2 characters on either side, would be saved in database as {"Instructions"}
        if (instructions?.length > 0) {
            return (<div>
                <h2>Instructions</h2>
                <p>- {instructions}</p>
            </div>
            )
        }
    }

    axios.defaults.withCredentials = true;

    const recipeApprove = async () => {
        const response = await axios.post(`admin/review/approve/${id}`)
        console.log(response)
        if (response.status === 200) {
            setResponseMessage('Recipe Approved')
            setTimeout(function () {
                navigate(-1)
            }, 2000)
        }
    }

    const recipeDeny = async () => {
        const response = await axios.post(`admin/review/deny/${id}`)
        console.log(response)
        if (response.status === 204) {
            setResponseMessage('Recipe Denied')
            setTimeout(function () {
                navigate(-1)
            }, 2000)
        }
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [])

    return (
        recipe[0]?.id
            ?
            <div className='pending-card'>
                {responseMessage}
                <h1>{recipe[0]?.name}</h1>
                <p>Submitted by: {recipe[0]?.submit}</p>
                {recipe[0]?.tags.map((tag) => (
                    <><span key={tag}>- {tag} </span><br /></>
                ))}
                <div>
                    <h2>Ingredients</h2>
                    {recipe[0]?.ingredients.map((item) => (
                        <><span key={item}>- {item}</span><br /></>
                    ))}
                </div>
                <div>
                    <h2>Steps</h2>
                    {recipe[0]?.steps.map((step) => (
                        <><span key={step}>- {step}</span><br /></>
                    ))}
                </div>
                {adtInstr()}
                <button onClick={() => recipeApprove()}>Approve</button>
                <button onClick={() => recipeDeny()}>Deny</button>

            </div>
            :
            <div></div>
    )
}