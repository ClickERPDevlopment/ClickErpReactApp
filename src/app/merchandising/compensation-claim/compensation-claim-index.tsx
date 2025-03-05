import { Link } from "react-router";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import { PageAction } from "@/utility/page-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import AppPageContainer from "@/components/app-page-container";
import { CompensationClaimTable } from "./compensation-claim-table";
import { CompensationClaimMasterType, GetCompensationClaim } from "@/actions/Merchandising/compensation-claim-action";

function CompensationClaimIndex() {
  const {
    data: compensationClaimData,
    isError,
    error,
  } = GetCompensationClaim<CompensationClaimMasterType>();

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
        <div className="font-bold text-2xl">Compnesation Claim</div>
        <div>
          <Link to={`${PageAction.add}/0`}>
            <Button className="mb-2" role="button">
              New Compnesation Claim
            </Button>
          </Link>
        </div>
      </div>
      <AppPageContainer>
        <div className="mt-3">
          {compensationClaimData ? (
            <CompensationClaimTable data={compensationClaimData} />
          ) : (
            <TableSkeleton />
          )}
        </div>
      </AppPageContainer>
    </div>
  );
}

export default CompensationClaimIndex;
