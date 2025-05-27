import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ⚠️ Remplace par ta vraie config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBXoJpa3ExVv5sXtsVPYhOQGdqnrFpDya8",
  authDomain: "lolname-348ea.firebaseapp.com",
  projectId: "lolname-348ea",
  storageBucket: "lolname-348ea.firebasestorage.app",
  messagingSenderId: "726336461451",
  appId: "1:726336461451:web:276b49a4ac2de5abe1128e",
  measurementId: "G-JLNMMHFX6F"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
