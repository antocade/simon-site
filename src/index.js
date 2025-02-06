import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { 
  BrowserRouter,
  Routes,
  Route,
 } from "react-router";
 
import App from './Pages/App';
import Blog from './Pages/Blog';
import About from './Pages/About';

const root = document.getElementById("root");

//Firebase config keys
const firebaseConfig = {

  apiKey: "AIzaSyDnwJgflFO4zCPzsQ2PlkQh7hgqcBQ_3C0",

  authDomain: "simon-site-775cb.firebaseapp.com",

  projectId: "simon-site-775cb",

  storageBucket: "simon-site-775cb.firebasestorage.app",

  messagingSenderId: "416110078495",

  appId: "1:416110078495:web:c3aedc5a08e0be1107432a",

  measurementId: "G-7JL3VH2CJX"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const db = getFirestore(app)
// connectFirestoreEmulator(db, 'localhost', 8080)

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="simon-site" element={<App />} />
      <Route path="blog" element={<Blog />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<App />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
