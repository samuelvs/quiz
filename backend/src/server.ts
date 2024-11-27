import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';

import preQuizQuestionRouter from './routers/pre-quiz-question.router';
import questionRouter from './routers/question.router';
import userRouter from './routers/user.router';
import downloadRouter from './routers/download.router';

const app = express();
app.use(cors({ credentials:true, origin:["http://localhost:4200"]}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/pre-quiz-questions", preQuizQuestionRouter);
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