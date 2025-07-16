import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../ComponentsStyles/ChartComponent.css';

const ChartComponent = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: title },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
