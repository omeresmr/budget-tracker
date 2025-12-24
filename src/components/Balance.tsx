import StatCard from './StatCard';
import formatCurrency from '../util/formatCurrency';

interface BalanceProps {
  balance: number;
  revenue: number;
  spending: number;
}

export default function Balance({ balance, revenue, spending }: BalanceProps) {
  const formattedBalance = formatCurrency(balance);

  return (
    <>
      <h2>Balance</h2>
      <p
        className={`balance-text ${balance > 0 ? 'text-green-500' : balance === 0 ? 'text-black' : 'text-red-500'}`}
      >
        {formattedBalance}
      </p>
      <div className="flex gap-20 mt-2">
        <StatCard title="Revenue" value={revenue} />
        <StatCard title="Spending" value={spending} />
      </div>
    </>
  );
}
