// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrgPI8-G8P9jUH4hAMxm9cj2AenRy3IcI",
  authDomain: "delta-notes.firebaseapp.com",
  projectId: "delta-notes",
  storageBucket: "delta-notes.appspot.com",
  messagingSenderId: "1004854473553",
  appId: "1:1004854473553:web:595309258b85333e4f5970",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export default app
