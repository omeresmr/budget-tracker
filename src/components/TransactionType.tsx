import type { ChangeEvent, ComponentPropsWithoutRef } from 'react';

interface TransactionTypeProps extends ComponentPropsWithoutRef<'input'> {
  colorClass: string;
  handleChange: React.EventHandler<ChangeEvent>;
  checked: boolean;
}

export default function TransactionType({
  id,
  colorClass,
  handleChange,
  checked,
}: TransactionTypeProps) {
  return (
    <div className="text-center">
      <input
        type="radio"
        name="type"
        id={id}
        value={id}
        className="hidden peer"
        onChange={handleChange}
        checked={checked}
      />
      <label htmlFor={id} className={`transaction-type ${colorClass}`}>
        {id}
      </label>
    </div>
  );
}
