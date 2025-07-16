import React, { useState } from 'react';
import '../ComponentsStyles/CategoryForm.css'; 

const CategoryForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('expense');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, type });
    setName('');
    setType('expense');
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="sale">Sale</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default CategoryForm;