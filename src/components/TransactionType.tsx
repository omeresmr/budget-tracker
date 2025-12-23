import type { ComponentPropsWithoutRef } from 'react';

interface TransactionTypeProps extends ComponentPropsWithoutRef<'input'> {
  colorClass: string;
}

export default function TransactionType({
  id,
  colorClass,
}: TransactionTypeProps) {
  return (
    <div className="text-center">
      <input type="radio" name="transaction" id={id} className="hidden peer" />
      <label htmlFor={id} className={`transaction-type ${colorClass}`}>
        Spending
      </label>
    </div>
  );
}
