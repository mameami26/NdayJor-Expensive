import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import '../ComponentsStyles/Dashboard.css'; 
const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [sales, setSales] = useState([]);
  const user = localStorage.getItem('user');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [expensesRes, salesRes] = await Promise.all([
        API.get('/expenses'),
        API.get('/sales'),
      ]);
      setExpenses(expensesRes.data);
      setSales(salesRes.data);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  };

  return (
    <div>
      <h2>Welcome, {user}</h2>

      <h3>Expenses</h3>
      {expenses.length === 0 ? <p>No expenses found.</p> : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Added By</th>
              <th>Receipt</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp._id}>
                <td>{exp.description}</td>
                <td>{exp.amount} FCFA</td>
                <td>{exp.category}</td>
                <td>{exp.addedBy}</td>
                <td>
                  {exp.receiptUrl ? (
                    <a href={exp.receiptUrl} target="_blank" rel="noreferrer">
                      View
                    </a>
                  ) : '—'}
                </td>
                <td>{new Date(exp.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Sales</h3>
      {sales.length === 0 ? <p>No sales recorded.</p> : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.item}</td>
                <td>{sale.price} FCFA</td>
                <td>{sale.category}</td>
                <td>{sale.soldBy}</td>
                <td>{new Date(sale.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
