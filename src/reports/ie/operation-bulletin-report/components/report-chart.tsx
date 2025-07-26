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



  const groupedDataMap = new Map<
    string,
    {
      operationName: string;
      totalAllottedMP: number;
      capacityHr: number;
      efficiency: number;
    }
  >();

  data.forEach((item) => {
    const key = item.OPERATIONNAME;

    if (!groupedDataMap.has(key)) {
      groupedDataMap.set(key, {
        operationName: item.OPERATIONNAME,
        totalAllottedMP: item.ALLOTTEDMP,
        capacityHr: item.CAPACITYHR,
        efficiency: item.TARGERPERHOUR,
      });
    } else {
      const existing = groupedDataMap.get(key)!;
      existing.totalAllottedMP += item.ALLOTTEDMP;
    }
  });

  console.log("Grouped Data Map:", groupedDataMap);

  const chartData = Array.from(groupedDataMap.values()).map((item, index) => ({
    index: index + 1,
    operationName: item.operationName,
    capacityUtilized: Math.round(item.totalAllottedMP * item.capacityHr),
    efficiency: item.efficiency,
  }));



  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-white border p-2 rounded shadow text-sm">
          <p><strong>Operation:</strong> {dataPoint.operationName}</p>
          <p><strong>Process Target:</strong> {dataPoint.capacityUtilized}</p>
          <p><strong>Target:</strong> {dataPoint.efficiency}</p>
        </div>
      );
    }
    return null;
  };

  const generateLineChart = (title: string, chartData: any[]) => (
    <div className="my-1 bg-white p-2">
      <h2 className="text-base font-semibold text-center mb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="index"
            label={{
              value: "Operation No",
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
            name="Process Target"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="efficiency"
            stroke="#82ca9d"
            name="Target"
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
