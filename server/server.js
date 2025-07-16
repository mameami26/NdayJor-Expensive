import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'; // ⚠️ Must match file name
import expenseRoutes from './routes/expenses.js';
import saleRoutes from './routes/sales.js';
import categoryRoutes from './routes/Category.js';
import summaryRoutes from './routes/summary.js';



dotenv.config();

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.options('*', cors());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/summary', summaryRoutes);




app.listen(5001, () => {
  console.log('Server running on port 5001');
});
