// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJrM0SEhbld8I8LhlHWyGsTurjTd0GuBw",
  authDomain: "mad-2025-e67ec.firebaseapp.com",
  projectId: "mad-2025-e67ec",
  storageBucket: "mad-2025-e67ec.firebasestorage.app",
  messagingSenderId: "1095749936057",
  appId: "1:1095749936057:web:6cce0cebef4203ad23cc68",
  measurementId: "G-G6KYZV19KN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db = getFirestore(app);
const analytics = getAnalytics(app);