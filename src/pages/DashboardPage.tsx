import PageWrapper from "../layouts/PageWrapper";

export default function DashboardPage() {
  return (
    <PageWrapper>
      <h1 className="mb-8 text-3xl font-semibold text-primary">Dashboard</h1>
      <section className="border w-full rounded overflow-y-auto">
        This is dashboard page.
      </section>
    </PageWrapper>
  );
}
