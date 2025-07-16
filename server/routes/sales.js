import express from 'express';
import Sale from '../models/Sale.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ POST: Add a new sale (user-protected)
router.post('/', protect, async (req, res) => {
  const { item, amount, category, date, seller } = req.body;
  const userId = req.user.id;

  try {
    const sale = await Sale.create({ item, amount, category, date, seller, userId });
    res.status(201).json(sale);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add sale' });
  }
});

// ✅ GET: All sales for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const sales = await Sale.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch sales' });
  }
});

// ✅ DELETE: Remove a sale owned by user
router.delete('/:id', protect, async (req, res) => {
  try {
    const sale = await Sale.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    res.json({ message: 'Sale deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete sale' });
  }
});

// PUT /api/sales/:id — update sale
router.put('/:id', protect, async (req, res) => {
  const { item, amount, category, date, seller } = req.body;

  try {
    const sale = await Sale.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { item, amount, category, date, seller },
      { new: true }
    );

    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update sale' });
  }
});

// GET /api/sales?category=...&start=...&end=...
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
    const sales = await Sale.find(filter).sort({ date: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch sales' });
  }
});



export default router;
