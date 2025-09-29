import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useParams, useSearchParams } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PageAction } from "@/utility/page-actions";
import { GetPrintEmbBillById, PrintEmbBillMasterType } from "@/actions/PrintingEmbroidery/print-emb-bill-action";
import PrintEmbBillForm from "./print-emb-bill-form";

export default function PrintEmbBillCrud() {

  const { pageAction, id } = useParams<{ pageAction: string; id: string }>();
  const [searchParams] = useSearchParams();

  // const pageIndex = searchParams.get("pageIndex") || "0";
  const CompanyId = searchParams.get("CompanyId") || "0";

  const {
    data: printEmbBillData,
    isError,
    error,
  } = GetPrintEmbBillById<PrintEmbBillMasterType>(
    Number(id),
    Number(CompanyId)
  );


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
    if (!printEmbBillData) {
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
          Print Emb Bill
        </h1>
        <PrintEmbBillForm
          data={printEmbBillData}
          pageAction={PageAction.view}
          CompanyId={Number(CompanyId)}
        />
      </div>
    );
  } else if (pageAction === PageAction.add) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-5 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          Print Emb Bill
        </h1>
        <PrintEmbBillForm
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
          Update Print Emb Bill
        </h1>
        <PrintEmbBillForm
          data={printEmbBillData}
          pageAction={PageAction.edit}
          CompanyId={Number(CompanyId)}
        />
      </div>
    );
  } else if (pageAction === PageAction.delete) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-5 mb-10">
        <h1 className="font-bold text-xl text-left w-full text-destructive mb-2">
          Delete Print Emb Bill
        </h1>
        <PrintEmbBillForm
          data={printEmbBillData}
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
