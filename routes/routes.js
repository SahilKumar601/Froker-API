import express from 'express';
import { signup } from '../controllers/signup.js';
import auth from '../middleware/auth.js';
import { login } from '../controllers/login.js';
import { borrow_amt } from '../controllers/borrow.js';
import { getuser } from '../controllers/user.js';

const router = express.Router();
router.post('/signup',signup)
router.post('/login',login)
router.post('/borrow',auth,borrow_amt)
router.get('/user',auth,getuser)

export default router;