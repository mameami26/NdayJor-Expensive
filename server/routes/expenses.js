import express from 'express';
import multer from 'multer';
import { storage } from '../utils/cloudinary.js';
import Expense from '../models/Expense.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage });

// ✅ GET all expenses for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
});

// ✅ POST new expense with image
router.post('/', protect, upload.single('receipt'), async (req, res) => {
  const { title, amount, category, date } = req.body;
  try {
    const receiptUrl = req.file ? req.file.path : null;

    const expense = await Expense.create({
      title,
      amount,
      category,
      date,
      userId: req.user.id,
      receiptUrl
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Failed to add expense with receipt' });
  }
});

// ✅ Optional: DELETE an expense (user-owned)
router.delete('/:id', protect, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete expense' });
  }
});

// PUT /api/expenses/:id — update expense
router.put('/:id', protect, upload.single('receipt'), async (req, res) => {
  const { title, amount, category, date } = req.body;
  const receiptUrl = req.file ? req.file.path : null;

  try {
    const updateData = {
      title,
      amount,
      category,
      date,
    };

    if (receiptUrl) updateData.receiptUrl = receiptUrl;

    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updateData,
      { new: true }
    );

    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    res.json(expense);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Failed to update expense' });
  }
});

// GET /api/expenses?category=...&start=...&end=...
router.get('/', protect, async (req, res) => {
  const { category, start, end } = req.query;
  const userId = req.user.id;

  const filter = { userId };
  if (category) filter.category = category;
  if (start || end) {
    filter.date = {};
    if (start) filter.date.$gte = start;
    if (end) filter.date.$lte = end;
  }

  try {
    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
});


export default router;
