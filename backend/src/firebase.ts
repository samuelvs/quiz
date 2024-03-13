import * as admin from 'firebase-admin';
import { initializeApp as initFirebaseApp } from "firebase/app";

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

const serviceAccount = {
  type: "service_account",
  project_id: process.env.projectId || '',
  private_key_id: process.env.private_key_id || '', 
  private_key: process.env.private_key?.replace(/\\n/g, '\n') || '', 
  client_email: process.env.client_email || '', 
  client_id: process.env.client_id || '', 
  auth_uri: process.env.auth_uri || '', 
  token_uri: process.env.token_uri || '', 
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url || '', 
  client_x509_cert_url: process.env.client_x509_cert_url || '', 
  universe_domain: process.env.universe_domain || '', 
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

const db = admin.firestore();

export { db, admin };