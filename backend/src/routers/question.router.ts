import { Router } from 'express';
import { questions } from '../data';
const router = Router();

router.get("/", (req, res) => {
  const response = questions.map(({ questions, ...rest }) => ({
    ...rest,
    questions: questions.map(({ answer, ...questionRest }) => questionRest)
  }));
  res.send(response);
});
  
router.post("/answer", (req, res) => {
  const subject: number = Number(req.body.subject);
  const question: number = Number(req.body.question);
  const userAnswer: number = Number(req.body.userAnswer);
  const rightAlternative = questions[subject]?.questions[question]?.answer;
  let response = false;

  if (userAnswer === rightAlternative) {
      response = true;
  }
  res.send(response);
});

router.post("/finish", (req, res) => {
  const name = req.body.name;
  const school = req.body.school;
  const year = req.body.year;
  const state = req.body.state;
  const city = req.body.city;
  const score = req.body.score;

  //TO DO - SENT DB
});

router.post("/results", (req, res) => {
  //TO DO - GET ALL FROM DB
});

export default router;