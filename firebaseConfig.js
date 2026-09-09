import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
initializeAuth,
getReactNativePersistence,
getAuth,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: "AIzaSyAFzA4qJ69F1EC6eUYUeYM1ZfEa6Hk3oFA",
  authDomain: "week1labs-2f87c.firebaseapp.com",
  projectId: "week1labs-2f87c",
  storageBucket: "week1labs-2f87c.firebasestorage.app",
  messagingSenderId: "744822866683",
  appId: "1:744822866683:web:1cd10fd6f2ea3c56a6665e",
  measurementId: "G-TYZ1L2YHZE"
};
// Check if an app instance already exists to prevent Fast Refresh crashes
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
// Guard initializeAuth against duplicate calls during hot reload
let auth;
try {
auth = initializeAuth(app, {
persistence: getReactNativePersistence(AsyncStorage),
});
} catch (e) {
auth = getAuth(app);
}
export { auth };