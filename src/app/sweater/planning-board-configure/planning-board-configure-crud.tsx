import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { useParams } from "react-router";
import {
  GetSwtPlanningBoardDataById,
  planningBoardConfigureType,
} from "@/actions/Sweater/swt-planning-board-configure-action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PageAction } from "@/utility/page-actions";
import PlanningBoardConfigureForm from "./planning-board-configure-form";

export default function PlanningBoardConfigureCrud() {
  const { pageAction, id } = useParams();

  const {
    data: SwtPnanningBoard,
    isError,
    error,
  } = GetSwtPlanningBoardDataById<planningBoardConfigureType>(Number(id));

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
    if (!SwtPnanningBoard) {
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
          Planning Board
        </h1>
        <PlanningBoardConfigureForm
          data={SwtPnanningBoard}
          pageAction={PageAction.view}
        />
      </div>
    );
  } else if (pageAction === PageAction.add) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          Planning Board Configure
        </h1>
        <PlanningBoardConfigureForm
          data={undefined}
          pageAction={PageAction.add}
        />
      </div>
    );
  } else if (pageAction === PageAction.edit) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full mb-2">
          Update Planning Board
        </h1>
        <PlanningBoardConfigureForm
          data={SwtPnanningBoard}
          pageAction={PageAction.edit}
        />
      </div>
    );
  } else if (pageAction === PageAction.delete) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-10">
        <h1 className="font-bold text-xl text-left w-full text-destructive mb-2">
          Delete Planning Board
        </h1>
        <PlanningBoardConfigureForm
          data={SwtPnanningBoard}
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
