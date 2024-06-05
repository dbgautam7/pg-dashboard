import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";

import PageWrapper from "../layouts/PageWrapper";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
  Tooltip
);

export default function DashboardPage() {
  return (
    <PageWrapper>
      <div>
        <h1 className="mb-8 text-3xl font-semibold text-primary">Dashboard</h1>
        <p>This is Dashboard Page</p>
      </div>
    </PageWrapper>
  );
}
