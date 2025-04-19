// PieChartByCategory.tsx
import { FC } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { TransactionI, TransactionType } from '@models/transaction';

interface PieChartProps {
  data: TransactionI[];
  type?: TransactionType;
}

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart: FC<PieChartProps> = ({ data, type = 'expense' }) => {
  // Filter transactions based on type
  const filteredData = data.filter(transaction => transaction.type === type);

  const groupedData: Record<string, number> = filteredData.reduce((acc, curr) => {
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
