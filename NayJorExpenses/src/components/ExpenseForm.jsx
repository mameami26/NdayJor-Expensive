import React, { useState } from 'react';
import API from '../utils/api';
import '../ComponentsStyles/ExpenseForm.css'; 

const ExpenseForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('amount', amount);
      formData.append('category', category);
      formData.append('date', new Date().toISOString());
      formData.append('userId', localStorage.getItem('userId'));
      if (receipt) formData.append('receipt', receipt);

      const res = await API.post('/expenses', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      onAdd(res.data);
      setTitle('');
      setAmount('');
      setCategory('');
      setReceipt(null);
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h3>Add Expense</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount (FCFA)"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={e => setReceipt(e.target.files[0])}
      />
      <button type="submit">Save Expense</button>
    </form>
  );
};

export default ExpenseForm;
