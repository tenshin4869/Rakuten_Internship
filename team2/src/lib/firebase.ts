import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDv9zDfBdFtK7wugm1DRR62vqs1HAbcMV8",
  authDomain: "rakuten-project-4488e.firebaseapp.com",
  projectId: "rakuten-project-4488e",
  storageBucket: "rakuten-project-4488e.appspot.com",
  messagingSenderId: "426305900892",
  appId: "1:426305900892:web:3e55b77a7d4f8a05b17199",
  measurementId: "G-NMFQWT1WBY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
