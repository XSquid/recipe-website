import React from "react";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
        <Navbar />
        <Outlet />
        </>
    )
}