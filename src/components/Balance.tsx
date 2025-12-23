import StatCard from './StatCard';

interface BalanceProps {
  balance: string;
  revenue: string;
  spending: string;
}

export default function Balance({ balance, revenue, spending }: BalanceProps) {
  return (
    <>
      <h2>Balance</h2>
      <p className="balance-text">{balance}</p>
      <div className="flex gap-20 mt-2">
        <StatCard title="Revenue" value={revenue} />
        <StatCard title="Spending" value={spending} />
      </div>
    </>
  );
}
