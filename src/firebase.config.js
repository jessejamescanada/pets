import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKLYCsc3J8MOJJbdtoo9oipN6NtoA0mxg",
  authDomain: "pet-showoff.firebaseapp.com",
  projectId: "pet-showoff",
  storageBucket: "pet-showoff.appspot.com",
  messagingSenderId: "404391121698",
  appId: "1:404391121698:web:db5d408f0c7deb70fecb7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()