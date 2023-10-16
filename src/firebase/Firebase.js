// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfVGXGWlrDYXC5_WKQMBKYX0cd1DfTqtk",
    authDomain: "uploadingfile-22321.firebaseapp.com",
    projectId: "uploadingfile-22321",
    storageBucket: "uploadingfile-22321.appspot.com",
    messagingSenderId: "351887467989",
    appId: "1:351887467989:web:8fb3355359d797accec95c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)