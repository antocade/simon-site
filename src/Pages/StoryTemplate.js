import React, {useEffect, useState} from "react";
import Navbar from '../Components/Navbar';
import CommentSection from "../Components/CommentSection.js";
import '../styles/global.css';

function importAllStories(r) {
  let files = [];
  files = r.keys();
  return files;
}

const stories = importAllStories(require.context('../../public/test', false, /\.(pdf|docx)$/));
// console.log(stories)

function About(){
  const [ desc, setDesc ] = useState([])

    useEffect(()=>{
        loadDescs()
    }, []);


  const filename = window.location.hash.substring(1)

  function loadDescs() {
      stories.forEach((storyName) => {
        if (storyName == ("./" + filename + ".docx")) {
          getFileContents(storyName)
        }
      });
  }

  function getFileContents(file) {
      var filename = "./test/" + file
      fetch(filename) // fetch text file
          .then((resp) => resp.text())
          .then(data => {
              const arr = data.split(/\r?\n/);
              setDesc(arr)
          }); 
  }
    return(
        <>
            <Navbar></Navbar>
            <div className="docSection">
              {
                desc
              }
            </div>

            <CommentSection></CommentSection>
        </>
    )
}

export default About