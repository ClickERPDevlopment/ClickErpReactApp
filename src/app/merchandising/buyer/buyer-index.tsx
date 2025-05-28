import { Link } from "react-router";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import { PageAction } from "@/utility/page-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { BuyerTable } from "./buyer-table";
import { GetBuyer } from "@/actions/Sweater/merch-buyer-action";

export default function Buyer() {
  const { data: buyer, isError, error } = GetBuyer();

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
    <div className="p-5 bg-white rounded-lg mt-5">
      <div className="flex items-center justify-between border-b pb-0 ">
        <div className="font-bold text-2xl">Buyer</div>
        <div>
          <Link to={`${PageAction.add}/0`}>
            <Button className="mb-2" role="button">
              Add New Buyer
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-3">
        {buyer ? <BuyerTable data={buyer} /> : <TableSkeleton />}
      </div>
    </div>
  );
}
