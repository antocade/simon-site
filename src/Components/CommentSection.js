import { React, useEffect, useState, cloneElement } from "react";
import { db, auth } from '../index.js';
import { GenBtn } from '../Components/Buttons.js'
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css"
import { 
    collection, 
    doc,
    getDocs,
    addDoc,
    query,
    orderBy,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import "../styles/commentSection.css"
import pfp from '../pfp.JPG'

function CommentSectionTemplate(){
    const [ data, setData ] = useState([]);
    const [ isLoading, setLoading ] = useState(true)
    const [ userId, setUserId ] = useState()
    const [ userName, setUserName ] = useState()
    const [ specComments, setSpecComments ] = useState(false)
    const filename = window.location.hash.substring(1)

    //TODO
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
            currentUser={userId ? {
            currentUserId: userId,
            currentUserImg:
            `https://ui-avatars.com/api/name=${userName}&background=random`,
            currentUserFullName: userName
            }:null}

            commentData={cdata}
            logIn={{
            onLogin: () => {
                    let email = prompt("Enter email")
                    let pass = prompt("Enter password")

                    signInWithEmailAndPassword(auth, email, pass)
                        .then((userCredential) => {
                            console.log("test...",userCredential.user.displayName)//
                            console.log(userCredential.user.uid) //can get more info from user
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log(errorCode, ": ", errorMessage);
                        })
            },
            signupLink: 'http://localhost:3001/'
            }}
            onSubmitAction={(data) => {
                let type = userId == 1 ? "simon" : "comment"
                createPost(data.text, type, userName)
            }}

            onReplyAction={(data) => {
                let type = userId == 1 ? "simon_reply" : "reply"
                let parentComment = data.repliedToCommentId

                let replyID = createPost(data.text, type, userName)
                if (replyID) {
                    addReply(parentComment, replyID)
                }
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
            // console.log(`ID: ${comment.id} | Msg: ${data.msg}`);
            allComments.push({
                ...data,
                id: comment.id,
            });
             
            setData(allComments)            
        });
        setLoading(false)
        setSpecComments(true)
    }

    async function createPost(msg, type, name) {
        let postDate = new Date().toLocaleString();
    
        try {
            const docRef = await addDoc(collection(db, "CommentSections/" + filename + "/comments"), {
                date: postDate, //replace with timestamp
                msg: msg,
                name: name,
                replies: [],
                type: type,

            });
            console.log("Document written with ID: ", docRef.id);
            return docRef.id;
        } catch (e) {
            console.error("Error adding document: ", e);
            return null;
        }
    }

    async function addReply(parentCommID, replyCommID) {
        let commID = await replyCommID

        try {
            await updateDoc(doc(db, "CommentSections/" + filename + "/comments/", parentCommID), {
                replies: arrayUnion(commID)
            });
            console.log("Updated document with ID: ", parentCommID)
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    }

    const logout = () => {
        auth.signOut();
    }

    useEffect(() => {
        if (isLoading) {
            getAllComments();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUserId(user.uid);
                    setUserName(user.displayName);
                } else {
                    // User is signed out
                    setUserId(null);
                }
                });
        }

        if (specComments) {
            setTimeout(() => {
                const elements = document.querySelectorAll("div.fullName")
                elements.forEach((el) => {
                    if (el.innerText.includes("Simon\n")) {
                        el.className += " card pika animated";
                    }
                })
            }, 1000)
            
        }
      });

    return (
        <>
            <GenBtn onClick={logout}>Test logout</GenBtn>
            <LogInComponent/>
        </>
    )
}

export default CommentSectionTemplate