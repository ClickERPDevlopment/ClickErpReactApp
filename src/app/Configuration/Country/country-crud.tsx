import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";
import { useParams } from "react-router";
import { GetCountryById } from "src/actions/get-country-action";
import { Alert, AlertDescription, AlertTitle } from "src/components/ui/alert";
import { PageAction } from "src/utility/page-actions";
import CountryForm from "./country-form";

export default function CountryCrud() {
  const { pageAction, id } = useParams();

  const { data: country, isError, error } = GetCountryById(Number(id));

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
    if (!country) {
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
        <h1 className="font-bold text-xl text-left w-full mb-2">Country</h1>
        <CountryForm data={country} pageAction={PageAction.view} />
      </div>
    );
  } else if (pageAction === PageAction.add) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">New Country</h1>
        <CountryForm data={undefined} pageAction={PageAction.add} />
      </div>
    );
  } else if (pageAction === PageAction.edit) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          Update Country
        </h1>
        <CountryForm data={country} pageAction={PageAction.edit} />
      </div>
    );
  } else if (pageAction === PageAction.delete) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full text-destructive mb-2">
          Delete Country
        </h1>
        <CountryForm data={country} pageAction={PageAction.delete} />
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10"></div>
    );
  }
}
