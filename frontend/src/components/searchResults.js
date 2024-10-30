import React from 'react';
import axios from './axios';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './css-files/searchResults.css'
import BackButton from './backButton';

export default function SearchResults() {

    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const clickHandler = (rid) => {
        navigate(`/recipe/${rid}`)
    }

    useEffect(() => {

        const fetchData = async () => {
            const response = await axios.get(`/search/results${window.location.search}`, { withCredentials: true })
            if (response.data.length > 0) {
                setResults(response.data)
            }
        }

        fetchData();
    }, [])


    return (
        results.length > 0
            ?
            <div className='search-results-page'>
                <BackButton />
                <div className='search-results-content'>
                    <h1>Search Results</h1>
                    {results?.map((item) => (
                        <div key={item.id} className='search-results-recipe'><li onClick={() => clickHandler(item.id)} className='search-results-select-recipe'>{item.name}</li></div>
                    ))}
                </div>
            </div>

            :
            <div className='search-results-page'>
                <BackButton />
                <div className='search-results-content'>
                    <h1>No Results Found</h1>
                </div>

            </div>
    )
}