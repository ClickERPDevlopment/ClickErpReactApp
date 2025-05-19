import { Link } from "react-router";
import TableSkeleton from "@/components/table-skeleton";
import { PageAction } from "@/utility/page-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import AppPageContainer from "@/components/app-page-container";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import useAxiosInstance from "@/lib/axios-instance";
import { cn } from "@/lib/utils";
import { z } from "zod";

import useApiUrl from "@/hooks/use-ApiUrl";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import moment from "moment";
import { PrintEmbMaterialReceiveTable } from "./print-emb-material-receive-table";
import { EmbMaterialReceiveMasterType, GetPrintEmbMaterialReceive } from "@/actions/PrintingEmbroidery/print-emb-material-receive-action";


interface ISearchData {
  FROM_DATE: Date;
  TO_DATE: Date;
  WORK_ORDER_ID: number;
  WORK_ORDER_NO: string;
  WORK_ORDER_RECEIVE_ID: number;
  WORK_ORDER_RECEIVE_NO: string;
};


function PrintEmbMaterialReceiveIndex() {
  const {
    data: data,
    isError,
    error
  } = GetPrintEmbMaterialReceive<EmbMaterialReceiveMasterType>();

  if (isError) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  interface IRcvWorkOrder {
    ID: number;
    WORK_ORDER_NO: string;
  };


  const formSchema = z.object({
    FROM_DATE: z.date(),
    TO_DATE: z.date(),
    WORK_ORDER_ID: z.number().optional(),
    WORK_ORDER_NO: z.string().optional(),
    WORK_ORDER_RECEIVE_ID: z.number().optional(),
    WORK_ORDER_RECEIVE_NO: z.string().optional(),
  });

  const today = new Date();
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FROM_DATE: firstOfMonth,
      TO_DATE: today,
      WORK_ORDER_ID: 0,
      WORK_ORDER_NO: "",
      WORK_ORDER_RECEIVE_ID: 0,
      WORK_ORDER_RECEIVE_NO: "",
    },
  });

  const [searchData, setSearchData] = useState<ISearchData>({
    FROM_DATE: firstOfMonth,
    TO_DATE: today,
    WORK_ORDER_ID: 0,
    WORK_ORDER_NO: "",
    WORK_ORDER_RECEIVE_ID: 0,
    WORK_ORDER_RECEIVE_NO: "",
  });



  const axios = useAxiosInstance();
  const api = useApiUrl();

  const [workOrder, setWorkOrder] = useState<IRcvWorkOrder[]>([]);
  const getWorkOrder = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive");
    setWorkOrder(response?.data);
  }

  const [embMaterialReceive, setEmbMaterialReceive] = useState<EmbMaterialReceiveMasterType[]>([]);
  const getEmbMtlRcv = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbMaterialReceive");
    setEmbMaterialReceive(response?.data);
  }

  useEffect(() => {
    getWorkOrder();
    getEmbMtlRcv();
  }, []);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fromDateFormatted = moment(searchData.FROM_DATE).format("DD-MMM-YY");
    const toDateFormatted = moment(searchData.TO_DATE).format("DD-MMM-YY");

    const response = await axios.get(api.ProductionUrl + "/production/EmbMaterialReceive?fromDate=" + fromDateFormatted + "&toDate=" + toDateFormatted + "&woId=" + searchData.WORK_ORDER_ID + "&woReceiveId=" + searchData.WORK_ORDER_RECEIVE_ID);
    setMasterData(response?.data);
  }
  const [openWorkOrder, setOpenWorkOrder] = useState(false);
  const [openMaterialReceive, setOpenMaterialReceive] = useState(false);

  const [masterData, setMasterData] = useState<EmbMaterialReceiveMasterType[] | null>(null);

  return (
    <div className="pt-5">
      <div className="flex items-center justify-between border-b pb-0">
        <div className="font-bold text-2xl">Material Receive</div>
        <div>
          <Link to={`${PageAction.add}/0`}>
            <Button className="mb-2" role="button">
              New Material Receive
            </Button>
          </Link>
        </div>
      </div>
      <AppPageContainer>
        <div>
          <div className="border p-1">
            <Form {...form} >
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
                className=""
              >
                <div className="flex flex-wrap gap-2">
                  <div className="flex justify-between gap-1 items-end">

                    <div className="flex justify-between items-end">
                      <FormField
                        control={form.control}
                        name="FROM_DATE"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-bold">From Date</FormLabel>
                            <FormControl>
                              <Input
                                style={{ marginTop: "2px" }}
                                placeholder=""
                                type="date"
                                value={field.value ? field.value.toISOString().slice(0, 10) : ''}
                                onChange={(e) => {
                                  const newDate = e.target.value ? new Date(e.target.value) : null;
                                  field.onChange(newDate);
                                  setSearchData((prev) => ({
                                    ...prev,
                                    FROM_DATE: new Date(e.target.value),
                                  }));
                                }}
                                className="form-control w-full h-9"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>


                    <div className="flex justify-between items-end">
                      <FormField
                        control={form.control}
                        name="TO_DATE"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-bold">To Date</FormLabel>
                            <FormControl>
                              <Input
                                style={{ marginTop: "2px" }}
                                placeholder=""
                                type="date"
                                value={field.value ? field.value.toISOString().slice(0, 10) : ''}
                                onChange={(e) => {
                                  const newDate = e.target.value ? new Date(e.target.value) : null;
                                  field.onChange(newDate);
                                  setSearchData((prev) => ({
                                    ...prev,
                                    TO_DATE: new Date(e.target.value),
                                  }));
                                }}
                                className="form-control w-full h-9"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-between items-end">
                      <FormField
                        control={form.control}
                        name="WORK_ORDER_RECEIVE_NO"
                        render={({ field }) => (
                          <FormItem className="flex flex-col flex-1">
                            <FormLabel className="font-bold">Work Order Receive</FormLabel>
                            <Popover open={openWorkOrder} onOpenChange={setOpenWorkOrder}>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openWorkOrder}
                                    className={cn(
                                      "w-full justify-between bg-emerald-100",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? workOrder?.find(
                                        (workOrderData) =>
                                          Number(workOrderData.ID) === Number(field.value)
                                      )?.WORK_ORDER_NO
                                      : "Select a order"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput placeholder="Search production type..." className="h-9" />
                                  <CommandList>
                                    <CommandEmpty>No order found.</CommandEmpty>
                                    <CommandGroup>
                                      {workOrder?.map((workOrderData) => (
                                        <CommandItem
                                          value={workOrderData.WORK_ORDER_NO}
                                          key={workOrderData.ID}
                                          onSelect={() => {
                                            field.onChange(Number(workOrderData.ID));
                                            setSearchData((prev) => ({
                                              ...prev,
                                              WORK_ORDER_RECEIVE_ID: Number(workOrderData.ID),
                                              WORK_ORDER_RECEIVE_NO: workOrderData.WORK_ORDER_NO,
                                            }));
                                            setOpenWorkOrder(false);
                                          }}
                                        >
                                          {workOrderData.WORK_ORDER_NO}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              Number(workOrderData.ID) === Number(field.value)
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-between items-end">
                      <FormField
                        control={form.control}
                        name="WORK_ORDER_NO"
                        render={({ field }) => (
                          <FormItem className="flex flex-col flex-1">
                            <FormLabel className="font-bold">Material Receive No</FormLabel>
                            <Popover open={openMaterialReceive} onOpenChange={setOpenMaterialReceive}>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openMaterialReceive}
                                    className={cn(
                                      "w-full justify-between bg-emerald-100",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? embMaterialReceive?.find(
                                        (workOrderData) =>
                                          Number(workOrderData.ID) === Number(field.value)
                                      )?.MATERIAL_RECEIVE_NO
                                      : "Select a order"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput placeholder="Search receive no..." className="h-9" />
                                  <CommandList>
                                    <CommandEmpty>No receive found.</CommandEmpty>
                                    <CommandGroup>
                                      {embMaterialReceive?.map((workOrderData) => (
                                        <CommandItem
                                          value={workOrderData.MATERIAL_RECEIVE_NO}
                                          key={workOrderData.ID}
                                          onSelect={() => {
                                            field.onChange(Number(workOrderData.ID));
                                            setSearchData((prev) => ({
                                              ...prev,
                                              WORK_ORDER_ID: Number(workOrderData.ID),
                                              WORK_ORDER_NO: workOrderData.MATERIAL_RECEIVE_NO,
                                            }));
                                            setOpenMaterialReceive(false);
                                          }}
                                        >
                                          {workOrderData.MATERIAL_RECEIVE_NO}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              Number(workOrderData.ID) === Number(field.value)
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                  </div>
                </div>
                <div className={cn("flex justify-between mt-4")}>
                  <div className="flex gap-2">
                    <Button
                      type="submit">
                      Search
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <div className="mt-3">
          {data ? (
            <PrintEmbMaterialReceiveTable data={masterData || data} />
          ) : (
            <TableSkeleton />
          )}
        </div>
      </AppPageContainer>
    </div>
  );
}

export default PrintEmbMaterialReceiveIndex;
