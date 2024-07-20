import express from 'express';
const router = express.Router();
import User from '../models/user_schema.js'

export const getuser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
};

export default router;