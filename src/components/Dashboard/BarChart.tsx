import { Bar } from "react-chartjs-2";
import { data } from "../../pages/DashboardPage";

export default function BarChart() {
  return (
    <article>
      <Bar
        data={data}
        options={{ layout: { padding: 15 } }}
        className="rounded bg-gradient-to-tr from-pink-600 to-pink-400 shadow-pink-300/40"
      />
    </article>
  );
}
