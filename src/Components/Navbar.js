import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'; 
import { NavBtn } from "./Buttons";
import { auth } from "../index.js";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { LoginModal, LoginContent, CloseBtn } from "../Components/Modals.js"

function Navbar(){
    const [ loginStatus, setLoginStatus ] = useState()
    const [ isOpen, setIsOpen ] = useState(false)
      
    const Conditional = (props) => {
        const isLoggedIn = props.isLoggedIn;
        if (isLoggedIn) {
            return <NavBtn onClick={logout}>Logout</NavBtn>
        } else {
            return <NavBtn onClick={login}>Login</NavBtn>
        }
    }

    const close = () => {
        setIsOpen(false);
    }

    const logout = () => {
        auth.signOut();
    }

    const login = () => {
        setIsOpen(true)
        // let email = prompt("Enter email")
        // let pass = prompt("Enter password")

        // signInWithEmailAndPassword(auth, email, pass)
        //     .then((userCredential) => {
        //         console.log(userCredential.user.displayName)
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         console.log(errorCode, ": ", errorMessage);
        //     })
    }

    const keyboardListener = (e) => {
        if (e.key === "Escape") {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", keyboardListener);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoginStatus(true)
            } else {
                setLoginStatus(false)
            }
        });
    });

    return (
        <div class="topnav">
            <h1>SIMONSITE TEST</h1>
            <NavLink exact to="/simon-site" className="nav-link" activeClassName="active">Home</NavLink>
            <NavLink to="/blog" className="nav-link" activeClassName="active">Blog</NavLink>
            <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
            <Conditional isLoggedIn={loginStatus}/>
            <LoginModal isOpen={isOpen}>
                <LoginContent>
                    <CloseBtn onClick={close}>X</CloseBtn>
                    <p>Test</p>
                </LoginContent>
            </LoginModal>
        </div>
    )
}

export default Navbar