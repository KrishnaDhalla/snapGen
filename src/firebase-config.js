// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDig8643LBZJNc7fxg4anJEJINlJ2OvpRI",
  authDomain: "snapgen-9cebd.firebaseapp.com",
  projectId: "snapgen-9cebd",
  storageBucket: "snapgen-9cebd.appspot.com",
  messagingSenderId: "510331877573",
  appId: "1:510331877573:web:ed2e0dc1f5b078c04698ac"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()
export const db=getFirestore(app)
export const storage=getStorage(app)
// export const API_TOKEN="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"
