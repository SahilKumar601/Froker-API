import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import User from '../models/user_schema.js'

function calculateAge(dob) {
  const diff = Date.now() - dob.getTime();
  const age = new Date(diff);
  return Math.abs(age.getUTCFullYear() - 1970);
}
export const signup = async (req, res) => {
  const { phoneNumber, email, name, dob, monthlySalary, password } = req.body;
  if (!phoneNumber || !email || !name || !dob || !monthlySalary || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  const dateOfBirth = new Date(dob);
  const age = calculateAge(dateOfBirth);
  if (age < 20) {
    return res.status(400).json({ msg: 'User must be above 20 years of age' });
  }
  if (monthlySalary < 25000) {
    return res.status(400).json({ msg: 'Monthly salary must be 25k or more' });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try{
    const newUser = new User({
        phoneNumber,
        email,
        name,
        dob: dateOfBirth,
        monthlySalary,
        password: hashedPassword,
        status: 'approved'
    });
    const user = await newUser.save();
    res.status(201).json(user);
    }catch (err) {
    res.status(500).json({ msg: 'Error registering user' });
  }
};
export default router;
