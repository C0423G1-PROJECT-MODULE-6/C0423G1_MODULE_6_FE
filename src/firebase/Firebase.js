// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDKS5NsxpVUvRtFM5fZnYGq3J_PPrnqSfc",
    authDomain: "c4zone-da49c.firebaseapp.com",
    projectId: "c4zone-da49c",
    storageBucket: "c4zone-da49c.appspot.com",
    messagingSenderId: "634858915242",
    appId: "1:634858915242:web:f31fa94798dd7aab4297d3",
    measurementId: "G-HG48TKGZKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);