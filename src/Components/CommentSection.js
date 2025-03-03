import { React, createElement, useEffect, useState } from "react";
import { db, auth } from '../index.js';
import { GenBtn } from '../Components/Buttons.js'
import { useForm } from "react-hook-form"
import { 
    collection, 
    getDocs,
    addDoc,
    query,
    limit,
} from "firebase/firestore";

function CommentSection(){
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [ data, setData ] = useState([]);
    const [ isLoading, setLoading ] = useState(true)
    const filename = window.location.hash.substring(1)

    const onSubmit = (msg) => {
        createPost(msg.comment)
    }

    const getAllComments = async () => {
        const commQuery = query(
            collection(db, "CommentSections/" + filename + "/comments"),
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

    async function createPost(msg) {
        let postDate = new Date().toLocaleString();
    
        try {
            const docRef = await addDoc(collection(db, "CommentSections/" + filename + "/comments"), {
                type: "comment",
                date: postDate,
                msg: msg
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const Comment = ({ data }) => {
        const msg = data.msg
        if (data.type == "simon") {
            return createElement(
                'div',
                { className: 'comment' },
                createElement('h3',
                    { className: 'simon-comment-header' },
                    msg
                ),
            );
        } else {
            return createElement(
                'div',
                { className: 'comment' },
                createElement('h3',
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
        <>
            <div className="commentSection">
                <h1>Comments</h1>
                {/* Should be input field and a btn appears after clicking into it, but disabled until text written */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input defaultValue="" {...register("comment")}/>
                    <GenBtn type="submit">Comment</GenBtn>
                </form>
                <MapComments/> 
            </div>
        </>
    )
}

export default CommentSection