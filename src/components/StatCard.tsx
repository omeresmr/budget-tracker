import formatCurrency from '../util/formatCurrency';

interface StatCardProps {
  title: string;
  value: number;
}

export default function StatCard({ title, value }: StatCardProps) {
  const formattedValue = formatCurrency(value);

  return (
    <>
      <div>
        <h3>
          <span className="font-semibold ">Total</span> {title}
        </h3>
        <p
          className={`stat-text ${value > 0 ? 'text-green-500' : value === 0 ? 'text-black' : 'text-red-500'}`}
        >
          {formattedValue}
        </p>
      </div>
    </>
  );
}
