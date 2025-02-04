// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-7pS_s5V1OeIfgWgYBG4UkkWBikgA6yo",
  authDomain: "prueba-firebase-5eacc.firebaseapp.com",
  databaseURL: "https://prueba-firebase-5eacc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "prueba-firebase-5eacc",
  storageBucket: "prueba-firebase-5eacc.firebasestorage.app",
  messagingSenderId: "504883897787",
  appId: "1:504883897787:web:945f9003cc04780730909e",
  measurementId: "G-KQ7PZ794HR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);