import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Card';
import Balance from './components/Balance';
import AddTransactionForm from './components/AddTransactionForm';
import { useEffect, useState } from 'react';
import type { Transaction } from './Types/Transaction';
import TransactionItem from './components/TransactionItem';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error while loading from localStorage', error);
      return [];
    }
  });

  const [formData, setFormData] = useState<Transaction>({
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: '',
  });

  // Save transactions everytime transactions gets updated
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const totalRevenue = transactions
    .filter((t) => t.type === 'revenue')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalSpending = transactions
    .filter((t) => t.type === 'spending')
    .reduce((acc, t) => acc - Number(t.amount), 0);

  // totalSpending is a negative number
  const totalBalance = totalRevenue + totalSpending;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let finalValue = value;

    // Input Validation for the amount input
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

  const addTransaction = () => {
    const { amount } = formData;

    // Convert the amount into a number (it has a comma in it, thats why it is a string)
    const numericAmount = parseFloat(String(amount).replace(',', '.'));

    setTransactions((prev) => [
      ...prev,
      { ...formData, amount: numericAmount, id: crypto.randomUUID() },
    ]);

    resetForm();
  };

  const removeTransaction = (transaction: Transaction) => {
    const { id } = transaction;

    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const resetForm = () => {
    setFormData({
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0],
      type: '',
    });
  };

  return (
    <>
      <Header />
      <main>
        <section className="bg-white">
          <Card className="bg-indigo-200 mx-16 p-4 md:p-6">
            <Balance
              balance={totalBalance}
              spending={totalSpending}
              revenue={totalRevenue}
            />
          </Card>
        </section>
        <section className="bg-indigo-200">
          <Card className="bg-white p-3 md:px-9 md:py-4">
            <h2 className="mb-6">Add Transaction</h2>
            <AddTransactionForm
              handleChange={handleChange}
              handleClick={addTransaction}
              formData={formData}
            />
          </Card>
        </section>
        <section>
          <Card className="gap-2 bg-indigo-200 mt-7.5 md:min-w-85">
            <h2 className="mb-6 mt-3">Transactions</h2>
            {transactions.map((t) => (
              <TransactionItem
                transaction={t}
                key={t.id}
                handleClick={() => removeTransaction(t)}
              />
            ))}
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
