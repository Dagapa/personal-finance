import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Graph = () => {
  const data = {
    labels: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'
    ],
    datasets: [
      {
        label: 'Ingresos',
        data: [3200000, 3000000, 3500000, 4000000, 3800000, 4200000],
        backgroundColor: 'rgba(34, 197, 94, 0.6)', // verde
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'Gastos',
        data: [2800000, 2600000, 3100000, 2900000, 3000000, 3400000],
        backgroundColor: 'rgba(239, 68, 68, 0.6)', // rojo
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Ingresos vs Gastos Mensuales',
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: number) => `$${value.toLocaleString()}`
        }
      }
    }
  };

  return (
    <Bar data={data} className='h-full' />
  );
};