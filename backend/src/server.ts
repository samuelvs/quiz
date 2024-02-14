import express from "express";
import { Request } from 'express';
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { initializeApp } from "firebase/app";

import questionRouter from './routers/question.router';
import userRouter from './routers/user.router';
import downloadRouter from './routers/download.router';

declare module 'express-serve-static-core' {
  interface Request {
    admin: ReturnType<typeof initializeApp>;
  }
}

const app = express();
app.use(cors({ credentials:true, origin:["http://localhost:4200"]}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};
initializeApp(firebaseConfig);

app.use("/api/questions", questionRouter);
app.use("/api/users", userRouter);
app.use("/api/download", downloadRouter);

app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})