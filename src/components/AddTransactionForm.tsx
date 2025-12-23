import InputField from './InputField';
import TransactionType from './TransactionType';

export default function AddTransactionForm() {
  return (
    <div className="flex">
      <div className="flex flex-col">
        <InputField placeholder="amount" maxLength={8} />
        <InputField maxLength={15} placeholder="description" />
        <InputField type="date" min="2010-01-01" max="2045-12-31" />
      </div>
      <div className="flex flex-col ml-8 justify-around items-center">
        <TransactionType id="revenue" colorClass="peer-checked:bg-green-200" />
        <TransactionType id="spending" colorClass="peer-checked:bg-red-200" />
      </div>
    </div>
  );
}
