import { React, createElement, useEffect, useState, cloneElement } from "react";
import { db, auth } from '../index.js';
import { GenBtn } from '../Components/Buttons.js'
import { useForm } from "react-hook-form"
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css"
import { 
    collection, 
    doc,
    getDocs,
    addDoc,
    query,
    limit,
    orderBy,
} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../styles/commentSection.css"
import User from '../Components/SessionInfo.js'
import pfp from '../pfp.JPG'

function CommentSectionTemplate(){
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    
    // var userId = null

    const [ data, setData ] = useState([]);
    const [ isLoading, setLoading ] = useState(true)
    const [ userId, setUserId ] = useState()
    const [ specComments, setSpecComments ] = useState(false)
    const filename = window.location.hash.substring(1)

    //TODO
    // - Specify simon type comments styling
    // - create comment on reply/post
    // get name/userId from session
    // move logout btn/add login btn when logged out in place of

    const LogInComponent = () => {
        var cdata = []
        data.forEach((comment) => {
            if (comment.type != "reply") {
                if (comment.type == "simon") {
                    var temp = {
                        userId: 'blank',
                        comId: comment.id,
                        fullName: comment.name,
                        avatarUrl: pfp,
                        text: comment.msg,
                        timestamp: comment.date, //fix, make timestamp
                        replies: [],
                    }
                } else {
                    var temp = {
                        userId: 'blank',
                        comId: comment.id,
                        fullName: comment.name,
                        avatarUrl: `https://ui-avatars.com/api/name=${comment.name}&background=random`,
                        text: comment.msg,
                        timestamp: comment.date, //fix, make timestamp
                        replies: [],
                    }
                }
                //if uid is simon's set picture to his

                if (comment.replies[0] != "") {
                    comment.replies.forEach(async (reply) => {
                        //this should just try and fetch document off id but the firestore docs are annoying
                        data.forEach((entry) => {
                            if (entry.id == reply) {
                                var replyObj = {
                                    userId: 'blank',
                                    comId: entry.id,
                                    fullName: entry.name,
                                    avatarUrl: `https://ui-avatars.com/api/name=${entry.name}&background=random`,
                                    text: entry.msg,
                                    timestamp: entry.date
                                }
                                temp.replies.push(replyObj)
                            }
                        })
                    })
                }
                cdata.push(temp)
            }
            
        })

        return <CommentSection
        //switch currentUser info over to session stuff
            currentUser={userId ? {
            currentUserId: userId,
            currentUserImg:
                'https://ui-avatars.com/api/name=Riya&background=random',
            currentUserProfile:
                'https://www.linkedin.com/in/riya-negi-8879631a9/',
            currentUserFullName: 'Riya Negi'
            }:null}

            commentData={cdata}
            logIn={{
            onLogin: () => {
                // const signIn = (data) => {
                    // console.log(data)
                    let email = "ajb.personal@hotmail.com"
                    let pass = "fartballs"

                    signInWithEmailAndPassword(auth, email, pass)
                        .then((userCredential) => {
                            User.setID(userCredential.user.uid)
                            setUserId(userCredential.user.uid)
                            // const user = userCredential.user;
                            console.log("Logged in!");
                            console.log(userCredential.user.uid) //can get more info from user
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log(errorCode, ": ", errorMessage);
                        })
                // }
            },
            signupLink: 'http://localhost:3001/'
            }}
        />
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
        setSpecComments(true)
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

    const logout = () => {
        User.clearCookies()
        setUserId(null)
    }

    useEffect(() => {
        if (isLoading) {
            getAllComments();
            setUserId(User.getID());
        }

        if (specComments) {
            setTimeout(() => {
                const elements = document.querySelectorAll("div.fullName")
                console.log(elements)
                elements.forEach((el) => {
                    console.log(el.innerText)
                    if (el.innerText.includes("Simon\n")) {
                        el.className += " card pika animated";
                    }
                })
            }, 1000)
            
        }
        // const elements = document.querySelectorAll("div.fullName")
        // if (elements.length > 0 && specComments) {
        //     console.log(elements)
        //     setSpecRun(false)
        // }
        // if (!isLoading && specComments) {
        //     console.log("TEST")
        //     const elements = document.querySelectorAll("div.fullName")
        //     console.log(elements)
        //     elements.forEach((el) => {
        //         if (el.innerHTML == "Simon") {
        //             el.className += " test"
        //             console.log("TEST")
        //         }
        //     })
        //     setSpecRun(false)
        // }
      });

      

    // const MapComments = () => isLoading ? <div>Loading...</div> : data.map(e => <Comment data={e} />)

    return (
        <>
            <GenBtn onClick={logout}>Clear Cookies</GenBtn>
            <LogInComponent/>
        </>
    )
}

export default CommentSectionTemplate