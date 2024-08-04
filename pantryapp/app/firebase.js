// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFwClSPA5e5p1Cp68nMml-oxIfBEUsaKo",
  authDomain: "pantry-6c107.firebaseapp.com",
  projectId: "pantry-6c107",
  storageBucket: "pantry-6c107.appspot.com",
  messagingSenderId: "818648032785",
  appId: "1:818648032785:web:3c6f0470438cabae28f3b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);