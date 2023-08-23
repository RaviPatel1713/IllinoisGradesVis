import logo from './logo.svg';
import './App.css';

import Axios from 'axios';

import React, { useState, useEffect } from 'react';
// import bg from './components/assets/bg.png';


// import Sidebar from './components/widgets/Sidebar';
// import Home from './page/Home';
// import Notes from './page/Notes';
import Signup from './page/Signup';
import Login from './page/Login';
import Details from './page/details';
import Home from './page/home';
import Courses from './page/courses';
import Search from './page/search';
import NavBar from './components/widgets/navBar';
// import Timer from './page/Timer';
// import Stopwatch from './page/Stopwatch';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider } from './components/UserAuthContext';
import { useAuthState } from './components/UserAuthContext';

import ProtectedRoute from './custom_routes/ProtectedRoute';
import PublicRoute from './custom_routes/PublicRoute';
import { Container } from './components/elements/Container';
import EditProfile from './page/editProfile';

function App() {
  const testBackend = async () => {
    const result = await Axios.get('http://localhost:4000/api/courses/?where={"subject": "CS"}', {
    }).catch(function (error) {
      console.log(error);
      return;
    });
    console.log(result);
  }


  // currently logged in user
  const [uid, setUid] = useState("");

  return (
    <AuthContextProvider>
      <Router>
        <div className="App bg-primary">
          <section>
            <div>
              <NavBar />
              <Routes>
                <Route
                  path="/signup"
                  element={
                    <PublicRoute redirectTo="/home">
                      <Signup />
                    </PublicRoute>
                  } />

                <Route
                  path="/login"
                  element={
                    <PublicRoute redirectTo="/home">
                      <Login userId={(id) => setUid(id)} />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute redirectTo="/login">
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit_profile"
                  element={
                    <ProtectedRoute redirectTo="/login">
                      <EditProfile userId={uid} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/details"
                  element={
                    <ProtectedRoute redirectTo="/login">
                      <Details userId={uid} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <ProtectedRoute redirectTo="/login">
                      <Search />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/saved_courses"
                  element={
                    <ProtectedRoute redirectTo="/login">
                      <Courses userId={uid} />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </section>

        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;

/**
 <Routes>
  <Route path="/" element={<Signup />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login userId={(id)=>setUid(id)}/>} />
  <Route path="/home" element={<Home userId={(id)=>setUid(id)}/>} />
  <Route path="/details" element={<Details userId={uid}/>} />
  <Route path="/search" element={<Search />} />
  <Route path="/saved_courses" element={<Courses userId={uid}/>} />
</Routes> 
*/