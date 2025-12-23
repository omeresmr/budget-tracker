interface StatCardProps {
  title: string;
  value: string;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <>
      <div>
        <h3>
          <span className="font-semibold ">Total</span> {title}
        </h3>
        <p className="stat-text">{value}</p>
      </div>
    </>
  );
}
