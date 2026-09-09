import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; //This must be included
const firebaseConfig = {
apiKey: "AIzaSyAFzA4qJ69F1EC6eUYUeYM1ZfEa6Hk3oFA",
authDomain: "week1labs-2f87c.firebaseapp.com",
projectId: "week1labs-2f87c",
storageBucket: "week1labs-2f87c.firebasestorage.app",
messagingSenderId: "744822866683",
appId: "1:744822866683:web:1cd10fd6f2ea3c56a6665e",
measurementId: "G-TYZ1L2YHZE"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); //This must be included