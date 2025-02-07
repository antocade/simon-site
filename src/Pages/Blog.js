import {
    React,
    useState,
} from "react";
import '../styles/global.css';
import Navbar from '../Components/Navbar';
import { Gen_Btn } from "../Components/Buttons.js";

import { db, auth } from '../index.js';
import { 
    collection, 
    doc,
    getDocs,
    addDoc,
    query,
    limit, 
    where,
    getFirestore, 
    orderBy
} from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


async function getAllPosts() {
    const postsQuery = query(
        collection(db, 'posts'),
        limit(10)
    );

    const querySnapshot = await getDocs(postsQuery);
    querySnapshot.forEach((post) => {
        console.log(`Post Name: ${post.id} | Post Data: ${JSON.stringify(post.data())}`);
    });
}

async function createPost() {
    let postDate = new Date().toLocaleString();

    try {
        const docRef = await addDoc(collection(db, "comments"), {
            type: "comment",
            date: postDate,
            msg: "test"
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Not working yet
function createAccount(formData) {
    let email = formData.get("email");
    let password = formData.get("password")

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        //etc
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}

function Blog(){

    // function SignInForm() {
        const [inputs, setInputs] = useState({});

        const formHandler = (event) => {
            const email = event.target.email;
            const password = event.target.password;
            setInputs(values => ({...values, [email]: password}))
        }
        
        const signIn = (event) => {
            event.preventDefault();
            let email = inputs.email;
            let password = inputs.password;
        
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("Logged in!");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, ": ", errorMessage);
                })
        }
    // }

    return(
        <>
            <Navbar></Navbar>
            <h1>Siiiiick DB Test</h1>
            <p>View in console, check posts on Firebase</p>
            <div>
                <Gen_Btn onClick={getAllPosts}>List Posts</Gen_Btn>
            </div>
            <div>
                <Gen_Btn theme="red" onClick={createPost}>Create Post</Gen_Btn>
            </div>
            <div>
                <form onSubmit={signIn}>
                    <label>email:
                    <input type ="text" name="email" value={inputs.email || ""} onChange={formHandler}/>
                    </label>
                    <label>password:
                    <input type ="text" name="password" value={inputs.password || ""} onChange={formHandler}/>
                    </label>
                    <input type="submit" />
                </form>
            </div>

        </>
    )
}

export default Blog