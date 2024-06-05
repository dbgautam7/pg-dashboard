import { Pie } from "react-chartjs-2";
import { data } from "../../pages/DashboardPage";

export default function PieChart() {
  return (
    <article>
      <Pie
        data={data}
        options={{ layout: { padding: 15 } }}
        className="rounded bg-gradient-to-tr from-green-600 to-green-400 shadow-green-300/40"
      />
    </article>
  );
}
