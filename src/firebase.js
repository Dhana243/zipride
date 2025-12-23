import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBm5A3SDliDT3veYuMGC3cHVwQ2miY0few",
  authDomain: "ride-3094a.firebaseapp.com",
  databaseURL: "https://ride-3094a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ride-3094a",
  storageBucket: "ride-3094a.firebasestorage.app",
  messagingSenderId: "961348325022",
  appId: "1:961348325022:web:8f52e267158f5bb87db58f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
