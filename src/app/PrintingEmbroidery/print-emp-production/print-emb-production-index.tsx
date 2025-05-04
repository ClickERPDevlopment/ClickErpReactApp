import { Link } from "react-router";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import { PageAction } from "@/utility/page-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import AppPageContainer from "@/components/app-page-container";
import { PrintEmbProductionTable } from "./print-emb-production-table";
import { GetPrintEmbProduction, PrintEmbProductionMasterType } from "@/actions/PrintingEmbroidery/print-emb-production-action";

function PrintEmbProductionIndex() {
  const {
    data: printEmbProductionData,
    isError,
    error,
  } = GetPrintEmbProduction<PrintEmbProductionMasterType>();

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
        <div className="font-bold text-2xl">Print Emb Production</div>
        <div>
          <Link to={`${PageAction.add}/0`}>
            <Button className="mb-2" role="button">
              New Print Emb Production
            </Button>
          </Link>
        </div>
      </div>
      <AppPageContainer>
        <div className="mt-3">
          {printEmbProductionData ? (
            <PrintEmbProductionTable data={printEmbProductionData} />
          ) : (
            <TableSkeleton />
          )}
        </div>
      </AppPageContainer>
    </div>
  );
}

export default PrintEmbProductionIndex;
