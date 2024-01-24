import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
//import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCtKpayEXjcgVHj0-kaCddcn8i75IuXCmY",
  authDomain: "fir-course-f19b6.firebaseapp.com",
  databaseURL: "https://fir-course-f19b6-default-rtdb.firebaseio.com",
  projectId: "fir-course-f19b6",
  storageBucket: "fir-course-f19b6.appspot.com",
  messagingSenderId: "639782634813",
  appId: "1:639782634813:web:78b0ab6bacd9900b2d7154",
  measurementId: "G-RHTL6NZDLQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//export const googleProvider = new GoogleAuthProvider();
//export const db = getDatabase(app);
