/* eslint-disable react/prop-types */
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const AreaChart = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Cacher la légende
      },
      title: {
        display: true,
        text: 'Évolution des ventes',
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Supprimer la grille verticale (axe X)
        },
      },
      y: {
        grid: {
          display: false, // Supprimer la grille horizontale (axe Y)
        },
        ticks: {
          display: false, // Cacher les valeurs sur l'axe Y
        },
      },
    },
  };

  return <Line options={options} data={chartData} />;
};

export default AreaChart;
