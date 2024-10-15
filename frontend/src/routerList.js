import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Root from './components/root';
import Search from './components/search';
import Login from './components/login';
import Home from './components/home';
import Register from './components/register';
import Browse from './components/browse';
import Profile from './components/profile';
import AddRecipe from './components/addrecipe';
import Recipe from './components/recipe';
import Recipes from './components/recipes';
import RequireAuth from './components/hooks/requireAuth';

export const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Root />}>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<RequireAuth />}>
            <Route path='/profile' element={<Profile />} />
        </Route>

        <Route path='/browse' element={<Browse />} />
        <Route path='/addrecipe' element={<AddRecipe />} />
        <Route path='/recipe/:id' element={<Recipe />} />
        <Route path='/recipes/' element={<Recipes />} />
    </Route>

))

