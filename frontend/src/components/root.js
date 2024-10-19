import React from "react";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import './css-files/master.css'

export default function Root() {
    return (
        <>
            <Navbar />
            <div className='master'><Outlet /></div>
        </>
    )
}