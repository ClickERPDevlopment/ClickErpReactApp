import { Link } from "react-router";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import { PageAction } from "@/utility/page-actions";
import { GaugeTable } from "./gauge-table";
import { GetAllSwtGauge } from "@/actions/Sweater/swt-gauge-action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function Gauge() {
  const { data: gauges, isError, error } = GetAllSwtGauge();

  if (isError) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="pt-5">
      <div className="flex items-center justify-between border-b pb-0">
        <div className="font-bold text-2xl">Gauge</div>
        <div>
          <Link to={`${PageAction.add}/0`}>
            <Button className="mb-2" role="button">
              Add New Gauge
            </Button>
          </Link>
        </div>
        {/* <Button
          onClick={() => {
            // localStorage.setItem("bgcolor", "sss");
            alert(localStorage.getItem("click_api_token"));
          }}
        >
          localstorage
        </Button> */}
      </div>
      <div className="mt-3">
        {gauges ? <GaugeTable data={gauges} /> : <TableSkeleton />}
      </div>
    </div>
  );
}
