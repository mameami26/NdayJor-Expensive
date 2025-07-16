import React from 'react';
import '../ComponentsStyles/ExpensesList.css'; // Importing CSS for styling

const ExpensesList = ({ expenses }) => {
  if (expenses.length === 0) {
    return <p className="empty-text">No expenses to show.</p>;
  }

  return (
    <div className="expenses-list">
      <h3>Expense History</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.title}</td>
              <td>{exp.amount} FCFA</td>
              <td>{exp.category}</td>
              <td>{new Date(exp.date).toLocaleDateString()}</td>
              <td>
                {exp.receiptUrl ? (
                  <a href={exp.receiptUrl} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                ) : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesList;
