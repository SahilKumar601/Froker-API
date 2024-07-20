import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../models/user_schema.js'

export const login= async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Invaild Details' });
  }
  try {
    /* This code snippet is a part of a login function in this first of all we are finding the user then
      we are comparing the password with hashed password stored in the database using bcrypt */
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }
    console.log(user.password)
    const match = await bcrypt.compare(user.password,password);
    console.log(match)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '2h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export default router;
