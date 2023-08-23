// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDqxTgnNlW42E1k_aQu8eyMHgHq8yClwtM",
    authDomain: "illigrades.firebaseapp.com",
    projectId: "illigrades",
    storageBucket: "illigrades.appspot.com",
    messagingSenderId: "222820764750",
    appId: "1:222820764750:web:b329fc14419f743dd0871f",
    measurementId: "G-SF4NRFQS21"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// const analytics = getAnalytics(app);

// export default app;