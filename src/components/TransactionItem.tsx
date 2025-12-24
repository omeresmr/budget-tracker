import { Trash } from 'lucide-react';
import type { Transaction } from '../Types/Transaction';
import formatCurrency from '../util/formatCurrency';

interface TransactionItemProps {
  transaction: Transaction;
  handleClick: () => void;
}

export default function TransactionItem({
  transaction,
  handleClick,
}: TransactionItemProps) {
  const { amount, description, date, type } = transaction;
  const formattedAmount = formatCurrency(amount);

  return (
    <div className="transaction-container">
      <div className="transaction-card">
        <div className="flex flex-col ml-3">
          <p className="text-lg">{description}</p>
          <p className="font-bold text-sm -mt-2">{date}</p>
        </div>
        <p
          className={`ml-24 mr-1 ${type === 'revenue' ? 'text-green-500' : 'text-red-500'}`}
        >
          {type === 'spending' ? '-' : ''}
          {formattedAmount}
        </p>
      </div>
      <button className="delete-transaction-btn" onClick={handleClick}>
        <Trash></Trash>
      </button>
    </div>
  );
}
