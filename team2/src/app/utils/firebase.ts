// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDv9zDfBdFtK7wugm1DRR62vqs1HAbcMV8",
    authDomain: "rakuten-project-4488e.firebaseapp.com",
    projectId: "rakuten-project-4488e",
    storageBucket: "rakuten-project-4488e.appspot.com",
    messagingSenderId: "426305900892",
    appId: "1:426305900892:web:3e55b77a7d4f8a05b17199",
    measurementId: "G-NMFQWT1WBY"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}