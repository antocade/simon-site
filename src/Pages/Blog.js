import {
    React,
} from "react";
import styled from 'styled-components';
import Navbar from '../Components/Navbar';
import '../styles/global.css';

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


const theme = {
    blue: {
        default: "#0065fc",
        hover: "#448efc",
    },
    red: {
        default: "#fc1303",
        hover: "#fa5246"
    },
};

const Button = styled.button`
    background-color: ${(props) => theme[props.theme].default};
    padding: 5px 10px;
    &:hover {
        background-color: ${(props) => theme[props.theme].hover};
    };
`

Button.defaultProps = {
    theme: "blue",
}

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
                <Button onClick={getAllPosts}>List Posts</Button>
            </div>
            <div>
                <Button theme="red" onClick={createPost}>Create Post</Button>
            </div>
        </>
    )
}

export default Blog