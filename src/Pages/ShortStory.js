import React from "react";
import Navbar from '../Components/Navbar';
import '../styles/global.css';
function ShortStory(){

    const pdfSrc = process.env.PUBLIC_URL + "/testPDF.pdf"

    return(
        <div>
            <Navbar></Navbar>
            <div>
                
                <embed src={pdfSrc} width="90%" height="70%"/>
            </div>
        </div>
    )
}

export default ShortStory