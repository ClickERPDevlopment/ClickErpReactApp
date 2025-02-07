/* eslint-disable react-hooks/exhaustive-deps */
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { useParams } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PageAction } from "@/utility/page-actions";
import BrandGroupForm from "./brand-group-form";
import { GetAllBrand } from "@/actions/get-brand";
import {
  GetSwtBrandGroupById,
  SwtMachineBrandGroupType,
} from "@/actions/Sweater/swt-mc-brand-group-action";
import useAxiosInstance from "@/lib/axios-instance";
import { AxiosError } from "axios";
import React from "react";

export default function BrandGroupCrud() {
  const { pageAction, id } = useParams();
  const axios = useAxiosInstance();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [machinegroup, setMachinegroup] =
    React.useState<SwtMachineBrandGroupType>();

  React.useEffect(() => {
    try {
      if (Number(id) > 0) {
        const getData = async () =>
          await GetSwtBrandGroupById(axios, Number(id));
        getData().then((res) => setMachinegroup(res));
      }
    } catch (error) {
      console.log(error);
      setErrorMessage((error as AxiosError).message);
    }
  }, [id]);

  const { data: lstBrand } = GetAllBrand();

  if (!pageAction) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Page Action type is required.</AlertDescription>
      </Alert>
    );
  }

  if (errorMessage) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
    );
  }

  if (id && Number(id) > 0) {
    if (!machinegroup) {
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
          Machine Group
        </h1>
        <BrandGroupForm
          data={machinegroup}
          pageAction={PageAction.view}
          lstBrand={lstBrand}
        />
      </div>
    );
  } else if (pageAction === PageAction.add) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          New Machine Brand Group
        </h1>
        <BrandGroupForm
          data={machinegroup}
          pageAction={PageAction.add}
          lstBrand={lstBrand}
        />
      </div>
    );
  } else if (pageAction === PageAction.edit) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          Update Machine Brand Group
        </h1>
        <BrandGroupForm
          data={machinegroup}
          pageAction={PageAction.edit}
          lstBrand={lstBrand}
        />
      </div>
    );
  } else if (pageAction === PageAction.delete) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full text-destructive mb-2">
          Delete Machine Brand Group
        </h1>
        <BrandGroupForm
          data={machinegroup}
          pageAction={PageAction.delete}
          lstBrand={lstBrand}
        />
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10"></div>
    );
  }
}
