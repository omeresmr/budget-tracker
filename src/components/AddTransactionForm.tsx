import InputField from './InputField';
import TransactionType from './TransactionType';
import Button from './Button';
import ErrorText from './ErrorText';
import type { Transaction } from '../Types/Transaction';
import { useState } from 'react';

export default function AddTransactionForm() {
  const [formData, setFormData] = useState<Transaction>({
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: '',
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let finalValue = value;

    // Input Validation for amount input
    if (name === 'amount') {
      // 1. Only allow digits and comma
      finalValue = value.replace(/[^0-9,]/g, '');

      // 2. Only allow one comma
      const parts = finalValue.split(',');
      if (parts.length > 2) finalValue = `${parts[0]},${parts[1]}`;

      // 3. Only allow 2 digits after the comma
      if (parts.length > 1 && parts[1].length > 2)
        finalValue = `${parts[0]},${parts[1].slice(0, 2)}`;
    }
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

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
          />
          <TransactionType
            id="spending"
            colorClass="peer-checked:bg-red-200"
            handleChange={handleChange}
          />
        </div>
      </div>
      <Button disabledCondition={!!errorMessage} />
      <ErrorText errorMessage={errorMessage} />
    </div>
  );
}
