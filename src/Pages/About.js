import React from "react";
import Navbar from '../Components/Navbar';
import '../styles/global.css';
function About(){

    const pictureSrc = process.env.PUBLIC_URL + "/sexybeast.jpg";
    const pdfSrc = process.env.PUBLIC_URL + "/testPDF.pdf"

    return(
        <div>
            <Navbar></Navbar>
            <div>
                <img src={pictureSrc} alt="the bald author" width="500px" height="600px"/>
                <div>
                    <h1>About The STANT</h1>
                    <p>Simon is the worlds baldest author</p>
                </div>
                <embed src={pdfSrc} width="90%" height="70%"/>
            </div>
        </div>
    )
}

export default About