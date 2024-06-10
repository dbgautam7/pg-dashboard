import TransactionTable from "../components/Transactions/TransactionTable";
import PageWrapper from "../layouts/PageWrapper";

export default function TransactionsPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <section className="flex justify-between">
          <h1 className="text-3xl font-semibold text-primary">Transactions</h1>
          <div className="flex gap-8"></div>
        </section>
        <TransactionTable />
      </div>
    </PageWrapper>
  );
}
