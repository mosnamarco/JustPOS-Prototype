// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUFoiO32y4IHbjMS44tBou87EKIVLlCqc",
  authDomain: "justpos-prototype.firebaseapp.com",
  projectId: "justpos-prototype",
  storageBucket: "justpos-prototype.appspot.com",
  messagingSenderId: "521553287858",
  appId: "1:521553287858:web:8e90027b417c9930fac7ab",
  measurementId: "G-M0TNMZ81YL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth }