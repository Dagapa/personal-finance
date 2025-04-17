import { DashboardHeadItem } from '@dashboard/dashboardHeadItem/dashboardHeadItem';

export const DashboardHead = () => {
	return (
		<section className="col-span-1 grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4 w-full h-full">
			<DashboardHeadItem title="Balance Mensual" amount="+$25.000" variation="+10% vs el mes anterior" />
			<DashboardHeadItem title="Saldo Disponible" amount="+$25.000" variation="-5% vs el mes anterior" />
			<DashboardHeadItem title="Gastos totales" amount="+$25.000" variation="+5% vs el mes anterior" />
			<DashboardHeadItem title="Ahorros" amount="+$25.000" variation="+5000 este mes" />
		</section>
	);
};
