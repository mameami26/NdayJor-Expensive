import express from 'express';
import Category from '../models/Category.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Add new category (protected)
router.post('/', protect, async (req, res) => {
  const { name, type } = req.body;
  const userId = req.user.id;

  try {
    const existing = await Category.findOne({ name, type, userId });
    if (existing) return res.status(400).json({ message: 'Category already exists' });

    const category = await Category.create({ name, type, userId });
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add category' });
  }
});

// ✅ Get all categories for current user
router.get('/', protect, async (req, res) => {
  const { type } = req.query;
  const userId = req.user.id;

  try {
    const query = { userId };
    if (type) query.type = type;
    const categories = await Category.find(query).sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

// ✅ Delete category if belongs to user
router.delete('/:id', protect, async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id, userId: req.user.id });
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete category' });
  }
});

export default router;
