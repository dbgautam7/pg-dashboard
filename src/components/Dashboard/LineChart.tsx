import { Line } from "react-chartjs-2";
import { data } from "../../pages/DashboardPage";

export default function LineChart() {
  return (
    <article>
      <Line
        data={data}
        options={{
          interaction: { intersect: false },
          layout: { padding: 15 },
        }}
        className="rounded bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-300/40"
      />
    </article>
  );
}
