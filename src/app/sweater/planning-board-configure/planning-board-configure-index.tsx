import { Link } from "react-router";
import TableSkeleton from "src/components/table-skeleton";
import { Button } from "src/components/ui/button";
import { PageAction } from "src/utility/page-actions";

import { Alert, AlertDescription, AlertTitle } from "src/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { PlanningBoardConfigureTable } from "./planning-board-configure-table";
import {
  GetSwtPlanningBoardData,
  planningBoardConfigureType,
} from "src/actions/Sweater/swt-planning-board-configure-action";

function PlanningBoardConfigureIndex() {
  const {
    data: swtPlanningBoardData,
    isError,
    error,
  } = GetSwtPlanningBoardData<planningBoardConfigureType>();

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
        <div className="font-bold text-2xl">Planning Board Configure</div>
        <div>
          <Link to={`${PageAction.add}/0`}>
            <Button className="mb-2" role="button">
              New Planning Board Configure
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-3">
        {swtPlanningBoardData ? (
          <PlanningBoardConfigureTable data={swtPlanningBoardData} />
        ) : (
          <TableSkeleton />
        )}
      </div>
    </div>
  );
}

export default PlanningBoardConfigureIndex;
