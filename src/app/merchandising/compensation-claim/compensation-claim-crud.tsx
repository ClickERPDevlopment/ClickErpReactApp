import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useParams } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PageAction } from "@/utility/page-actions";
import CompensationClaimForm from "./compensation-claim-form";
import { CompensationClaimMasterType, getClaimId, GetCompensationClaimById } from "@/actions/Merchandising/compensation-claim-action";

export default function CompensationClaimCrud() {
  const { pageAction, id } = useParams();

  const {
    data: compensationClaimData,
    isError,
    error,
  } = GetCompensationClaimById<CompensationClaimMasterType>(Number(id));

  const { data: claimId } = getClaimId<string>();

  if (!pageAction) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Page Action type is required.</AlertDescription>
      </Alert>
    );
  }

  if (id && isError) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  if (id && Number(id) > 0) {
    if (!compensationClaimData) {
      return (
        <h1>
          <em>Loading...</em>
        </h1>
      );
    }
  }

  if (claimId === undefined || claimId === null || claimId === "") {
    return (
      <h1>
        <em>Loading...</em>
      </h1>
    );
  }

  if (pageAction === PageAction.view) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10 ">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          Compensation Claim
        </h1>
        <CompensationClaimForm
          data={compensationClaimData}
          pageAction={PageAction.view}
          claimId={claimId || ""}
        />
      </div>
    );
  } else if (pageAction === PageAction.add) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          Compensation Claim
        </h1>
        <CompensationClaimForm
          data={undefined}
          pageAction={PageAction.add}
          claimId={claimId || ""}
        />
      </div>
    );
  } else if (pageAction === PageAction.edit) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          Update Compensation Claim
        </h1>
        <CompensationClaimForm
          data={compensationClaimData}
          pageAction={PageAction.edit}
          claimId={claimId || ""}
        />
      </div>
    );
  } else if (pageAction === PageAction.delete) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full text-destructive mb-2">
          Delete Compensation Claim
        </h1>
        <CompensationClaimForm
          data={compensationClaimData}
          pageAction={PageAction.delete}
          claimId={claimId || ""}
        />
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10"></div>
    );
  }
}
