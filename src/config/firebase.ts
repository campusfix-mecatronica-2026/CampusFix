import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBawd3wJqHrJjEfI_-xJi45hyuOjtivJiE',
  authDomain: 'campusfix-corte2-jeyson-2026.firebaseapp.com',
  projectId: 'campusfix-corte2-jeyson-2026',
  storageBucket: 'campusfix-corte2-jeyson-2026.firebasestorage.app',
  messagingSenderId: '757877584146',
  appId: '1:757877584146:web:8f80fdeeb91d1a05c543cb',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

