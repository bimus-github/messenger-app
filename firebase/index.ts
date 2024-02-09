import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAG5rqJUgNRdRca9tKzVmm-UfpxHgWzftg",
  authDomain: "messenger-app-7f9f4.firebaseapp.com",
  projectId: "messenger-app-7f9f4",
  storageBucket: "messenger-app-7f9f4.appspot.com",
  messagingSenderId: "71307836965",
  appId: "1:71307836965:web:8790d123bf2ef2defd09cc",
  measurementId: "G-1RJJ8GY2WW",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, app, db };
