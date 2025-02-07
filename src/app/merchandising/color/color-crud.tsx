import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { useParams } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PageAction } from "@/utility/page-actions";
import { GetBuyer } from "@/actions/Sweater/merch-buyer-action";
import ColorForm from "./color-form";
import { GetColorById } from "@/actions/Merchandising/merch-color-action";

export default function ColorCrud() {
  const { pageAction, id } = useParams();

  const { data: buyerData } = GetBuyer();

  const { data: color, isError, error } = GetColorById(Number(id));

  if (!pageAction) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Page Action type is required.</AlertDescription>
      </Alert>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  if (id && Number(id) > 0) {
    if (!color) {
      return (
        <h1>
          <em>Loading...</em>
        </h1>
      );
    }
  }

  if (pageAction === PageAction.view) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10 ">
        <h1 className="font-bold text-xl text-left w-full mb-2">Color</h1>
        <ColorForm
          data={color}
          lstBuyer={buyerData}
          pageAction={PageAction.view}
        />
      </div>
    );
  } else if (pageAction === PageAction.add) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">New Color</h1>
        <ColorForm
          data={undefined}
          lstBuyer={buyerData}
          pageAction={PageAction.add}
        />
      </div>
    );
  } else if (pageAction === PageAction.edit) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          Update Color
        </h1>
        <ColorForm
          data={color}
          lstBuyer={buyerData}
          pageAction={PageAction.edit}
        />
      </div>
    );
  } else if (pageAction === PageAction.delete) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full text-destructive mb-2">
          Delete Color
        </h1>
        <ColorForm
          data={color}
          lstBuyer={buyerData}
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
