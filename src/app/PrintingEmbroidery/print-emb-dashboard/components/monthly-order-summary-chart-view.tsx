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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const toDate = new Date();
const fromDate = new Date();
fromDate.setMonth(toDate.getMonth() - 12);

export interface DashboardSearchType {
  FROM_DATE: string;
  TO_DATE: string;
}

function MonthlyOrderSummaryChartView() {
  const api = useApiUrl();

  const [data, setData] = useState<MonthlyOrderSummaryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    FROM_DATE: z.string(),
    TO_DATE: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FROM_DATE: fromDate.toLocaleDateString("en-CA"),
      TO_DATE: toDate.toLocaleDateString("en-CA"),
    },
  });

  const [searchData, setSearchData] = useState<DashboardSearchType>({
    FROM_DATE: fromDate.toLocaleDateString("en-CA"),
    TO_DATE: toDate.toLocaleDateString("en-CA"),
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${api.ProductionUrl}/production/EmbReport/EmbellishmentMonthlyOrderSummaryReport`,
        { params: { fromDate, toDate } }
      );
      if (response.data) setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fromDateFormatted = moment(searchData.FROM_DATE).format("DD-MMM-YY");
    const toDateFormatted = moment(searchData.TO_DATE).format("DD-MMM-YY");

    try {
      setIsLoading(true);
      const response = await axios.get(
        `${api.ProductionUrl}/production/EmbReport/EmbellishmentMonthlyOrderSummaryReport`,
        { params: { fromDate: fromDateFormatted, toDate: toDateFormatted } }
      );
      if (response.data) setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const printingData = data.filter(
    (item) => item.EMB_TYPE === "Printing" || item.EMB_TYPE === null
  );
  const embroideryData = data.filter(
    (item) => item.EMB_TYPE === "Embroidery" || item.EMB_TYPE === null
  );

  const generateBarChart = (title: string, chartData: MonthlyOrderSummaryType[]) => (
    <div className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">{title}</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="MONTH_LABEL" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="ORDER_QTY" fill="#3b82f6" name="Order Qty" radius={[5, 5, 0, 0]} />
          <Bar dataKey="PROD_QTY" fill="#10b981" name="Production Qty" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <LuLoaderCircle className="text-6xl text-blue-500 animate-spin" />
        <p className="mt-4 text-lg font-medium text-gray-600">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1550px] px-1 py-1 space-y-8" style={{ backgroundColor: "#696b54" }}>
      {/* Search Section */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap items-end justify-center gap-6">
              <FormField
                control={form.control}
                name="FROM_DATE"
                render={({ field }) => (
                  <FormItem className="w-56">
                    <FormLabel className="font-bold">From Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={field.value ? new Date(field.value).toLocaleDateString("en-CA") : ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val);
                          setSearchData((prev) => ({ ...prev, FROM_DATE: val }));
                        }}
                        className="h-9"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="TO_DATE"
                render={({ field }) => (
                  <FormItem className="w-56">
                    <FormLabel className="font-bold">To Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={field.value ? new Date(field.value).toLocaleDateString("en-CA") : ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val);
                          setSearchData((prev) => ({ ...prev, TO_DATE: val }));
                        }}
                        className="h-9"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-6">
                <Button type="submit" className="px-6">
                  Search
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1" style={{ marginTop: "1px" }}>
        {generateBarChart("Printing", printingData)}
        {generateBarChart("Embroidery", embroideryData)}
      </div>

      {/* Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1" style={{ marginTop: "1px" }}>
        {[{ title: "Printing Table", data: printingData, typeId: 3 },
        { title: "Embroidery Table", data: embroideryData, typeId: 4 }].map(({ title, data, typeId }) => (
          <div key={title} className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">{title}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-200 text-sm">
                <thead className="bg-blue-100 text-gray-700">
                  <tr>
                    <th className="border p-2 text-left">Month</th>
                    <th className="border p-2 text-right">Order Qty</th>
                    <th className="border p-2 text-right">Production Qty</th>
                    <th className="border p-2 text-right">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <td className="border p-2">
                        <a
                          className="underline text-blue-600 hover:text-blue-800"
                          target="__blank"
                          href={`../../report/embellishment/embellishment-daily-production-report?fromDate=${moment(
                            "01" + item.MONTH_LABEL,
                            "DDMMM-YY"
                          ).format("DD-MMM-YY")}&toDate=${moment(
                            "01" + item.MONTH_LABEL,
                            "DDMMM-YY"
                          )
                            .endOf("month")
                            .format("DD-MMM-YY")}&supplierId=0&woId=0&buyerId=0&styleId=0&poId=0&typeId=${typeId}`}
                        >
                          {item.MONTH_LABEL}
                        </a>
                      </td>
                      <td className="border p-2 text-right">{item.ORDER_QTY || 0}</td>
                      <td className="border p-2 text-right">{item.PROD_QTY || 0}</td>
                      <td className="border p-2 text-right">
                        {item.VALUE?.toFixed(2) || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthlyOrderSummaryChartView;
