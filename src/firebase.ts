import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsdjWUlVJMq_R1aA4uMEYBIhH5j7lwrR8",
  authDomain: "koco-53733.firebaseapp.com",
  projectId: "koco-53733",
  storageBucket: "koco-53733.firebasestorage.app",
  messagingSenderId: "617544924822",
  appId: "1:617544924822:web:5e03e1378a8e0f391c4cb7",
  measurementId: "G-LHVHY73Q62"
};

const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const db = getFirestore(app);
