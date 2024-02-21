import { Router } from 'express';
const { body, validationResult } = require('express-validator');
const { sanitize, escape } = require('validator');
const rateLimit = require("express-rate-limit");
import { db, admin } from '../firebase';
import { questions } from '../data';
import authMid from '../middlewares/auth.mid';

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

const sanitizeInput = (req: any, res: any, next: any) => {
  req.body.name = escape(req.body.name);
  req.body.school = escape(req.body.school);
  req.body.year = escape(req.body.year);
  req.body.state = escape(req.body.state);
  req.body.city = escape(req.body.city);
  req.body.character = escape(req.body.character);
  req.body.score = escape(req.body.score);
  
  next();
};

const validateInput = [
  body('name').isString(),
  body('school').isString(),
  body('year').isString(),
  body('state').isString(),
  body('city').isString(),
  body('character').isString(),
  body('score').isNumeric()
];

const limiter = rateLimit({
  windowMs: 60000,
  max: 10
});

router.post("/finish", limiter, sanitizeInput, validateInput, async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ messages: errors.array() });
  }

  try {
    const data = {
      name: req.body.name,
      schoolarity: req.body.school,
      year_scholarity: req.body.year,
      state: req.body.state,
      city: req.body.city,
      character: req.body.character,
      score: req.body.score
    };

    await db.collection('scores').add(data);
    return res.status(201).json({ message: 'Dados inseridos com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao inserir dados' });
  }
});

router.get("/results", authMid, async (req, res) => {
  try {
    const scores = await admin.firestore().collection('scores').get();

    const scoresData: any = [];
    scores.forEach(doc => {
      scoresData.push({
        id: doc.id,
        ...doc.data()
      });
    });
    res.send(scoresData);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao tentar recuperar os dados.' });
  }
 
});

export default router;