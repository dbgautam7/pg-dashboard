import LogInForm from "../components/Auth/LogInForm";

export default function AuthPage() {
  return (
    <main className="flex h-screen">
      <section className="flex flex-grow flex-col">
        <LogInForm />
      </section>
    </main>
  );
}
