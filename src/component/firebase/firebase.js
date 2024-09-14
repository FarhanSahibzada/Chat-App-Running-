// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHnWJ4_nC7iE0ugamhOweGDX1uX1Kii94",
  authDomain: "chat-app-746a8.firebaseapp.com",
  projectId: "chat-app-746a8",
  storageBucket: "chat-app-746a8.appspot.com",
  messagingSenderId: "462684705416",
  appId: "1:462684705416:web:fd4317eb353497a79ac53d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)

export {
  auth,
  db,
 storage, 
}