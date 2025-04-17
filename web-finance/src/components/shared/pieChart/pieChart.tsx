// PieChartByCategory.tsx
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { TransactionI } from '@models/transaction';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartByCategory = ({ data }: { data: TransactionI[] }) => {
  // Agrupar por categoría y sumar los amounts
  const groupedData: Record<string, number> = data.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  const labels = Object.keys(groupedData);
  const amounts = Object.values(groupedData);

  const chartData = {
    labels,
    datasets: [
      {
        data: amounts,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#E7E9ED', '#00A36C'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '100%', maxWidth: 500 }}>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChartByCategory;
