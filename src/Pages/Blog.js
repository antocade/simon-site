import React from "react";
import Navbar from '../Components/Navbar';
import '../styles/global.css';
import { async } from '@firebase/util'
import { db } from '../index.js';

import { 
    collection, 
    doc,
    getDocs,
    query,
    limit, 
    where,
    getFirestore 
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

function Blog(){
    getAllPosts();
    return(
        <Navbar></Navbar>
        
    )
}

export default Blog