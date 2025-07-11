// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK73kkdPkEcGkKmAfGvDqFxTesZrtoM0o",
  authDomain: "fitness-app-541cc.firebaseapp.com",
  projectId: "fitness-app-541cc",
  storageBucket: "fitness-app-541cc.firebasestorage.app",
  messagingSenderId: "1061197334230",
  appId: "1:1061197334230:web:8c08363ff0013950966b77",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
