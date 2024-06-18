import TransactionTable from "../../components/Transactions/TransactionTable";
import PageWrapper from "../../layouts/PageWrapper";

export default function WithdrawPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <section className="flex justify-between">
          <h1 className="text-3xl font-semibold text-primary">Withdraw</h1>
          <div className="flex gap-8"></div>
        </section>
        <TransactionTable queryKey="withdraw" />
      </div>
    </PageWrapper>
  );
}
