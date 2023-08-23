import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';

import './search.css';

function App({ userId }) {
  const [searchCards, setSearchCards] = useState([]);

  const submitSearch = async () => {
    let cards = [];
    const searchBoxValue = document.getElementById('search-box').value;
    console.log("search box has: " + searchBoxValue);
    let queryString = "";

    if (searchBoxValue.toString().includes("-")) {
      queryString = 'http://localhost:4000/api/courses/?where={"subject": "'
        + searchBoxValue.split("-")[0] + '","number": ' + searchBoxValue.split("-")[1] + '}';
      console.log("___1: " + queryString);
    } else {
      if (/^[a-zA-Z]+$/.test(searchBoxValue)) {
        queryString = 'http://localhost:4000/api/courses/?where={"subject": "'
          + searchBoxValue.toString() + '"' + '}';
        console.log("___2: " + queryString);

      } else {
        queryString = 'http://localhost:4000/api/courses/?where={"courseTitle": /.*"'
          + searchBoxValue.toString() + '.*/i' + '}';
        console.log("___3: " + queryString);

      }
    }

    const fetchCourses = async () => {
      console.log("Starting fetch course");
      Axios.get(queryString)
        .then(function (response) {
          console.log("fetched data");
          console.log(response.data);
          let tempData = response.data.data;
          let listOfCourses = [];
          if (tempData.length == 0) {
            cards.push(<h2>No Course Found.</h2>);
          } else {
            for (let i = 0; i < tempData.length; i++) {
              if (!listOfCourses.includes(tempData[i].subject + tempData[i].number + tempData[i].title)) {
                cards.push(generateSearchCards(tempData[i]));
                listOfCourses.push(tempData[i].subject + tempData[i].number + tempData[i].title);
              } else {
                continue;
              }
            }
          }
          console.log(cards);
          setSearchCards(cards);
        }).catch(function (error) {
          console.log(error);
          return;
        });
    }
    fetchCourses();
  };

  return (
    <div id="search-container">
      <div className='form'>
        <label for="search-box" className='text'>Search for Course By ID:</label>
        <input type="text" id="search-box"></input>
        <button id="search-page-button" onClick={() => { submitSearch() }}>Search</button>
      </div>
      <div id="cards-holder">
        {searchCards}
      </div>
    </div>
  );
}

export default App;

function generateSearchCards(courseDataItem) {
  let detail_link = "/details#" + courseDataItem.subject + "-" + courseDataItem.number;
  return (
    <div className="search-course-card">
      <Link to={detail_link} className="search-card-link">
        <h3>{courseDataItem.subject + "-" + courseDataItem.number + " " + courseDataItem.courseTitle}</h3>
      </Link>
    </div>
  );
}