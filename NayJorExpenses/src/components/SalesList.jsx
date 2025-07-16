import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import '../ComponentsStyles/SalesList.css';

const SalesList = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await API.get('/sales');
      setSales(res.data);
    } catch (err) {
      console.error('Failed to fetch sales:', err);
    }
  };

  return (
    <div className="sales-list-container">
      <h3>Sales History</h3>
      {sales.length === 0 ? (
        <p>No sales recorded.</p>
      ) : (
        <table className="sales-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Seller</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.item}</td>
                <td>{sale.amount} FCFA</td>
                <td>{sale.category}</td>
                <td>{sale.seller}</td>
                <td>{new Date(sale.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesList;
