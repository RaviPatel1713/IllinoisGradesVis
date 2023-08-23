import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Axios from 'axios';

import './details.css';

import LineChart from '../components/charts/lineChart';
import PieChart from '../components/charts/pieChart';
import BarChart from '../components/charts/barChart';
import InstructorTable from './instructorTable';
import GPATrend from './gpaTrend';
import RawDataTable from './rawDataTable';
import * as util from './detailsUtil.js';

function App({ userId }) {
  const [fetchedData, setFetchedData] = useState(0);
  const [courseData, setCourseData] = useState([]);
  const [fetchTime, setFetchTime] = useState(0);

  let instructors = [];

  const courseID = useLocation().hash.replace('#', '');
  const subject = courseID.split('-')[0]
  const number = courseID.split('-')[1]
  const queryString = 'http://localhost:4000/api/courses/?where={"subject": "'
    + subject + '","number": ' + number + '}';

  let before, after;
  const fetchCourses = async () => {
    Axios.get(queryString)
      .then(function (response) {
        setCourseData(response.data.data);
        setFetchedData(1);
        after = Date.now();
        setFetchTime(after - before);
      }).catch(function (error) {
        console.log(error);
        return;
      });
  }

  if (fetchedData == 0) {
    before = Date.now();
    fetchCourses();
  } else {
    console.log(courseData);
    util.gpaByProf(courseData);
  }

  // fetch user's saved courses
  console.log(userId);
  const [savedData, setSavedData] = useState([]);
  const [udbId, setUdbId] = useState('');
  const [buttonText, setButtonText] = useState('');
  const qry = 'http://localhost:4000/api/users?where={"uid":"' + userId + '"}';
  useEffect(() => {
    Axios.get(qry)
      .then(function (response) {
        setUdbId(response.data.data[0]._id);
        if (response.data.data[0].savedCourses.indexOf(courseID) !== -1) {
          setButtonText("Remove from saved courses");
        } else {
          setButtonText("Add to saved courses");
        }
        setSavedData(response.data.data[0].savedCourses);
      });
  }, []);

  // logic for adding the course or not
  function modifySavedCourses() {
    var newSavedData = [];
    if (buttonText !== "Add to saved courses") {
      setButtonText("Add to saved courses");
      newSavedData = savedData.filter(item => item !== courseID);// remove
      setSavedData(newSavedData);
    } else {
      setButtonText("Remove from saved courses");
      newSavedData = [...savedData, courseID]
      setSavedData(newSavedData); // add
    }
    Axios.put(`http://localhost:4000/api/users/${udbId}`, {
      savedCourses: newSavedData
    });
  }

  // return cases
  if (fetchedData == 0) {
    return (
      <div id="details-container">
        <br /> <br />
        <h1>{courseID} Details</h1>
        <h1>Fetching Data...</h1>
      </div>
    );
  } else {
    if (courseData.length == 0) { //No Course With ID Found
      return (
        <div id="details-container">
          <br /> <br />
          <h1>No course with ID {courseID} is found.</h1>
          <h2>Please Try Entering Another Course ID</h2>
        </div>
      );
    } else { //Coursese Found
      return (
        <div id="details-container">
          <br />
          <h1>{courseID + " " + courseData[0].courseTitle}</h1>
          <h5>Fetched in {fetchTime} ms</h5>
          <div id="cards-container">
            <div id="course-info-container">
              <h2>Course Info</h2>
              <h5>Course Title: {courseData[0].courseTitle}</h5>
              <InstructorTable data={util.gpaByProf(courseData)} />
              <h5>Total Sessions Taught: {courseData.length}</h5>
              <h5>Total Terms Taught: {util.numTerms(courseData)}</h5>
              <h5>Total Students: {util.totalStudents(courseData)[0]}</h5>
              <h5>Total Failed Students: {util.totalStudents(courseData)[1]}</h5>
              <h5>Total Withdrawn Students: {util.totalStudents(courseData)[2]}</h5>

              <h2>Summaries</h2>
              <h5>Average GPA (Overall): {util.totalAvgGPA(courseData)}</h5>
              <h5>Best Instructor (Highest GPA): &nbsp;
                <b style={{ color: "green" }}>{util.findBestProf(util.gpaByProf(courseData))}</b></h5>
              <h5>Harshest Instructor (Lowest GPA): &nbsp;
                <b style={{ color: "red" }}>{util.findWorstProf(util.gpaByProf(courseData))}</b></h5>
              <h5>Instructor with Most Students Taught: &nbsp;
                <b style={{ color: "#4da6ff" }}>{util.findVeteranProf(util.gpaByProf(courseData))}</b>
              </h5>
              <GPATrend slope={util.gpaXYFit(courseData)} />
              <h5>Percentage Failed:  &nbsp;{(util.totalStudents(courseData)[1] / util.totalStudents(courseData)[0] * 100).toString().substring(0, 6)}%</h5>
              <h5>Percentage Withdrawn:  &nbsp;{(util.totalStudents(courseData)[2] / util.totalStudents(courseData)[0] * 100).toString().substring(0, 6)}%</h5>
            </div>
            <div id="chart-container">
              <h2>Graphs</h2>
              <LineChart title='Average GPA Over Time' rawData={courseData} />
              <br />
              <PieChart title='Overall Student Letter Grade Breakdown' rawData={courseData} />
              <br />
              <BarChart title='Letter Grade Breakdown By Instructor' rawData={courseData} />
            </div>
            <div id="raw-data-container">
              <h2>Course Data</h2>
              <br />
              <RawDataTable data={courseData} />
              <br />
              <h5>Data Obtained From: <a href="https://github.com/wadefagen/datasets/tree/master/gpa">https://github.com/wadefagen/datasets/tree/master/gpa</a></h5>
            </div>
          </div>
          <button style={{color: "red"}}
            className="group relative justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={modifySavedCourses}>{buttonText}
            </button>
          
          <br />
          <Link to={"/home"}>
            <h1>go home</h1>
          </Link>
        </div>
      );
    }
  }


}

export default App;