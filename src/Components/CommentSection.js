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
    const filename = window.location.hash.substring(1)

    //TODO
    // - get cdata as array of fetched comments
    // - create comment creates in proper format
    // -> get name/userId from session
    // -> comId is the auto gen id
    // -> 
    // - logout

    const LogInComponent = () => {
        var cdata = []
        //if type reply skip over
        //will be added as reply to main comment
        data.forEach((comment) => {
            var temp = {
                userId: 'blank',
                comId: 'bank',
                fullName: 'blank',
                avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
                text: comment.msg,
                timestamp: comment.date,
                replies: []
            }

            // //track stuff you found in replies and don't try and read later?
            // comment.replies.forEach(async (reply) => {
            //     // const newQuery = query(
            //     const docRef = doc(db, "CommentSections/" + filename + "/comments/" + reply)
            //     // );
            //     const fsDoc = await getDocs(docRef);
            //     var reply = {
            //         userId: 'blank',
            //         comId: 'bank',
            //         fullName: 'blank',
            //         avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
            //         text: fsDoc.msg,
            //         timestamp: fsDoc.date,
            //     }
            //     temp.replies.push(reply)
            // })
            cdata.push(temp)
        })
        // const bdata = data.map({comId={data.msg}})
        // const cdata = [
        //   {
        //     userId: '01a',
        //     comId: '012',
        //     fullName: 'Riya Negi',
        //     avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
        //     // userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
        //     text: 'Hey, Loved your blog! ',
        //     timestamp: "2024-09-28T10:34:56Z",
        //     replies: [
        //     {
        //         userId: '02a',
        //         comId: '013',
        //         // userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
        //         fullName: 'Adam Scott',
        //         avatarUrl: 'https://ui-avatars.com/api/name=Adam&background=random',
        //         text: 'Thanks! It took me 1 month to finish this ',
        //         timestamp: "2024-09-28T10:34:56Z",
        //     }
        //     ]
        //   }
        // ]
        return <CommentSection
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

    const logout = () => {
        User.clearCookies()
        setUserId(null)
    }

    useEffect(() => {
        if (isLoading) {
            getAllComments(User.getID());
            setUserId(User.getID());
        }
      });

    // const MapComments = () => isLoading ? <div>Loading...</div> : data.map(e => <Comment data={e} />)

    return (
        <>
            <div class="commentSection">
                <h1>Comments</h1>
                {/* Should be input field and a btn appears after clicking into it, but disabled until text written */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input defaultValue="" {...register("comment")}/>
                    <GenBtn type="submit">Comment</GenBtn>
                </form>
                {/* <MapComments/>  */}
            </div>
            <GenBtn onClick={logout}>Clear Cookies</GenBtn>
            <LogInComponent/>
        </>
    )
}

export default CommentSectionTemplate