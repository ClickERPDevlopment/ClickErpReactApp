import axios from "axios";
import { useEffect, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import useApiUrl from "@/hooks/use-ApiUrl";
import { MonthlyOrderSummaryType } from "../print-emb-dasrboard-type";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import moment from "moment";


function MonthlyOrderSummaryChartView() {
  const api = useApiUrl();

  // State Management
  const [data, setData] = useState<MonthlyOrderSummaryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Data Fetching
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${api.ProductionUrl}/production/EmbReport/EmbellishmentMonthlyOrderSummaryReport`);
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    fetchData();
  }, []);

  const printingData = data.filter(item => item.EMB_TYPE === "Printing" || item.EMB_TYPE === null);
  const embroideryData = data.filter(item => item.EMB_TYPE === "Embroidery" || item.EMB_TYPE === null);

  const generateBarChart = (title: string, chartData: MonthlyOrderSummaryType[]) => (
    <div className="my-2 bg-white p-4">
      <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="MONTH_LABEL" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="ORDER_QTY" fill="#8884d8" name="Order Qty" />
          <Bar dataKey="PROD_QTY" fill="#82ca9d" name="Production Qty" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container">
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <LuLoaderCircle className="text-5xl text-blue-500 animate-spin" />
          <p className="mt-4 text-lg font-medium text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto max-w-[1550px] px-4">
        {/* Bar Charts */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            {generateBarChart("Printing", printingData)}
          </div>
          <div className="w-full lg:w-1/2">
            {generateBarChart("Embroidery", embroideryData)}
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
          {/* Printing Table */}
          <div className="bg-white p-4">
            <h2 className="text-xl font-semibold mb-3 text-center">Printing Table</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300 text-sm">
                <thead className="bg-green-300">
                  <tr>
                    <th className="border p-1 text-left">Month</th>
                    <th className="border p-1 text-right">Order Qty</th>
                    <th className="border p-1 text-right">Production Qty</th>
                    <th className="border p-1 text-right">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {printingData.map((item, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors">

                      <td className="border p-1">
                        <a
                          className="underline text-blue-600 hover:text-blue-800"
                          target="__blank"
                          href={`../../report/embellishment/embellishment-daily-production-report?fromDate=${moment("01" + item.MONTH_LABEL, "DDMMM-YY").format("DD-MMM-YY")}&toDate=${moment("01" + item.MONTH_LABEL, "DDMMM-YY").endOf("month").format("DD-MMM-YY")}&supplierId=0&woId=0&buyerId=0&styleId=0&poId=0&typeId=3`}
                        >
                          {item.MONTH_LABEL}
                        </a>
                      </td>

                      <td className="border p-1 text-right">{item.ORDER_QTY || 0}</td>
                      <td className="border p-1 text-right">{item.PROD_QTY || 0}</td>
                      <td className="border p-1 text-right">{item.VALUE?.toFixed(2) || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Embroidery Table */}
          <div className="bg-white p-4">
            <h2 className="text-xl font-semibold mb-3 text-center">Embroidery Table</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300 text-sm">
                <thead className="bg-green-300">
                  <tr>
                    <th className="border p-1 text-left">Month</th>
                    <th className="border p-1 text-right">Order Qty</th>
                    <th className="border p-1 text-right">Production Qty</th>
                    <th className="border p-1 text-right">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {embroideryData.map((item, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors">
                      <td className="border p-1">
                        <a
                          className="underline text-blue-600 hover:text-blue-800"
                          target="__blank"
                          href={`../../report/embellishment/embellishment-daily-production-report?fromDate=${moment("01" + item.MONTH_LABEL, "DDMMM-YY").format("DD-MMM-YY")}&toDate=${moment("01" + item.MONTH_LABEL, "DDMMM-YY").endOf("month").format("DD-MMM-YY")}&supplierId=0&woId=0&buyerId=0&styleId=0&poId=0&typeId=4`}
                        >
                          {item.MONTH_LABEL}
                        </a>
                      </td>
                      <td className="border p-1 text-right">{item.ORDER_QTY || 0}</td>
                      <td className="border p-1 text-right">{item.PROD_QTY || 0}</td>
                      <td className="border p-1 text-right">{item.VALUE?.toFixed(2) || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlyOrderSummaryChartView;
