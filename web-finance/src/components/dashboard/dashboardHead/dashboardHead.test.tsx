import { DashboardHead } from './dashboardHead';
import { render, screen } from '@testing-library/react';

describe('DashboardHead Component', () => {
  beforeEach(() => {
    render(<DashboardHead />);
  });

  it('renders all four dashboard sections', () => {
    const sections = screen.getAllByRole('article');
    expect(sections).toHaveLength(4);
  });

  it('displays correct section titles', () => {
    const titles = screen.getAllByRole('heading', { level: 2 });
    expect(titles).toHaveLength(4);
    expect(titles[0]).toHaveTextContent('Balance Mensual');
    expect(titles[1]).toHaveTextContent('Saldo Disponible');
    expect(titles[2]).toHaveTextContent('Gastos totales');
    expect(titles[3]).toHaveTextContent('Ahorros');
  });

  it('displays correct amounts and percentages', () => {
    expect(screen.getAllByText('+$25.000')).toHaveLength(4);
    expect(screen.getAllByText('+10% vs el mes anterior')).toHaveLength(1);
    expect(screen.getAllByText('-5% vs el mes anterior')).toHaveLength(1);
    expect(screen.getAllByText('+5% vs el mes anterior')).toHaveLength(1);
    expect(screen.getAllByText('+5000 este mes')).toHaveLength(1);
  });

});