import React from "react";
import Navbar from '../Components/Navbar';
import '../styles/global.css';
import '../styles/login.css';
function Login(){
    return(
        <div className="App">
            <Navbar></Navbar>
            <div className="LoginPage">
                <div className="Box">
                    <h1>Welcome Back!</h1>
                    <input type="text" id="User" className="User" placeholder="Username"></input>
                    <input type="text" id="Pass" className="Pass" placeholder="Password"></input>
                </div>
            </div>
        </div>
    )
}

export default Login