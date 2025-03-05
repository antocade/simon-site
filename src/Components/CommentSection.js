import { React, createElement, useEffect, useState, cloneElement } from "react";
import { db, auth } from '../index.js';
import { GenBtn } from '../Components/Buttons.js'
import { useForm } from "react-hook-form"
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css"
import { 
    collection, 
    getDocs,
    addDoc,
    query,
    limit,
    orderBy,
} from "firebase/firestore";
import "../styles/commentSection.css"

function CommentSectionTemplate(){
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [ data, setData ] = useState([]);
    const [ isLoading, setLoading ] = useState(true)
    const filename = window.location.hash.substring(1)

    const DefaultComponent = () => {
        const data =[
          {
            userId: '02b',
            comId: '017',
            fullName: 'Lily',
            // userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
            text: 'I think you have a point🤔',
            timestamp: "2024-09-28T10:34:56Z",
            avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
            replies: []
          }
        ]
        return <CommentSection
        currentUser={{
          currentUserId: '01a',
          currentUserImg:
            'https://ui-avatars.com/api/name=Riya&background=random',
          currentUserProfile:
            'https://www.linkedin.com/in/riya-negi-8879631a9/',
          currentUserFullName: 'Riya Negi'
        }}
        logIn={{
          onLogin: ()=>alert("Call login function"),
          signupLink: 'http://localhost:3001/'
        }}
        commentData={data}
        placeholder={"Write a comment..."}
        onSubmitAction={(data) => console.log('check submit, ', data)}
        currentData={(data) => {
          console.log('current data', data)
        }}
      />
    }

    const onSubmit = (msg) => {
        createPost(msg.comment)
    }

    const getAllComments = async () => {
        const commQuery = query(
            collection(db, "CommentSections/" + filename + "/comments"),
            orderBy("date"),
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
        });
        setLoading(false)
    }

    async function createPost(msg) {
        let postDate = new Date().toLocaleString();
    
        try {
            const docRef = await addDoc(collection(db, "CommentSections/" + filename + "/comments"), {
                type: "comment",
                date: postDate, //replace with timestamp
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
                { className: 'card pika animated', id: data.id },
                createElement('h2',
                    { className: 'comment-header' },
                    "Name"
                ),
                createElement('p',
                    { className: 'comment-content' },
                    msg
                )
            );
        } else {
            return createElement(
                'div',
                { className: 'comment', id: data.id },
                createElement('h2',
                    { className: 'comment-header' },
                    "Name"
                ),
                createElement('p',
                    { className: 'coment-content' },
                    msg
                )
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
            <div class="commentSection">
                <h1>Comments</h1>
                {/* Should be input field and a btn appears after clicking into it, but disabled until text written */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input defaultValue="" {...register("comment")}/>
                    <GenBtn type="submit">Comment</GenBtn>
                </form>
                <MapComments/> 
            </div>
            <DefaultComponent/>
        </>
    )
}

export default CommentSectionTemplate