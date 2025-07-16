import React, { useState } from 'react';
import API from '../utils/api';
import '../ComponentsStyles/SalesForm.css';

const SaleForm = ({ onSaleAdded }) => {
  const [form, setForm] = useState({
    item: '',
    amount: '',
    category: '',
    seller: '',
    date: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/sales', form);
      setMessage('Sale recorded successfully.');
      setForm({ item: '', amount: '', category: '', seller: '', date: '' });
      if (onSaleAdded) onSaleAdded(res.data);
    } catch (err) {
      console.error('Sale submission failed:', err);
      setMessage('Error: Failed to record sale.');
    }
  };

  return (
    <div className="sale-form-container">
      <h3>Record Sale</h3>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="item" placeholder="Item Name" value={form.item} onChange={handleChange} required />
        <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input name="seller" placeholder="Sold By" value={form.seller} onChange={handleChange} required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <button type="submit">Add Sale</button>
      </form>
    </div>
  );
};

export default SaleForm;
