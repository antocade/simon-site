import React from "react";
import { NavLink } from 'react-router-dom'; 

function Navbar(){
    return (
        <div class="topnav">
          <h1>SIMONSITE</h1>
          <NavLink exact to="/home" className="nav-link" activeClassName="active">Home</NavLink>
          <NavLink to="/blog" className="nav-link" activeClassName="active">Blog</NavLink>
          <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
        </div>
    )
}

export default Navbar