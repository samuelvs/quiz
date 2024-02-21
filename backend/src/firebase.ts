import * as admin from 'firebase-admin';
import { initializeApp as initFirebaseApp } from "firebase/app";
const serviceAccount = require('./../quiz-first-aid-firebase-adminsdk-eowfm-586d863277.json');

declare module 'express-serve-static-core' {
  interface Request {
    admin: ReturnType<typeof initFirebaseApp>;
  }
}

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};
initFirebaseApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

export { db, admin };