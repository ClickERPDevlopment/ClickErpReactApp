import { Link, useSearchParams } from "react-router";
import TableSkeleton from "@/components/table-skeleton";
import { PageAction } from "@/utility/page-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CaretSortIcon, CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import AppPageContainer from "@/components/app-page-container";
import { PrintEmbProductionSearchType } from "@/actions/PrintingEmbroidery/print-emb-production-action";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import moment from "moment";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { GetPrintEmbBill, PrintEmbBillMasterType } from "@/actions/PrintingEmbroidery/print-emb-bill-action";
import { PrintEmbBillTable } from "./print-emb-bill-table";

const [searchParams] = useSearchParams();
const CompanyId = Number(searchParams.get("CompanyId")) || 3;


function PrintEmbBillIndex() {

  const {
    data: printEmbDeliveryData,
    isError,
    error
  } = GetPrintEmbBill<PrintEmbBillMasterType>(CompanyId);

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
      FROM_DATE: fromDate.toLocaleDateString("en-CA"),
      TO_DATE: toDate.toLocaleDateString("en-CA"),
      WORK_ORDER_ID: 0,
      WORK_ORDER_NO: "",
      BUYER_ID: 0,
      BUYER: "",
      STYLE_ID: 0,
      STYLE: "",
      PO_ID: 0,
      PO_NO: "",
      TYPE_ID: 0,
      TYPE: "",
    },
  });

  const [searchData, setSearchData] = useState<PrintEmbProductionSearchType>({
    FROM_DATE: fromDate.toLocaleDateString("en-CA"),
    TO_DATE: toDate.toLocaleDateString("en-CA"),
    WORK_ORDER_ID: 0,
    WORK_ORDER_NO: "",
    BUYER_ID: 0,
    BUYER: "",
    STYLE_ID: 0,
    STYLE: "",
    PO_ID: 0,
    PO_NO: "",
    TYPE_ID: 0,
    TYPE: "",
  });

  const axios = useAxiosInstance();
  const api = useApiUrl();

  const [workOrder, setWorkOrder] = useState<IRcvWorkOrder[]>([]);
  const getWorkOrder = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive");
    setWorkOrder(response?.data);
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
    getBuyerData(0);
    getStyleByBuyer(0, 0);
    getPOByStyle(0, 0);
  }, []);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fromDateFormatted = moment(searchData.FROM_DATE).format("DD-MMM-YY");
    const toDateFormatted = moment(searchData.TO_DATE).format("DD-MMM-YY");

    const url = `${api.ProductionUrl}/production/${CompanyId}/PrintEmbBill` +
      `?fromDate=${fromDateFormatted}` +
      `&toDate=${toDateFormatted}` +
      `&typeId=${searchData.TYPE_ID}` +
      `&woId=${searchData.WORK_ORDER_ID}` +
      `&buyerId=${searchData.BUYER_ID}` +
      `&styleId=${searchData.STYLE_ID}` +
      `&poId=${searchData.PO_ID}`;

    try {
      const response = await axios.get(url);
      setMasterData(response?.data);
    } catch (error) {
      console.error("Error fetching PrintEmbBill data:", error);
    }
  }

  const [openBuyer, setOpenBuyer] = useState(false);
  const [openStyle, setOpenStyle] = useState(false);
  const [openPO, setOpenPO] = useState(false);
  const [openWorkOrder, setOpenWorkOrder] = useState(false);

  const [masterData, setMasterData] = useState<PrintEmbBillMasterType[] | null>(null);

  return (
    <div className="pt-5">
      <div className="flex items-center justify-between border-b pb-0">
        <div className="font-bold text-2xl">Print Emb Bill</div>
        <div>
          <Link to={`${PageAction.add}/0?CompanyId=` + CompanyId}>
            <Button className="mb-2" role="button">
              New Print Emb Bill
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
                                  setSearchData((prev) => ({
                                    ...prev,
                                    FROM_DATE: new Date(e.target.value).toLocaleDateString("en-CA"),
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
                                value={field.value ? new Date(field.value).toLocaleDateString("en-CA") : ''}
                                onChange={(e) => {
                                  const newDate = e.target.value ? new Date(e.target.value) : null;
                                  field.onChange(newDate);
                                  setSearchData((prev) => ({
                                    ...prev,
                                    TO_DATE: new Date(e.target.value).toLocaleDateString("en-CA"),
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
                                            setSearchData((prev) => ({
                                              ...prev,
                                              WORK_ORDER_ID: Number(workOrderData.ID),
                                              WORK_ORDER_NO: workOrderData.WORK_ORDER_NO,
                                            }));
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
          {printEmbDeliveryData ? (
            <PrintEmbBillTable data={masterData || printEmbDeliveryData || []} CompanyId={CompanyId} />
          ) : (
            <TableSkeleton />
          )}
        </div>
      </AppPageContainer>
    </div>
  );
}

export default PrintEmbBillIndex;
