import Breadcrumb from "../components/UI/Breadcrumb";

interface Props {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: Props) {
  return (
    <main className={`flex-grow overflow-y-auto px-6 py-4 bg-grayBackground$`}>
      <Breadcrumb />
      {children}
    </main>
  );
}
