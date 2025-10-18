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
  BUYER_ID: number;
  BUYER: string;
  STYLE_ID: number;
  STYLE: string;
  PO_ID: number;
  PO_NO: string;

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

  interface IStyle {
    Id: string;
    Styleno: string;
  };


  interface IBuyer {
    Id: string;
    NAME: string;
    DISPLAY_NAME: string;
  };

  interface IPO {
    Id: string;
    Pono: string;
  };


  const formSchema = z.object({
    FROM_DATE: z.date(),
    TO_DATE: z.date(),
    WORK_ORDER_ID: z.number().optional(),
    WORK_ORDER_NO: z.string().optional(),
    WORK_ORDER_RECEIVE_ID: z.number().optional(),
    WORK_ORDER_RECEIVE_NO: z.string().optional(),
    BUYER_ID: z.number().optional(),
    BUYER: z.string().optional(),
    STYLE_ID: z.number().optional(),
    STYLE: z.string().optional(),
    PO_ID: z.number().default(0),
    PO_NO: z.string().optional(),
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
      BUYER_ID: 0,
      BUYER: "",
      STYLE_ID: 0,
      STYLE: "",
      PO_ID: 0,
      PO_NO: "",
    },
  });

  const [searchData, setSearchData] = useState<ISearchData>({
    FROM_DATE: firstOfMonth,
    TO_DATE: today,
    WORK_ORDER_ID: 0,
    WORK_ORDER_NO: "",
    WORK_ORDER_RECEIVE_ID: 0,
    WORK_ORDER_RECEIVE_NO: "",
    BUYER_ID: 0,
    BUYER: "",
    STYLE_ID: 0,
    STYLE: "",
    PO_ID: 0,
    PO_NO: "",
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

  const [buyerData, setBuyerData] = useState<IBuyer[]>([]);
  const getBuyerData = async (woId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllBuyerByEmbWorkOrderReceive?id=" + woId);
    setBuyerData(response?.data);
  }

  const [style, setStyle] = useState<IStyle[]>([]);
  const getStyleByBuyer = async (woId: number, buyerId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllStyleByEmbWorkOrderReceiveAndBuyer?woId=" + woId + "&buyerId=" + buyerId);
    setStyle(response?.data);
  }

  const [PO, setPO] = useState<IPO[]>([]);
  const getPOByStyle = async (woId: number, styleId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllPoByEmbWorkOrderReceiveAndStyle?woId=" + woId + "&styleId=" + styleId);
    setPO(response?.data);
  }

  useEffect(() => {
    getWorkOrder();
    getEmbMtlRcv();
    getBuyerData(0);
  }, []);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fromDateFormatted = moment(searchData.FROM_DATE).format("DD-MMM-YY");
    const toDateFormatted = moment(searchData.TO_DATE).format("DD-MMM-YY");

    const response = await axios.get(api.ProductionUrl + "/production/EmbMaterialReceive?fromDate=" + fromDateFormatted
      + "&toDate=" + toDateFormatted
      + "&woId=" + searchData.WORK_ORDER_ID
      + "&woReceiveId=" + searchData.WORK_ORDER_RECEIVE_ID
      + "&buyerId=" + searchData.BUYER_ID
      + "&styleId=" + searchData.STYLE_ID
      + "&poId=" + searchData.PO_ID
    );
    setMasterData(response?.data);
  }
  const [openWorkOrder, setOpenWorkOrder] = useState(false);
  const [openMaterialReceive, setOpenMaterialReceive] = useState(false);

  const [masterData, setMasterData] = useState<EmbMaterialReceiveMasterType[] | null>(null);

  const [openBuyer, setOpenBuyer] = useState(false);
  const [openStyle, setOpenStyle] = useState(false);
  const [openPO, setOpenPO] = useState(false);

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
                        name="BUYER_ID"
                        render={({ field }) => (
                          <FormItem className="flex flex-col flex-1">
                            <FormLabel className="font-bold">Buyer</FormLabel>
                            <Popover open={openBuyer} onOpenChange={setOpenBuyer}>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openBuyer}
                                    className={cn(
                                      "w-full justify-between bg-emerald-100",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? buyerData?.find(
                                        (buyer) =>
                                          Number(buyer.Id) === field.value
                                      )?.NAME
                                      : "Select a buyer"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput placeholder="Search supplier..." className="h-9" />
                                  <CommandList>
                                    <CommandEmpty>No buyer found.</CommandEmpty>
                                    <CommandGroup>
                                      {buyerData?.map((buyer) => (
                                        <CommandItem
                                          value={buyer?.NAME}
                                          key={Number(buyer?.Id)}
                                          onSelect={() => {
                                            field.onChange(Number(buyer?.Id));
                                            setSearchData((prev) => ({
                                              ...prev,
                                              BUYER_ID: Number(buyer?.Id),
                                              BUYER: buyer?.NAME,
                                            }));
                                            getStyleByBuyer(Number(searchData.WORK_ORDER_ID), Number(buyer?.Id));

                                            setOpenBuyer(false);
                                          }}
                                        >

                                          {buyer?.NAME}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              Number(buyer?.Id) === field.value
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
                        name="STYLE_ID"
                        render={({ field }) => (
                          <FormItem className="flex flex-col flex-1">
                            <FormLabel className="font-bold">Style</FormLabel>
                            <Popover open={openStyle} onOpenChange={setOpenStyle}>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openStyle}
                                    className={cn(
                                      "w-full justify-between bg-emerald-100",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? style?.find(
                                        (style) =>
                                          Number(style.Id) === field.value
                                      )?.Styleno
                                      : "Select a style"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput placeholder="Search style..." className="h-9" />
                                  <CommandList>
                                    <CommandEmpty>No style found.</CommandEmpty>
                                    <CommandGroup>
                                      {style?.map((item) => (
                                        <CommandItem
                                          value={item.Styleno}
                                          key={item.Id}
                                          onSelect={() => {
                                            field.onChange(Number(item.Id));
                                            setSearchData((prev) => ({
                                              ...prev,
                                              STYLE_ID: Number(item.Id),
                                              STYLE: item.Styleno,
                                            }));
                                            setOpenStyle(false);
                                            getPOByStyle(Number(searchData.WORK_ORDER_ID), Number(item?.Id));
                                          }}
                                        >
                                          {item.Styleno}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              Number(item.Id) === field.value
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
                        name="PO_ID"
                        render={({ field }) => (
                          <FormItem className="flex flex-col flex-1">
                            <FormLabel className="font-bold">PO</FormLabel>
                            <Popover open={openPO} onOpenChange={setOpenPO}>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openPO}
                                    className={cn(
                                      "w-full justify-between bg-emerald-100",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? PO?.find(
                                        (po) =>
                                          Number(po.Id) === field.value
                                      )?.Pono
                                      : "Select a PO"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput placeholder="Search PO..." className="h-9" />
                                  <CommandList>
                                    <CommandEmpty>No PO found.</CommandEmpty>
                                    <CommandGroup>
                                      {PO?.map((item) => (
                                        <CommandItem
                                          value={item.Pono}
                                          key={item.Id}
                                          onSelect={() => {
                                            field.onChange(Number(item.Id));
                                            setSearchData((prev) => ({
                                              ...prev,
                                              PO_ID: Number(item.Id),
                                              PO_NO: item.Pono,
                                            }));
                                            setOpenPO(false);
                                          }}
                                        >
                                          {item.Pono}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              Number(item.Id) === field.value
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
