import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { useParams } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PageAction } from "@/utility/page-actions";
import BuyerForm from "./buyer-form";
import { GetBuyerById, GetBuyer } from "@/actions/Sweater/merch-buyer-action";
import { GetCountry } from "@/actions/get-country-action";
export default function BuyerCrud() {
  const { pageAction, id } = useParams();

  const { data: mainBuyer } = GetBuyer();
  const { data: country } = GetCountry();

  const { data: buyer, isError, error } = GetBuyerById(Number(id));

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
    if (!buyer) {
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
        <h1 className="font-bold text-xl text-left w-full mb-2">Buyer</h1>
        <BuyerForm
          data={buyer}
          lstMainBuyer={mainBuyer}
          lstCountry={country}
          pageAction={PageAction.view}
        />
      </div>
    );
  } else if (pageAction === PageAction.add) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">New Buyer</h1>
        <BuyerForm
          data={undefined}
          lstMainBuyer={mainBuyer}
          lstCountry={country}
          pageAction={PageAction.add}
        />
      </div>
    );
  } else if (pageAction === PageAction.edit) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          Update Buyer
        </h1>
        <BuyerForm
          data={buyer}
          lstMainBuyer={mainBuyer}
          lstCountry={country}
          pageAction={PageAction.edit}
        />
      </div>
    );
  } else if (pageAction === PageAction.delete) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full text-destructive mb-2">
          Delete Buyer
        </h1>
        <BuyerForm
          data={buyer}
          lstMainBuyer={mainBuyer}
          lstCountry={country}
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
