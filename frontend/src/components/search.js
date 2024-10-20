import React from 'react';
import './css-files/search.css'
import { useState } from "react";
import { retrieveTags } from '../functions/getRecipes';

export default function Search() {

    const [search, setSearch] = useState('')
    const [searchBy, setSearchBy] = useState('name')
    const [tagSelect, setTagSelect] = useState(false)
    const [tags, setTags] = useState()

    const changeSearch = (e) => {
        setSearchBy(e.target.value)
    }

    //Render the radio buttons to swap between search types. This is always rendered, so rendered as a function to avoid duplicates in code
    const selectTag = () => {
        return (
            <div className='search-type' onChange={changeSearch}>
                <p>Search by: </p>
                <form>
                    <input type='radio' id='name' name='search-type' value='name' defaultChecked />
                    <label htmlFor='name'>Name</label>
                    <input type='radio' id='tag' name='search-type' value='tag' />
                    <label htmlFor='tag'>Tag</label>
                </form>

            </div>
        )
    }

    //Retrieve tags from server, save them as state under tags
    //If statement/tagSelect/setTagSelect used to make sure request is only sent to server once
    const fetchTagsOnSwap = async () => {
        if (tagSelect === false) {
            const response = await retrieveTags()
            setTags(response)
            setTagSelect(true)
        }
    }

    //Render selectable tags to search by
    const displayTags = () => {
        if (tags) {
            return (
                <div className='search-content'>
                    <form action='/recipes' method='get' name='search'>
                        {tags.map((tag) => (<div key={tag}>
                            <input type='checkbox' id={tag} name='tag' value={tag}></input>
                            <label htmlFor={tag}>{tag}</label>
                            </div>))}
                            <button type='submit'>Search Recipe</button>
                    </form>

                </div>

            )
        }
    }

    //When radio button for tag is clicked, automatically fetch all unique tags from the database
    if (searchBy === 'tag') {
        fetchTagsOnSwap()
    }

    return (
        searchBy === 'name'
            ?
            <div className='search-page'>
                {selectTag()}
                <div className='search-content'>
                    <form action='/recipes' method='get' name='search'>
                        <div>
                            <label htmlFor='recipe-search'>Search for recipes:</label>{search}<br />
                            <input
                                id='recipe-search'
                                name="q"
                                type='search'
                                autoComplete='off'
                                onChange={event => setSearch(event.target.value)}
                                value={search}
                                placeholder='Search for recipes...'
                                required
                            />
                        </div>
                        <button type='submit'>Search Recipe</button>
                    </form>

                </div>
            </div>
            :
            <div className='search-page'>
                {selectTag()}
                {displayTags()}
            </div>

    )
}