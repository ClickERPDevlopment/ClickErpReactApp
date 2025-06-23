import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { MonthlyOrderSummaryType } from "../print-emb-dasrboard-type";


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
    document.title = "Emblishment Budget Sheet";
    fetchData();
  }, []);

  // Render

  console.log(data);

  if (isLoading) {
    return (
      <div className="container">
        <h3 className="text-center p-2 m-4 text-3xl font-bold">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div>

    </div>
  );
}

export default MonthlyOrderSummaryChartView;
