import { React, createElement, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import '../styles/global.css';
import '../styles/storyTiles.css';
import Navbar from '../Components/Navbar';
import { GenBtn, TabContainer, Tab, TabL, TabR } from "../Components/Buttons.js";
import { db, auth } from '../index.js';
import { useForm } from "react-hook-form"
import { 
    collection, 
    getDocs,
    addDoc,
    query,
    limit,
} from "firebase/firestore";

// -- Import pdfs -- //
function importAllStories(r) {
    let files = [];
    files = r.keys();
    return files;
  }
  
const stories = importAllStories(require.context('../../public/test', false, /\.(pdf|docx)$/));
let i = 0
stories.forEach((name) => {
    name = name.slice(2, (name.length - 5))
    stories[i] = name;
    i++;
})

var namedFileList = new Map();

function Blog(){
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [ activeTab, setActiveTab ] = useState(0);
    const [ desc, setDesc ] = useState([])
    const [ page, setPage ] = useState()

    useEffect(()=>{
        loadDescs()
    }, []);
    
    const selectTab = (e) => {
        const tabIndex = parseInt(e.target.id);
        if (tabIndex != activeTab) {
            setActiveTab(tabIndex);
        }
    }

    if (page != null) {
        console.log(page)
        return <Navigate to={"/StoryTemplate#" + page} />
    }

    function loadDescs() {
        stories.forEach((storyName) => {
            getFileContents(storyName)
        });
    }
    
    function getFileContents(file) {
        var filename = "./test/" + file + ".docx"
        fetch(filename) // fetch text file
            .then((resp) => resp.text())
            .then(data => {
                const arr = data.split(/\r?\n/);
                namedFileList.set(file, arr)
                setDesc(arr)
            }); 
    }


    // -- Tile Builder -- //
    const Tile = ({ story, file }) => {
        const description = file
        const slicedName = story.slice(0, (story.length - 9)).replaceAll("_", " ")
        const docDate = story.slice(-7)

        return createElement(
            'div',
            { className: 'tile',
                onClick: () => setPage(story)
            },
            createElement('img',
                { className: 'tile-img',
                    src: "img_placeholder.jpg"
                },
            ),
            createElement('h1',
                { className: 'tile-header' },
                slicedName
            ),
            createElement('p',
                { className: 'tile-desc' },
                description
            ),
            createElement('span',
                { className: 'date-tag'},
                docDate
            )
        );
    }
    // const signIn = (data) => {
    //     console.log(data)
    //     let email = data.email;
    //     let pass = data.password;

    //     signInWithEmailAndPassword(auth, email, pass)
    //         .then((userCredential) => {
    //             const user = userCredential.user;
    //             console.log("Logged in!");
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log(errorCode, ": ", errorMessage);
    //         })
    // }

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
            <div class="main-container">
                <form class="searchbar">
                    <input defaultValue="" {...register("toSearch")} />
                </form>
                <TabContainer>
                    {/* Start on sorting by most recent */}
                    <TabL onClick={selectTab} activeTab={activeTab === 0} id={0}>Most Recent</TabL>
                    <Tab onClick={selectTab} activeTab={activeTab === 1} id={1}>Oldest</Tab>
                    <Tab onClick={selectTab} activeTab={activeTab === 2} id={2}>Most Commented</Tab>
                    <TabR onClick={selectTab} activeTab={activeTab === 3} id={3}>Least Commented</TabR>
                </TabContainer>

                <div class="grid">   
                    {
                        visibleTiles.map(e => <Tile story={e} file={namedFileList.get(e)}/>)
                    }
                </div>
            </div>
        </>
    )
}

export default Blog