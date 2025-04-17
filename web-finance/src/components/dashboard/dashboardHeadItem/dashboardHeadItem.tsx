interface DashboardHeadItemProps {
  title: string;
  amount: string;
  variation: string;
}

export const DashboardHeadItem = ({ title, amount, variation }: DashboardHeadItemProps) => {
  const amountColor = amount.startsWith('-') ? 'text-red-400' : 'text-green-600';
  const variationColor = variation.startsWith('-') ? 'text-red-400' : 'text-green-600';

  return (
    <article className="flex flex-col justify-around items-center rounded-4xl shadow-2xs bg-gray-900 transform transition-transform duration-300 hover:scale-102">
      <header className="flex justify-center items-start w-full h-fit py-4">
        <h2 className="text-2xl font-bold">{title}</h2>
      </header>
      <div>
        <p className={`text-xl ${amountColor}`}>{amount}</p>
        <span className={`text-sm ${variationColor}`}>{variation}</span>
      </div>
    </article >
  )
}