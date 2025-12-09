import { Link, useSearchParams } from "react-router";
import TableSkeleton from "@/components/table-skeleton";
import { PageAction } from "@/utility/page-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import AppPageContainer from "@/components/app-page-container";
import { PrintEmbProductionTable } from "./print-emb-production-table";
import { GetPrintEmbProduction, PrintEmbProductionMasterType } from "@/actions/PrintingEmbroidery/print-emb-production-action";

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
import { ISearchData, usePrintEmbProductionSearchStore } from "./print-emb-production-store";

function PrintEmbProductionIndex() {

  const { searchData, setField } = usePrintEmbProductionSearchStore();

  const [searchParams] = useSearchParams();
  const CompanyId = Number(searchParams.get("CompanyId")) || 3;


  const {
    data: printEmbProductionData,
    isError,
    error
  } = GetPrintEmbProduction<PrintEmbProductionMasterType>(CompanyId);

  if (isError) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }


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


  interface IType {
    ID: number;
    NAME: string;
  };


  interface IRcvWorkOrder {
    ID: number;
    WORK_ORDER_NO: string;
  };


  const formSchema = z.object({
    FROM_DATE: z.string(),
    TO_DATE: z.string(),
    WORK_ORDER_ID: z.number().optional(),
    WORK_ORDER_NO: z.string().optional(),
    BUYER_ID: z.number().optional(),
    BUYER: z.string().optional(),
    STYLE_ID: z.number().optional(),
    STYLE: z.string().optional(),
    PO_ID: z.number().default(0),
    PO_NO: z.string().optional(),
    TYPE_ID: z.number().optional(),
    TYPE: z.string().optional(),
  });

  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(toDate.getDate() - 7);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FROM_DATE: searchData.FROM_DATE,
      TO_DATE: searchData.TO_DATE,
      WORK_ORDER_ID: searchData.WORK_ORDER_ID,
      WORK_ORDER_NO: searchData.WORK_ORDER_NO,
      BUYER_ID: searchData.BUYER_ID,
      BUYER: searchData.BUYER,
      STYLE_ID: searchData.STYLE_ID,
      STYLE: searchData.STYLE,
      PO_ID: searchData.PO_ID,
      PO_NO: searchData.PO_NO,
      TYPE_ID: searchData.TYPE_ID,
      TYPE: searchData.TYPE,
    },
  });


  const axios = useAxiosInstance();
  const api = useApiUrl();

  const [workOrder, setWorkOrder] = useState<IRcvWorkOrder[]>(
    searchData?.WORK_ORDER_ID
      ? [
        {
          ID: searchData.WORK_ORDER_ID,
          WORK_ORDER_NO: searchData.WORK_ORDER_NO,
        },
      ]
      : []
  );
  const getWorkOrder = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive");
    setWorkOrder(response?.data);
  }

  const [buyerData, setBuyerData] = useState<IBuyer[]>(
    searchData?.BUYER_ID
      ? [
        {
          Id: searchData.BUYER_ID.toString(),
          NAME: searchData.BUYER,
          DISPLAY_NAME: "",
        },
      ]
      : []
  );
  const getBuyerData = async (woId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllBuyerByEmbWorkOrderReceive?id=" + woId);
    setBuyerData(response?.data);
  }

  const [style, setStyle] = useState<IStyle[]>(
    searchData?.STYLE_ID
      ? [
        {
          Id: searchData.STYLE_ID.toString(),
          Styleno: searchData.STYLE,
        },
      ]
      : []
  );
  const getStyleByBuyer = async (woId: number, buyerId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllStyleByEmbWorkOrderReceiveAndBuyer?woId=" + woId + "&buyerId=" + buyerId);
    setStyle(response?.data);
  }

  const [PO, setPO] = useState<IPO[]>(
    searchData?.PO_ID
      ? [
        {
          Id: searchData.PO_ID.toString(),
          Pono: searchData.PO_NO,
        },
      ]
      : []
  );
  const getPOByStyle = async (woId: number, styleId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllPoByEmbWorkOrderReceiveAndStyle?woId=" + woId + "&styleId=" + styleId);
    setPO(response?.data);
  }

  const [productionType, setProductionType] = useState<IType[]>(
    searchData?.TYPE_ID
      ? [
        {
          ID: searchData.TYPE_ID,
          NAME: searchData.TYPE,
        },
      ]
      : []
  );
  const getProductionType = async () => {
    const response = await axios.get(api.ProductionUrl + `/production/PrintEmbProductionType`);
    setProductionType(response?.data);
  }

  useEffect(() => {
    getWorkOrder();
    getProductionType();
    getBuyerData(0);
    getStyleByBuyer(0, 0);
    getPOByStyle(0, 0);
  }, []);


  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetchData();
  }

  useEffect(() => {
    if (isSearchValid(searchData)) {
      fetchData();
    }
  }, [searchData]);

  const isSearchValid = (data: ISearchData) => {
    return (
      data.FROM_DATE ||
      data.TO_DATE ||
      data.WORK_ORDER_ID > 0 ||
      data.TYPE_ID > 0 ||
      data.BUYER_ID > 0 ||
      data.STYLE_ID > 0 ||
      data.PO_ID > 0
    );
  };

  async function fetchData() {

    const fromDateFormatted = moment(searchData.FROM_DATE).format("DD-MMM-YY");
    const toDateFormatted = moment(searchData.TO_DATE).format("DD-MMM-YY");

    const response = await axios.get(api.ProductionUrl + `/production/${CompanyId}/PrintEmbProduction?fromDate=` + fromDateFormatted + "&toDate=" + toDateFormatted + "&typeId=" + searchData.TYPE_ID + "&woId=" + searchData.WORK_ORDER_ID + "&buyerId=" + searchData.BUYER_ID + "&styleId=" + searchData.STYLE_ID + "&poId=" + searchData.PO_ID);
    setMasterData(response?.data);

  }


  const [openBuyer, setOpenBuyer] = useState(false);
  const [openStyle, setOpenStyle] = useState(false);
  const [openPO, setOpenPO] = useState(false);
  const [openProductionType, setOpenProductionType] = useState(false);
  const [openWorkOrder, setOpenWorkOrder] = useState(false);
  const [masterData, setMasterData] = useState<PrintEmbProductionMasterType[] | null>(null);


  return (
    <div className="pt-5">
      <div className="flex items-center justify-between border-b pb-0">
        <div className="font-bold text-2xl">Print Emb Production</div>
        <div>
          <Link to={`${PageAction.add}/0?CompanyId=` + CompanyId}>
            <Button className="mb-2" role="button">
              New Print Emb Production
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
                                value={field.value ? new Date(field.value).toLocaleDateString("en-CA") : ''}
                                onChange={(e) => {
                                  const newDate = e.target.value ? new Date(e.target.value) : null;
                                  field.onChange(newDate);
                                  setField("FROM_DATE", new Date(e.target.value).toLocaleDateString("en-CA"));
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
                                value={field.value ? new Date(field.value).toLocaleDateString("en-CA") : ''}
                                onChange={(e) => {
                                  const newDate = e.target.value ? new Date(e.target.value) : null;
                                  field.onChange(newDate);
                                  setField("TO_DATE", new Date(e.target.value).toLocaleDateString("en-CA"));
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
                        name="WORK_ORDER_NO"
                        render={({ field }) => (
                          <FormItem className="flex flex-col flex-1">
                            <FormLabel className="font-bold">Order</FormLabel>
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
                                            setField("WORK_ORDER_ID", Number(workOrderData.ID));
                                            setField("WORK_ORDER_NO", workOrderData.WORK_ORDER_NO);
                                            setOpenWorkOrder(false);
                                            getBuyerData(workOrderData.ID)
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
                        name="TYPE_ID"
                        render={({ field }) => (
                          <FormItem className="flex flex-col flex-1">
                            <FormLabel className="font-bold">Type</FormLabel>
                            <Popover open={openProductionType} onOpenChange={setOpenProductionType}>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openProductionType}
                                    className={cn(
                                      "w-full justify-between bg-emerald-100",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? productionType?.find(
                                        (type) =>
                                          Number(type.ID) === Number(field.value)
                                      )?.NAME
                                      : "Select a production type"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput placeholder="Search production type..." className="h-9" />
                                  <CommandList>
                                    <CommandEmpty>No production type found.</CommandEmpty>
                                    <CommandGroup>
                                      {productionType?.map((typeData) => (
                                        <CommandItem
                                          value={typeData.NAME}
                                          key={typeData.ID}
                                          onSelect={() => {
                                            setField("TYPE_ID", Number(typeData.ID));
                                            setField("TYPE", typeData.NAME);
                                            setOpenProductionType(false);
                                          }}
                                        >
                                          {typeData.NAME}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              Number(typeData.ID) === Number(field.value)
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
                                            setField("BUYER_ID", Number(buyer?.Id));
                                            setField("BUYER", buyer?.NAME);
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
                                            setField("STYLE_ID", Number(item.Id));
                                            setField("STYLE", item.Styleno);
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
                                            setField("PO_ID", Number(item.Id));
                                            setField("PO_NO", item.Pono);
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
          {printEmbProductionData ? (
            <PrintEmbProductionTable data={masterData ?? []} CompanyId={CompanyId} />
          ) : (
            <TableSkeleton />
          )}
        </div>
      </AppPageContainer>
    </div>
  );
}

export default PrintEmbProductionIndex;
