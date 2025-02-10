import { React, useState } from "react";
import '../styles/global.css';
import Navbar from '../Components/Navbar';
import { Gen_Btn } from "../Components/Buttons.js";
import { db, auth } from '../index.js';
import { useForm } from "react-hook-form"
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

function importAllStories(r) {
    let files = {};
    r.keys().map((item, index) => { files[item.replace('./', '')] = r(item); });
    return files;
  }
  
const stories = importAllStories(require.context('../story-upload', false, /\.(pdf)$/));

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

function Blog(){
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    
    const signIn = (data) => {
        console.log(data)
        //   console.log(watch("example")) // watch gets input realtime
        let email = data.email;
        let pass = data.password;

        signInWithEmailAndPassword(auth, email, pass)
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

    const searchBar = (data) => {
        //actually search
    }

    const searchElement = watch("toSearch");
    // console.log(watch("toSearch"))
    return(
        <>
            <Navbar></Navbar>
            <div>
                <form onSubmit={handleSubmit(searchBar)}>
                    <input defaultValue="" {...register("toSearch")} />
                    {/* <input type="submit" /> */}
                </form>
            </div>

            <div>
                {searchElement ? (
                <>
                    input: {searchElement}
                </>
                ) : (
                ""
                )}
            </div>

            <h1>DB Test</h1>
            <p>View in console, check posts on Firebase</p>
            <div>
                <Gen_Btn onClick={getAllPosts}>List Posts</Gen_Btn>
            </div>
            <div>
                <Gen_Btn theme="red" onClick={createPost}>Create Post</Gen_Btn>
            </div>
            <div>
            <form onSubmit={handleSubmit(signIn)}>
            <input defaultValue="" {...register("email", { required: true})} />

            <input {...register("password", { required: true })} />
            {errors.email && <span>This field is required</span>}
            {errors.password && <span>This field is required</span>}

            <input type="submit" />
            </form>
            </div>
        </>
    )
}

export default Blog