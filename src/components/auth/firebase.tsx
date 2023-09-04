// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHDde2uCt3hhFYOKRwlXwVBeWkyvOHcAg",
  authDomain: "frendz-app-21680.firebaseapp.com",
  projectId: "frendz-app-21680",
  storageBucket: "frendz-app-21680.appspot.com",
  messagingSenderId: "130600953725",
  appId: "1:130600953725:web:88361301fc91ac7480ce14",
  measurementId: "G-LFNXTL4PE6"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
