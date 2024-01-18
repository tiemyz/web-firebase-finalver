import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWzQg8IoJxpzTZBWIlSj1ZVdmpQ_sf1bA",
  authDomain: "fir-auth-48d3a.firebaseapp.com",
  projectId: "fir-auth-48d3a",
  storageBucket: "fir-auth-48d3a.appspot.com",
  messagingSenderId: "213386031913",
  appId: "1:213386031913:web:dce33213eaaf44f48f3d38",
  measurementId: "G-BJKNNBZLRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
