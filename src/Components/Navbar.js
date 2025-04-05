import React from "react";
import { NavLink } from 'react-router-dom'; 
import { NavBtn } from "./Buttons";
import { auth } from "../index.js";

const logout = () => {
        auth.signOut();
    }

function Navbar(){
    return (
        <div class="topnav">
          <h1>SIMONSITE TEST</h1>
          <NavLink exact to="/simon-site" className="nav-link" activeClassName="active">Home</NavLink>
          <NavLink to="/blog" className="nav-link" activeClassName="active">Blog</NavLink>
          <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
          <NavBtn onClick={logout}>Logout</NavBtn> 
          {/* Replace above with a switch for signup/login btns or logout button based on auth */}
        </div>
    )
}

export default Navbar