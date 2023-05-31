// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYixe5xBPrKAppTycQE5zI2Ni91hKOc90",
  authDomain: "chat-app-28e8e.firebaseapp.com",
  databaseURL:
    "https://chat-app-28e8e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-app-28e8e",
  storageBucket: "chat-app-28e8e.appspot.com",
  messagingSenderId: "338875078177",
  appId: "1:338875078177:web:bc4bf9b83fdb553374f560",
  measurementId: "G-RNM0KMN871",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
