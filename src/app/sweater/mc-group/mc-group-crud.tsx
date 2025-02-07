import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";
import { useParams } from "react-router";
import { GetSwtMachineGroupById } from "src/actions/Sweater/swt-mc-group-action";
import { Alert, AlertDescription, AlertTitle } from "src/components/ui/alert";
import { PageAction } from "src/utility/page-actions";
import McGroupForm from "./mc-group-form";
import { GetAllFloor } from "src/actions/Configurations/floor-action";
import { GetAllEmployee } from "src/actions/Configurations/employee-action";
import { GetAllItemType } from "src/actions/Merchandising/item-type-action";
import { GetAllBrand } from "src/actions/get-brand";
import { GetAllSwtGauge } from "src/actions/Sweater/swt-gauge-action";

export default function McGroupCrud() {
  const { pageAction, id } = useParams();

  const { data: lstFloor } = GetAllFloor();
  const { data: lstSupervisor } = GetAllEmployee();
  const { data: lstItemType } = GetAllItemType();
  const { data: lstBrand } = GetAllBrand();
  const { data: lstGauge } = GetAllSwtGauge();

  const {
    data: machinegroup,
    isError,
    error,
  } = GetSwtMachineGroupById(Number(id));

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
        <McGroupForm
          data={machinegroup}
          pageAction={PageAction.view}
          lstFloor={lstFloor}
          lstSupervisor={lstSupervisor}
          lstItemType={lstItemType}
          lstBrand={lstBrand}
          lstGauge={lstGauge}
        />
      </div>
    );
  } else if (pageAction === PageAction.add) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          New Machine Group
        </h1>
        <McGroupForm
          data={undefined}
          pageAction={PageAction.add}
          lstFloor={lstFloor}
          lstSupervisor={lstSupervisor}
          lstItemType={lstItemType}
          lstBrand={lstBrand}
          lstGauge={lstGauge}
        />
      </div>
    );
  } else if (pageAction === PageAction.edit) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          Update MachineGroup
        </h1>
        <McGroupForm
          data={machinegroup}
          pageAction={PageAction.edit}
          lstFloor={lstFloor}
          lstSupervisor={lstSupervisor}
          lstItemType={lstItemType}
          lstBrand={lstBrand}
          lstGauge={lstGauge}
        />
      </div>
    );
  } else if (pageAction === PageAction.delete) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full text-destructive mb-2">
          Delete MachineGroup
        </h1>
        <McGroupForm
          data={machinegroup}
          pageAction={PageAction.delete}
          lstFloor={lstFloor}
          lstSupervisor={lstSupervisor}
          lstItemType={lstItemType}
          lstBrand={lstBrand}
          lstGauge={lstGauge}
        />
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10"></div>
    );
  }
}
