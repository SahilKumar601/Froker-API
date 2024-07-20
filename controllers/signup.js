import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import User from '../models/user_schema.js'

/**
 * The function calculates a person's age based on their date of birth.
 * @param dob - Date of birth (dob) is a Date object representing the date of birth of a person.
 * @returns The function `calculateAge` returns the age calculated based on the date of birth provided
 * as input.
 */
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
/* In the next code snippet we're generating a salt using the `bcrypt`
  library with a cost factor of 10. This salt is a random value used in the hashing process to add
  complexity and uniqueness to the hashed password. */
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
