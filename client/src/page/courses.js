import React, {useState, useEffect} from 'react';
import {
    Routes,
    Route,
    Link,
    json
  } from "react-router-dom"; 
import Axios from 'axios';

import './courses.css';

function App({userId}) {
    const [courseData, setCourseData] = useState([]);
    const queryString = 'http://localhost:4000/api/users/?where={"uid": "' + userId + '"}';   
    useEffect(() => {
        Axios.get(queryString)
            .then(function (response) {
                setCourseData(response.data.data[0].savedCourses);
        });
    }, []); // empty dependency, runs once

    // read each course and generate a list
    const [courseDiv, setCourseDiv] = useState(
        <h1>helloo</h1>
    );
    useEffect(() => {
        var cl = (courseData || []).map(courseId => {
            var detail_link = "/details#" + courseId;
            return (
                <div className="saved-course-card" key={courseId}>
                    <li>
                        <Link to={detail_link} className="datarow">
                            <h2>[{courseId}]</h2>
                        </Link>
                    </li>
                </div>
            );
        });
        setCourseDiv(cl)
    }, [courseData]);
    
    return (
        <div>
            <br/>
            <h1>Saved Courses</h1>
            <br/>
            <div id="search-button">
                <Link to={"/search"} className="button-text">Search</Link>
            </div>
            <ul id="saved-course-container">
                {courseDiv}
            </ul>
        </div>
    );
}

export default App;