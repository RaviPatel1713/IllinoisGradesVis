import React from 'react';
import { Link, useNavigate } from "react-router-dom";

import './navBar.css';
import { auth } from '../../firebase-config';
import Container from '../elements/Container';

function App() {
  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
    console.log(event.target.email.value);
  };

  return <div id="navbar-container">
    <div className='navbar-button'>
      <Link className='navbar-link' to={"/Home"}>
        <span className='logo-white-text'>illi</span>Grades<span className='logo-white-text'>Vis</span>
      </Link>
    </div>
    <div className='navbar-button'>
      <Link className='navbar-link' to={"/search"}>Search</Link>
    </div>
    <div className='navbar-button'>
      <Link className='navbar-link' to={"/saved_courses"}>Saved Courses</Link>
    </div>
    <div className='navbar-button'>
      <Link className='navbar-link' to={"/edit_profile"}>Edit Profile</Link>
      {/* <Container triggerText={"Edit Profile"} onSubmit={onSubmit} /> */}
    </div>
    {/* <div className='navbar-button'>
      <Link className='navbar-link' to={""}>Edit Profile</Link>
    </div> */}
    <div className='navbar-button'>
      <Link className='navbar-link'
        onClick={(e) => {
          e.preventDefault();

          auth.signOut()
            .then(() => {
              // const navigate = useNavigate();
              console.log("Logout successful");
              // navigate("/login");
            })
            .catch((err) => {
              console.log("Error: Logout attempt unsuccessful. \n-- User possibly trying to log out of unlogged session.");
            })
        }}
      >Logout</Link>
    </div>
  </div>
}

export default App;
