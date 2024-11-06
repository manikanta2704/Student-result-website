import express from 'express';
import Result from '../models/Result.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get result by roll number (public)
router.get('/:rollNumber', async (req, res) => {
  try {
    const result = await Result.findOne({ rollNumber: req.params.rollNumber });
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new result (admin only)
router.post('/', auth, async (req, res) =>{
  try {
    const result = new Result(req.body);
    await result.save();
    res.status(201).json({ result });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Roll number already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Update result (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete result (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.json({ message: 'Result deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;