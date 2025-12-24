import InputField from './InputField';
import TransactionType from './TransactionType';
import Button from './Button';
import ErrorText from './ErrorText';
import type { Transaction } from '../Types/Transaction';
import type { ChangeEvent } from 'react';

interface AddTransactionFormProps {
  formData: Transaction;
  handleClick: () => void;
  handleChange: React.EventHandler<ChangeEvent>;
}

export default function AddTransactionForm({
  formData,
  handleClick,
  handleChange,
}: AddTransactionFormProps) {
  const validate = () => {
    const { amount, description, date, type } = formData;
    const dateValue = new Date(date);
    const minDate = new Date('2010-01-01');
    const maxDate = new Date('2045-12-31');

    if (!amount) return 'Please enter a transaction amount.';
    if (!type) return 'Please select a transaction type.';
    if (!date || dateValue < minDate || dateValue > maxDate)
      return 'Date must be between 2010 and 2045.';
    if (!description) return 'Please enter a description.';

    return '';
  };
  const errorMessage = validate();

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <div className="flex flex-col">
          <InputField
            placeholder="amount"
            maxLength={8}
            name="amount"
            onChange={handleChange}
            value={formData.amount === 0 ? '' : formData.amount}
          />
          <InputField
            maxLength={15}
            placeholder="description"
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
          <InputField
            type="date"
            min="2010-01-01"
            max="2045-12-31"
            name="date"
            onChange={handleChange}
            value={formData.date}
          />
        </div>
        <div className="flex flex-col ml-8 justify-around items-center">
          <TransactionType
            id="revenue"
            colorClass="peer-checked:bg-green-200"
            handleChange={handleChange}
            checked={formData.type === 'revenue'}
          />
          <TransactionType
            id="spending"
            colorClass="peer-checked:bg-red-200"
            handleChange={handleChange}
            checked={formData.type === 'spending'}
          />
        </div>
      </div>
      <Button disabledCondition={!!errorMessage} handleClick={handleClick} />
      <ErrorText errorMessage={errorMessage} />
    </div>
  );
}
