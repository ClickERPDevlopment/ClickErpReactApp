import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useParams, useSearchParams } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PageAction } from "@/utility/page-actions";
import PrintEmbProductionForm from "./print-emb-production-form";
import { GetPrintEmbProductionById, PrintEmbProductionMasterType } from "@/actions/PrintingEmbroidery/print-emb-production-action";

export default function PrintEmbProductionCrud() {

  const [searchParams] = useSearchParams();
  const CompanyId = Number(searchParams.get("CompanyId")) || 3;

  const { pageAction, id } = useParams();

  const {
    data: printEmbProductionData,
    isError,
    error,
  } = GetPrintEmbProductionById<PrintEmbProductionMasterType>(Number(id), CompanyId);


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
    if (!printEmbProductionData) {
      return (
        <h1>
          <em>Loading...</em>
        </h1>
      );
    }
  }


  if (pageAction === PageAction.view) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-5 mb-10 ">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          Print Emb Production
        </h1>
        <PrintEmbProductionForm
          data={printEmbProductionData}
          pageAction={PageAction.view}
          CompanyId={Number(CompanyId)}
        />
      </div>
    );
  } else if (pageAction === PageAction.add) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-5 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          Print Emb Production
        </h1>
        <PrintEmbProductionForm
          data={undefined}
          pageAction={PageAction.add}
          CompanyId={Number(CompanyId)}
        />
      </div>
    );
  } else if (pageAction === PageAction.edit) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-5 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          Update Print Emb Production
        </h1>
        <PrintEmbProductionForm
          data={printEmbProductionData}
          pageAction={PageAction.edit}
          CompanyId={Number(CompanyId)}
        />
      </div>
    );
  } else if (pageAction === PageAction.delete) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-5 mb-10">
        <h1 className="font-bold text-xl text-left w-full text-destructive mb-2">
          Delete Print Emb Production
        </h1>
        <PrintEmbProductionForm
          data={printEmbProductionData}
          pageAction={PageAction.delete}
          CompanyId={Number(CompanyId)}
        />
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10"></div>
    );
  }
}
