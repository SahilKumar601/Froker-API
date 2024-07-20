import express from 'express';
import User from '../models/user_schema.js'

const router =express.Router(); 

export const borrow_amt = async (req, res) => {
    console.log(req.body);
    const { amount, tenure } = req.body;
    if (!amount || !tenure) {
      return res.status(400).json({ msg: 'Please enter amount and tenure' });
    }
    try {
      const user = await User.findById(req.user.id);
      const interestRate = 0.08;
      const monthlyRepayment = (amount * (1 + interestRate * tenure)) / (tenure * 12);
      user.purchasePower += amount;
      await user.save();
      res.json({ purchasePower: user.purchasePower, monthlyRepayment });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
export default router;