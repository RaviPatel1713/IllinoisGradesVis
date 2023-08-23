import React, { useState } from 'react';
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Axios from 'axios';

import './home.css';

function App({ userId }) {
    return (
        <div>
            <br/> <br/> <br/> <br/>
            <h1 id="home-title">Welcome to illi<span id="home-title-blue">Grades</span>Vis</h1>
            <h2>Click on the search tab to find courses, or check your saved courses!</h2>

            {/* <Subhead fontSize={[2, 3]}>No Tengo Idea</Subhead> */}

            {/*             
            <Link to="/home" className="link">
                <h1>Home</h1>
            </Link>

            <Link to="/" className="link">
                <h1 onClick={() => userId("")}>Logout</h1>
            </Link>

            <div className="options">
                <Link to="/saved_courses" className="link">
                    <h2>Saved Courses</h2>
                </Link>

                <Link to="/details#CS-374" className="link">
                    <h2>test course</h2>
                </Link>
                <Link to="/details#CS-411" className="link">
                    <h2>test course2</h2>
                </Link> */}
            {/* </div> */}
        </div >
    );
}

export default App;
