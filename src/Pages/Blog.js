import {
    React,
} from "react";
import '../styles/global.css';
import Navbar from '../Components/Navbar';
import { Gen_Btn } from "../Components/Buttons.js";

import { db } from '../index.js';
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
        </>
    )
}

export default Blog