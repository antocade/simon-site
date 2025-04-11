import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'; 
import { NavBtn } from "./Buttons";
import { auth } from "../index.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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

    //Need indication of succesful login
    const onLogin = (props) => {
        signInWithEmailAndPassword(auth, props.email, props.pass)
            .then((userCredential) => {
                console.log(userCredential.user.displayName)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, ": ", errorMessage);
            })

        close()
    }

    //Need indication of succesful signup
    const onSignup = (props) => {
        try {
            if (props.user == "simon" || props.user == "Simon" || props.user == "Simon Stanton" || props.user == "simon Stanton" || props.user == "Simon stanton") {
                throw new Error("Invalid username")
            } else {
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, props.email, props.pass)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    
                    updateProfile(auth.currentUser, {
                        displayName: props.user
                    }).then(() => {
                        // Profile updated!
                        // ...
                    }).catch((error) => {
                        console.log(error)
                    });

                    close()
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorCode, ": ", errorMessage)
                    // ..
                });
            }
        } catch (e) {
            alert("Invalid username")
            
        }
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
                    <span><CloseBtn onClick={close}>&#x2715;</CloseBtn></span>
                    <h2>Login</h2>
                    <form class="loginForm" onSubmit={handleSubmit(onLogin)}>
                        <label>Email</label>
                        <input {...register("email", {required: true})}/>
                        <label>Password</label>
                        <input {...register("pass", {required: true})}/>
                        {errors.email && <span>This field is required</span>}
                        {errors.pass && <span>This field is required</span>}
                        <br/>
                        <input id="modalSubmit" value="Sign In" type="submit"/>
                        <br/>
                        <br/>
                        <span id="modalSwitch" onClick={switchModal}>Don't have an account?</span>
                    </form>
                </LoginContent>
            </LoginModal>

            <LoginModal isOpen={isSignUp}>
                <LoginContent>
                    <span><CloseBtn onClick={close}>&#x2715;</CloseBtn></span>
                    <h2>Sign Up</h2>
                    <form class="loginForm" onSubmit={handleSubmit(onSignup)}>
                        <label>Username</label>
                        <input {...register("user", {required: true})}/>
                        <label>Email</label>
                        <input {...register("email", {required: true})}/>
                        <label>Password</label>
                        <input {...register("pass", {required: true})}/>
                        {errors.email && <span>This field is required</span>}
                        {errors.pass && <span>This field is required</span>}
                        {errors.user && <span>This field is required</span>}
                        <br/>
                        <input id="modalSubmit" value="Sign Up" type="submit"/>
                        <br/>
                        <br/>
                        <span id="modalSwitch" onClick={switchModal}>Or log in</span>
                    </form>
                </LoginContent>
            </LoginModal>
        </div>
    )
}

export default Navbar