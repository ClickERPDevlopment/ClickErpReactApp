import { Link } from "react-router";
import TableSkeleton from "@/components/table-skeleton";
import { PageAction } from "@/utility/page-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import AppPageContainer from "@/components/app-page-container";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FinishGoodValuationMasterType, GetFinishGoodValuation } from "@/actions/Merchandising/finish-good-valuation-action";
import { MasterDataTable } from "./finish-good-valuation-table";


function FinishGoodValuation() {
  const {
    data: data,
    isError,
    error
  } = GetFinishGoodValuation<FinishGoodValuationMasterType>();

  if (isError) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  useEffect(() => {
  }, []);

  return (
    <div className="pt-5">
      <div className="flex items-center justify-between border-b pb-0">
        <div className="font-bold text-2xl">Finish Goods Valuation</div>
        <div>
          <Link to={`${PageAction.add}/0`}>
            <Button className="mb-2" role="button">
              New Finish Goods Valuation
            </Button>
          </Link>
        </div>
      </div>
      <AppPageContainer>
        <div className="mt-3">
          {data ? (
            <MasterDataTable data={data} />
          ) : (
            <TableSkeleton />
          )}
        </div>
      </AppPageContainer>
    </div>
  );
}

export default FinishGoodValuation;
