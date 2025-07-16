import express from 'express';
import Expense from '../models/Expense.js';
import Sale from '../models/Sale.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ TOTAL OVERVIEW
router.get('/totals', protect, async (req, res) => {
  try {
    const userId = req.user.id;

    const expenseTotal = await Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const saleTotal = await Sale.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.json({
      expenseTotal: expenseTotal[0]?.total || 0,
      saleTotal: saleTotal[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get totals' });
  }
});

// ✅ MONTHLY SUMMARY
router.get('/monthly', protect, async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await Expense.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: { $substr: ["$date", 0, 7] }, // "YYYY-MM"
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const sales = await Sale.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: { $substr: ["$date", 0, 7] },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({ expenses, sales });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get monthly summary' });
  }
});

// ✅ BY CATEGORY
router.get('/by-category', protect, async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await Expense.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      { $sort: { total: -1 } }
    ]);

    const sales = await Sale.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      { $sort: { total: -1 } }
    ]);

    res.json({ expenses, sales });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get category summary' });
  }
});

export default router;
