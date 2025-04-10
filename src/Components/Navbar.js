import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'; 
import { NavBtn } from "./Buttons";
import { auth } from "../index.js";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { LoginModal, LoginContent, CloseBtn } from "../Components/Modals.js"
import { useForm } from "react-hook-form"

function Navbar(){
    const [ loginStatus, setLoginStatus ] = useState()
    const [ isOpen, setIsOpen ] = useState(false)
    const [ isSignUp, setSignUp ] = useState(false)
      
    const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
        } = useForm()

    const Conditional = (props) => {
        const isLoggedIn = props.isLoggedIn;
        if (isLoggedIn) {
            return <NavBtn onClick={logoutBtn}>Logout</NavBtn>
        } else {
            return <NavBtn onClick={loginBtn}>Login</NavBtn>
        }
    }

    const close = () => {
        setIsOpen(false);
        setSignUp(false)
    }

    const logoutBtn = () => {
        auth.signOut();
        //throw up a "signed out" modal
    }

    const loginBtn = () => {
        setIsOpen(true)
    }

    const switchModal = () => {
        setIsOpen(!isOpen)
        setSignUp(!isSignUp)
    }

    const onLogin = (props) => {
        signInWithEmailAndPassword(auth, props.email, props.pass)
            .then((userCredential) => {
                console.log(userCredential.user.displayName)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, ": ", errorMessage);
            })

        setIsOpen(false)
    }

    const onSignup = (props) => {
        //
    }

    const keyboardListener = (e) => {
        if (e.key === "Escape") {
            setIsOpen(false)
            setSignUp(false)
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
                    <form class="loginForm" onSubmit={handleSubmit(onLogin)}>
                        {/* <input defaultValue="" {...register("toSearch")} /> */}
                        <input {...register("email", {required: true})}/>
                        <input {...register("pass", {required: true})}/>
                        {errors.email && <span>This field is required</span>}
                        {errors.pass && <span>This field is required</span>}
                        <br/>
                        <input type="submit"/>
                        <br/>
                        <br/>
                        <span onClick={switchModal}>Sign up?</span>
                    </form>
                </LoginContent>
            </LoginModal>

            <LoginModal isOpen={isSignUp}>
                <LoginContent>
                    <CloseBtn onClick={close}>X</CloseBtn>
                    <form class="loginForm" onSubmit={handleSubmit(onSignup)}>
                        {/* <input defaultValue="" {...register("toSearch")} /> */}
                        <input {...register("email", {required: true})}/>
                        <input {...register("pass", {required: true})}/>
                        <input {...register("user", {required: true})}/>
                        {errors.email && <span>This field is required</span>}
                        {errors.pass && <span>This field is required</span>}
                        {errors.user && <span>This field is required</span>}
                        <br/>
                        <input type="submit"/>
                        <br/>
                        <br/>
                        <span onClick={switchModal}>Or log in</span>
                    </form>
                </LoginContent>
            </LoginModal>
        </div>
    )
}

export default Navbar