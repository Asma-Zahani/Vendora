/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useContext, useEffect, useRef } from 'react';
import    ThemeContext from "@/utils/ThemeContext"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data }) => {
  const { theme } = useContext(ThemeContext);

  const textColor = theme === 'dark' ? '#fff' : '#000';

  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const options = {
    // indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: textColor,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: textColor,
        },
      },
    },
  };

  return <Bar ref={chartRef} options={options} data={data} />;
};

export default BarChart;