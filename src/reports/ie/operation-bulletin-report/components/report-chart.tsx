/* eslint-disable @typescript-eslint/no-explicit-any */
import { OperationBulletinReportType } from "../operation-bulletin-report-type";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

function ReportChart({
  data,
}: {
  data: OperationBulletinReportType[];
}) {
  const chartData = data.map((item, index) => ({
    index: index + 1,
    operationName: item.OPERATIONNAME,
    capacityUtilized: Math.round(item.TOTALALLOTTEDMP * item.CAPACITYHR) * 2,
    // capacityUtilized: Math.random() * 100,
    efficiency: item.EFFICIENCY,
    // efficiency: 50,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-white border p-2 rounded shadow text-sm">
          <p><strong>Operation:</strong> {dataPoint.operationName}</p>
          <p><strong>Capacity Utilized:</strong> {dataPoint.capacityUtilized}</p>
          <p><strong>Efficiency:</strong> {dataPoint.efficiency}%</p>
        </div>
      );
    }
    return null;
  };

  const generateLineChart = (title: string, chartData: any[]) => (
    <div className="my-1 bg-white p-2">
      <h2 className="text-base font-semibold text-center mb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={150}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="index"
            label={{
              value: "Op No",
              position: "insideBottom",
              offset: -2,
              fontSize: 10,
            }}
            tick={{ fontSize: 10 }}
          />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 10 }} />
          <Line
            type="monotone"
            dataKey="capacityUtilized"
            stroke="#8884d8"
            name="Capacity"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="efficiency"
            stroke="#82ca9d"
            name="Eff"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );


  return (
    <div>
      {generateLineChart("", chartData)}
    </div>
  );
}

export default ReportChart;
