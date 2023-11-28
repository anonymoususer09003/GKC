// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection as firestoreCollection,
  getDocs,
  addDoc,
  orderBy,
  serverTimestamp,
  query,
  where,
  doc,
  updateDoc,
  Timestamp,
  arrayUnion,
  onSnapshot,
  getDoc,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBKEVp3K7aTX2xvmlEtCEStZIbuvffVCd0',
  authDomain: 'geekkc-6012a.firebaseapp.com',
  projectId: 'geekkc-6012a',
  storageBucket: 'geekkc-6012a.appspot.com',
  messagingSenderId: 219690322196,
  appId: '1:219690322196:web:c7acba9db44046ce371a01',
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);

const firestore = getFirestore(firebaseApp);

export {
  firestore,
  firestoreCollection,
  getDocs,
  firebaseApp,
  addDoc,
  orderBy,
  serverTimestamp,
  query,
  where,
  doc,
  updateDoc,
  Timestamp,
  arrayUnion,
  onSnapshot,
  getDoc,
  setDoc,
};
