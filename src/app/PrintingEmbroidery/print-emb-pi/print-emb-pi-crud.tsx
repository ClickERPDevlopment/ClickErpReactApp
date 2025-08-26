import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useParams } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PageAction } from "@/utility/page-actions";
import { GetPrintEmbPIById, PrintEmbPIMasterType } from "@/actions/PrintingEmbroidery/print-emb-pi-action";
import PrintEmbPIForm from "./print-emb-pi-form";

export default function PrintEmbPICrud() {
  const { pageAction, id } = useParams();

  const {
    data: printEmbPIData,
    isError,
    error,
  } = GetPrintEmbPIById<PrintEmbPIMasterType>(Number(id));


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
    if (!printEmbPIData) {
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
          Print Emb PI
        </h1>
        <PrintEmbPIForm
          data={printEmbPIData}
          pageAction={PageAction.view}
        />
      </div>
    );
  } else if (pageAction === PageAction.add) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-5 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          Print Emb PI
        </h1>
        <PrintEmbPIForm
          data={undefined}
          pageAction={PageAction.add}
        />
      </div>
    );
  } else if (pageAction === PageAction.edit) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-5 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          Update Print Emb PI
        </h1>
        <PrintEmbPIForm
          data={printEmbPIData}
          pageAction={PageAction.edit}
        />
      </div>
    );
  } else if (pageAction === PageAction.delete) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-5 mb-10">
        <h1 className="font-bold text-xl text-left w-full text-destructive mb-2">
          Delete Print Emb PI
        </h1>
        <PrintEmbPIForm
          data={printEmbPIData}
          pageAction={PageAction.delete}
        />
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10"></div>
    );
  }
}
