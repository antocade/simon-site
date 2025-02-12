import { React, createElement } from "react";
import '../styles/global.css';
import '../styles/storyTiles.css';
import Navbar from '../Components/Navbar';
import { Gen_Btn } from "../Components/Buttons.js";
import { db, auth } from '../index.js';
import { useForm } from "react-hook-form"
import { 
    collection, 
    getDocs,
    addDoc,
    query,
    limit,
} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

// -- Import pdfs -- //
function importAllStories(r) {
    let files = [];
    files = r.keys();
    return files;
  }
  
const stories = importAllStories(require.context('../story-upload', false, /\.(pdf)$/));

// -- Tile Builder -- //
function Tile({ story }) {
    return createElement(
        'div',
        { className: 'tile' },
        createElement('h1',
            { className: 'tile-header' },
            story
        )
    );
}

// -- Firebase stuff *move to login page* -- //
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
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    
    const signIn = (data) => {
        console.log(data)
        let email = data.email;
        let pass = data.password;

        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Logged in!");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, ": ", errorMessage);
            })
    }

    //Live searchbar
    const searchElement = watch("toSearch");
    
    var visibleTiles = [];
    if (searchElement == "" || searchElement == undefined) {
        visibleTiles = stories;
    } else {
        visibleTiles = stories.filter(str => str.includes(searchElement));
    }
    console.log(visibleTiles);

    return(
        <>
            <Navbar></Navbar>
            <div>
                <form class="searchbar">
                    <input defaultValue="" {...register("toSearch")} />
                </form>
            </div>

            <div>
                {searchElement ? (
                <>
                    input: {searchElement}
                </>
                ) : (
                ""
                )}
            </div>

            <div class="grid">
                {
                    
                    visibleTiles.map(e => <Tile story={e}/>)
                }
            </div>

            <h1>DB Test</h1>
            <p>View in console, check posts on Firebase</p>
            <div>
                <Gen_Btn onClick={getAllPosts}>List Posts</Gen_Btn>
            </div>
            <div>
                <Gen_Btn theme="red" onClick={createPost}>Create Post</Gen_Btn>
            </div>
            <div>
            <form onSubmit={handleSubmit(signIn)}>
            <input defaultValue="" {...register("email", { required: true})} />

            <input {...register("password", { required: true })} />
            {errors.email && <span>This field is required</span>}
            {errors.password && <span>This field is required</span>}

            <input type="submit" />
            </form>
            </div>
        </>
    )
}

export default Blog