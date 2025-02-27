import { React, createElement, useEffect, useState } from "react";
import { db, auth } from '../index.js';
import { GenBtn } from "../Components/Buttons.js";
import { 
    collection, 
    getDocs,
    addDoc,
    query,
    limit,
} from "firebase/firestore";


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
    const [ data, setData ] = useState([]);
    const [ isLoading, setLoading ] = useState(true)
    console.log("TEST: " + window.location.hash.substring(1))

    const getAllComments = async () => {
        const commQuery = query(
            collection(db, 'CommentSections/test/comments'),
            limit(10)
        );
        
        const querySnapshot = await getDocs(commQuery);
        const allComments = [];
        querySnapshot.forEach((comment) => {
            const data = comment.data()
            // const fullEntry = JSON.stringify(comment.data())
            console.log(`ID: ${comment.id} | Msg: ${data.msg}`);
            allComments.push({
                ...data,
                id: comment.id,
            });
            
            setData(allComments)
            setLoading(false)
        });
    }

    const Comment = ({ data }) => {
        const msg = data.msg
        if (data.type == "simon") {
            return createElement(
                'div',
                { className: 'comment' },
                createElement('h1',
                    { className: 'simon-comment-header' },
                    msg
                ),
            );
        } else {
            return createElement(
                'div',
                { className: 'comment' },
                createElement('h1',
                    { className: 'comment-header' },
                    msg
                ),
            );
        }
    }

    useEffect(() => {
        if (isLoading) {
            getAllComments();
        }
      });

    const MapComments = () => isLoading ? <div>Loading...</div> : data.map(e => <Comment data={e} />)

    return (
        <div className="commentSection">
            <h1>Comments</h1>
            <MapComments/> 
        </div>
    )
}

export default CommentSection