/ Import the functions you need from the SDKs you need
import firebase from "firebase/compat";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDklIfKIa0MJwPfvArBOzOC7TkGtlnhsaI",
    authDomain: "react-chat-c6ed0.firebaseapp.com",
    projectId: "react-chat-c6ed0",
    storageBucket: "react-chat-c6ed0.appspot.com",
    messagingSenderId: "805715355981",
    appId: "1:805715355981:web:e7571d7d2d1cfa85f26f04",
    measurementId: "G-F37VSP9TGW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
const db = firebase.firestore();
const auth = firebase.auth;
export { db, auth };