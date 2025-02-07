import { Link } from "react-router";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import { PageAction } from "@/utility/page-actions";
import { McGroupTable } from "./mc-group-table";
import { GetSwtMachineGroup } from "@/actions/Sweater/swt-mc-group-action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function Gauge() {
  const { data: gauges, isError, error } = GetSwtMachineGroup();

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
        <div className="font-bold text-2xl">Machine Group</div>
        <div>
          <Link to={`${PageAction.add}/0`}>
            <Button className="mb-2" role="button">
              Add New Machine Group
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-3">
        {gauges ? <McGroupTable data={gauges} /> : <TableSkeleton />}
      </div>
    </div>
  );
}
