// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVP4kjTI2IHOtnrMXxyQ_T-nY2NghccEE",
  authDomain: "journalapp-794d4.firebaseapp.com",
  projectId: "journalapp-794d4",
  storageBucket: "journalapp-794d4.appspot.com",
  messagingSenderId: "323805620349",
  appId: "1:323805620349:web:d90f410c646df78f15a914",
  measurementId: "G-7W717K01XY"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);