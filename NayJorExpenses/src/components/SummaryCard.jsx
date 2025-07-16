import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import '../ComponentsStyles/SummaryCards.css';

const SummaryCards = () => {
  const [summary, setSummary] = useState({ totalExpenses: 0, totalSales: 0 });

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await API.get('/summary');
      setSummary(res.data);
    } catch (err) {
      console.error('Failed to fetch summary:', err);
    }
  };

  return (
    <div className="summary-container">
      <div className="summary-card expense">
        <h4>Total Expenses</h4>
        <p>{summary.totalExpenses.toLocaleString()} FCFA</p>
      </div>
      <div className="summary-card sales">
        <h4>Total Sales</h4>
        <p>{summary.totalSales.toLocaleString()} FCFA</p>
      </div>
    </div>
  );
};

export default SummaryCards;
