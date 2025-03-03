import React, {useEffect, useState} from "react";
import Navbar from '../Components/Navbar';
import CommentSection from "../Components/CommentSection.js";
import '../styles/global.css';
import '../styles/storyTemplate.css'

function importAllStories(r) {
  let files = [];
  files = r.keys();
  return files;
}

const stories = importAllStories(require.context('../../public/test', false, /\.(pdf|docx)$/));

function StoryTemplate(){
  const [ desc, setDesc ] = useState()

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
              // const arr = data.split(/\r?\n/);
              const arr = data;
              // arr.forEach((line) => {
              //   line += "\n";
              // })
              setDesc(arr)
          }); 
  }
    return(
        <>
            <Navbar></Navbar>
            <div class="docSection">
              <h1 class="docTitle">{filename.slice(0, filename.length-9).replaceAll("_", " ")}</h1>
              {
                <div class="display-linebreak">{desc}</div>
              }
            </div>
            <hr class="storyBottomBar"/>
            <CommentSection></CommentSection>
        </>
    )
}

export default StoryTemplate