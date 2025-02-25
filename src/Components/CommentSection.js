import React from "react";
import { db, auth } from '../index.js';
import { GenBtn } from "../Components/Buttons.js";
import { 
    collection, 
    getDocs,
    addDoc,
    query,
    limit,
} from "firebase/firestore";

async function getAllPosts() {
    const commQuery = query(
        collection(db, 'comments'),
        limit(10)
    );

    const querySnapshot = await getDocs(commQuery);
    querySnapshot.forEach((comment) => {
        const data = comment.data()
        // const fullEntry = JSON.stringify(comment.data())
        console.log(`ID: ${comment.id} | Msg: ${data.msg}`);
    });
}

// async function createPost() {
//     let postDate = new Date().toLocaleString();

//     try {
//         const docRef = await addDoc(collection(db, "comments"), {
//             type: "comment",
//             date: postDate,
//             msg: "test"
//         });
//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// }


function CommentSection(){
    return (
        <div>
            <h1>Comments</h1>
            <div>
                <GenBtn onClick={getAllPosts}>List Posts</GenBtn>
            </div>
        </div>
    )
}

export default CommentSection