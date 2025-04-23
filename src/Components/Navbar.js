import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'; 
import { NavBtn } from "./Buttons";
import { auth } from "../index.js";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
        alert("Successfully signed out")
    }

    const loginBtn = () => {
        setIsOpen(true)
    }

    const switchModal = () => {
        setIsOpen(!isOpen)
        setSignUp(!isSignUp)
    }

    const onLogin = (props) => {
        if (props.login_email == "" || props.login_pass == "") {
            alert("Fill all fields")
        } else {
            signInWithEmailAndPassword(auth, props.login_email, props.login_pass)
            .then((userCredential) => {
                console.log(userCredential.user.displayName)
                alert("Successfully logged in!")
                close()
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, ": ", errorMessage);
            })
        } 
    }

    const onSignup = (props) => {
        if (props.sign_email == "" || props.sign_pass == "" || props.sign_user == "") {
            alert("Fill all fields")
        } else {
            try {
                if (props.user == "simon" || props.user == "Simon" || props.user == "Simon Stanton" || props.user == "simon Stanton" || props.user == "Simon stanton") {
                    throw new Error("Invalid username")
                } else {
                    createUserWithEmailAndPassword(auth, props.sign_email, props.sign_pass)
                    .then((userCredential) => {
                        // Signed up 
                        const user = userCredential.user;
                        
                        updateProfile(auth.currentUser, {
                            displayName: props.sign_user
                        }).then(() => {
                            alert("Successfully created account!")
                            close()
                        }).catch((error) => {
                            console.log(error)
                        });
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
    }

    const keyboardListener = (e) => {
        if (e.key === "Escape") {
            close()
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
            <button onClick={() => {document.querySelector("#sect1").scrollIntoView({block: 'end', behavior: 'smooth'})}} className="navBtn">Home</button>
            <button onClick={() => {document.querySelector("#sect2").scrollIntoView({block: 'end', behavior: 'smooth'})}} className="navBtn">Stories</button>
            <button onClick={() => {document.querySelector("#sect3").scrollIntoView({block: 'end', behavior: 'smooth'})}} className="navBtn">About</button>
            <Conditional isLoggedIn={loginStatus}/>
            <LoginModal isOpen={isOpen}>
                <LoginContent>
                    <span><CloseBtn onClick={close}>&#x2715;</CloseBtn></span>
                    <h2>Login</h2>
                    <form class="loginForm" onSubmit={handleSubmit(onLogin)}>
                        <label>Email</label>
                        <input {...register("login_email")}/>
                        <label>Password</label>
                        <input {...register("login_pass")}/>
                        <br/>
                        <input class="modalSubmit" value="Sign In" type="submit"/>
                        <br/>
                        <br/>
                        <span class="modalSwitch" onClick={switchModal}>Don't have an account?</span>
                    </form>
                </LoginContent>
            </LoginModal>

            <LoginModal isOpen={isSignUp}>
                <LoginContent>
                    <span><CloseBtn onClick={close}>&#x2715;</CloseBtn></span>
                    <h2>Sign Up</h2>
                    <form class="loginForm" onSubmit={handleSubmit(onSignup)}>
                        <label>Username</label>
                        <input {...register("sign_user")}/>
                        <label>Email</label>
                        <input {...register("sign_email")}/>
                        <label>Password</label>
                        <input {...register("sign_pass")}/>
                        <br/>
                        <input class="modalSubmit" value="Sign Up" type="submit"/>
                        <br/>
                        <br/>
                        <span class="modalSwitch" onClick={switchModal}>Or log in</span>
                    </form>
                </LoginContent>
            </LoginModal>
        </div>
    )
}

export default Navbar