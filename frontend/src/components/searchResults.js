import React from 'react';
import axios from './axios';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function SearchResults() {

    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const clickHandler = (rid) => {
        navigate(`/recipe/${rid}`)
    }

    useEffect(() => {

        const fetchData = async () => {
            const response = await axios.get(`/search/results${window.location.search}`, {withCredentials: true})
            if (response.data.length > 0 ) {
                setResults(response.data)
            } 
        }

        fetchData();
    }, [])


    return (
        results.length > 0
        ?
        <div>
            {results?.map((item) => (
                <div key={item.id} onClick={() => clickHandler(item.id)}><span>{item.name}</span></div>
            ))}
        </div>
        :
        <div>
            No Results Found
        </div>
    )
}