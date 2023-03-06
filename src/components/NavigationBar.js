import React, { useState } from "react";
import { IoIosClose } from "react-icons/io"
import CurrentUser from "./CurrentUser";
import { useNavigate } from "react-router-dom";
import { FaHome } from 'react-icons/fa'

function NavigationBar({setShowNav, user}) {

    const navigate = useNavigate();

    return (
        <div className="left-nav-bar">
            <div className="show-hide-nav-bar" onClick={() => setShowNav(false)}>
                <IoIosClose />
            </div>
            <div className="account">
                <CurrentUser user={user} />
            </div>
            <button onClick={() => navigate("/home")}><FaHome /></button>
            <button onClick={() => navigate("/users")}>Users</button>
            <button onClick={() => navigate("/products")}>Products</button>
            <button onClick={() => navigate("/orders")}>Orders</button>
            <button onClick={() => navigate("/categories")}>Categories</button>
            <button onClick={() => navigate("/deliveries")}>Deliveries</button>
            <button onClick={() => navigate("/settings")}>Settings</button>
        </div>
    )
}

export default NavigationBar;