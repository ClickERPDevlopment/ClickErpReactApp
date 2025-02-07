import { Link } from "react-router";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import { PageAction } from "@/utility/page-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { BrandGroupTable } from "./brand-group-table";
import {
  GetSwtBrandGroup,
  SwtMachineBrandGroupType,
} from "@/actions/Sweater/swt-mc-brand-group-action";
import useAxiosInstance from "@/lib/axios-instance";
import { AxiosError } from "axios";
import React from "react";

export default function BrandGroupIndex() {
  const [data, setData] = React.useState<SwtMachineBrandGroupType[]>([]);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const axios = useAxiosInstance();

  React.useEffect(() => {
    const getData = async () => await GetSwtBrandGroup(axios);
    try {
      getData().then((res) => setData(res));
    } catch (error) {
      setErrorMessage((error as AxiosError).message);
    }
  }, [0]);

  if (errorMessage) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="pt-5">
      <div className="flex items-center justify-between border-b pb-0">
        <div className="font-bold text-2xl">Machine Brand Group</div>
        <div>
          <Link to={`${PageAction.add}/0`}>
            <Button className="mb-2" role="button">
              Add New M/C Brand Group
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-3">
        {data ? <BrandGroupTable data={data} /> : <TableSkeleton />}
      </div>
    </div>
  );
}
