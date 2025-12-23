import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Card';
import Balance from './components/Balance';
import AddTransactionForm from './components/AddTransactionForm';

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-white">
          <Card className="bg-indigo-200 mx-16 p-4 md:p-6">
            <Balance balance="0,00 €" spending="0,00 €" revenue="0,00 €" />
          </Card>
        </section>
        <section className="bg-indigo-200">
          <Card className="bg-white p-3 md:px-9 md:py-4">
            <h2 className="mb-6">Add Transaction</h2>
            <AddTransactionForm />
          </Card>
        </section>
        <section>
          <Card className="gap-2 bg-indigo-200 mt-7.5 md:min-w-85">
            <h2 className="mb-6 mt-3">Transactions</h2>
            {/* TransactionsList / TransactionItem */}
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
