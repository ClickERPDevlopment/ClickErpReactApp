import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";
import { useParams } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "src/components/ui/alert";
import { PageAction } from "src/utility/page-actions";
import { GetBuyerById, GetBuyer } from "src/actions/Sweater/merch-buyer-action";
import { GetColorById } from "src/actions/Merchandising/merch-color-action";
import SizeForm from "./size-form";
import { GetSizeById } from "src/actions/Merchandising/merch-size-action";

export default function SizeCrud() {
  const { pageAction, id } = useParams();

  const { data: buyerData } = GetBuyer();

  const {
    data: color,
    isError,
    error,
  } = GetSizeById(Number(id));

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
        <h1 className="font-bold text-xl text-left w-full mb-2">
          Color
        </h1>
        <SizeForm
          data={color}
          lstBuyer={buyerData}
          pageAction={PageAction.view}
        />
      </div>
    );
  } else if (pageAction === PageAction.add) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          New Size
        </h1>
        <SizeForm
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
          Update Size
        </h1>
        <SizeForm
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
          Delete Size
        </h1>
        <SizeForm
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
