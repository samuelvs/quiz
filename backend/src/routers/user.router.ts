import dotenv from 'dotenv';
dotenv.config();
import { Router } from 'express';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  deleteUser,
  sendPasswordResetEmail,
} from "firebase/auth";
import jwt from 'jsonwebtoken'

import * as admin from 'firebase-admin';

const serviceAccount = require('./../../quiz-first-aid-firebase-adminsdk-eowfm-586d863277.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const router = Router();

router.post("/signup", (req, res) => {
  const { email } = req.body;
  const auth = getAuth();
  const password = generateRandomPassword(8);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      res.send({email: user.email, password: password});
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(errorCode).send({ error: errorMessage});
    });

});
  
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const auth = getAuth();    
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const token = jwt.sign({ uid: userCredential.user.uid }, process.env.JWT_SECRET || '', { expiresIn: '5h' });
      res.send({user, token});
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(errorCode).send({ error: errorMessage});
    });
});

router.get("/", async (req, res) => {
  try {
    const userList = await admin.auth().listUsers();
    const usersInfo = userList.users.map(userRecord => ({
      id: userRecord.uid,
      email: userRecord.email,
    }));

    res.send(usersInfo);
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

router.post("/change-password", async (req, res) => {
  try {
    const { email, password, new_password } = req.body;   
    const auth = getAuth();    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updatePassword(user, new_password);

    res.status(200).send({ message: 'Senha alterada com sucesso' });
  } catch (error) {
    console.error('Erro ao alterar a senha:', error);
    res.status(500).send({ error: 'Erro ao alterar a senha' });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;   
    const auth = getAuth();    
    const userCredential = await sendPasswordResetEmail(auth, email);
    res.status(200).send({ message: `Email de redefinição de senha enviado com sucesso para ${email}` });
  } catch (error) {
    console.error('Erro ao alterar a senha:', error);
    res.status(500).send({ error: 'Erro ao alterar a senha' });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { userId } = req.body;
    const auth = getAuth();    
    await deleteUser(userId);

    res.status(200).send({ message: 'Conta excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir a conta:', error);
    res.status(500).send({ error: 'Erro ao excluir a conta' });
  }
});

function generateRandomPassword(length: number): string {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export default router;