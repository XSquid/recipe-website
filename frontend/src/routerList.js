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
import SearchResults from './components/searchResults';
import RequireAuth from './components/hooks/requireAuth';
import Admin from './components/admin/admin';
import AdminReview from './components/admin/adminReview';

export const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Root />}>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/search/results' element={<SearchResults />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<RequireAuth />}>
            <Route path='/profile' element={<Profile />} />
        </Route>

        <Route element={<RequireAuth />}>
            <Route path='/addrecipe' element={<AddRecipe />} />
        </Route>

        <Route element={<RequireAuth />}>
            <Route path='/admin' element={<Admin />} />
            <Route path='/admin/review/:id' element={<AdminReview />} />
        </Route>

        <Route path='/browse' element={<Browse />} />
        <Route path='/recipe/:id' element={<Recipe />} />

    </Route>

))

