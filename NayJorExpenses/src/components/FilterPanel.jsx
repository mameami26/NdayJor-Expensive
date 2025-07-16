import React from 'react';
import '../ComponentsStyles/FilterPanel.css'; 

const FilterPanel = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filter-panel">
      <h3>Filter</h3>
      <div className="filter-group">
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={filters.category || ''}
          onChange={handleChange}
          placeholder="e.g. Food"
        />
      </div>
      <div className="filter-group">
        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={filters.startDate || ''}
          onChange={handleChange}
        />
      </div>
      <div className="filter-group">
        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          value={filters.endDate || ''}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FilterPanel;
