import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBKutAIM8JNqz5vRhOqNEcseptvDOk7Kpw",
  authDomain: "entarome-15d8a.firebaseapp.com",
  projectId: "entarome-15d8a",
  storageBucket: "entarome-15d8a.appspot.com",
  messagingSenderId: "779364504573",
  appId: "1:779364504573:web:4c76e66828cfbcc8b2ff94",
  measurementId: "G-E8LDCESXK3"
};

const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);