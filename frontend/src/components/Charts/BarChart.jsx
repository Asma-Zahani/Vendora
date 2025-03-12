/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useRef } from 'react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const options = {
    // indexAxis: 'y', // <-- Permet d'afficher un bar chart horizontal
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Statistiques des commandes',
      },
    },
  };

  return <Bar ref={chartRef} options={options} data={data} />;
};

export default BarChart;