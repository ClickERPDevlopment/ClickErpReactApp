/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast, ToastContainer } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import {
  Delete,
  Save,
  Update,
} from "@/actions/PrintingEmbroidery/print-emb-delivery-action";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import useAxiosInstance from "@/lib/axios-instance";
import { cn } from "@/lib/utils";
import { PageAction } from "@/utility/page-actions";
import { ReactQueryKey } from "@/utility/react-query-key";
import { z } from "zod";

import AppPageContainer from "@/components/app-page-container";
import useApiUrl from "@/hooks/use-ApiUrl";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { PrintEmbDeliveryDetailsType, PrintEmbDeliveryMasterType } from "@/actions/PrintingEmbroidery/print-emb-delivery-action";

const masterFormSchema = z.object({
  DELIVERY_DATE: z.string(),
  DELIVERY_SERIAL: z.number(),
  DELIVERY_CHALLAN_NO: z.string().min(1, "Delivery challan is required"),
  SUPPLIER_ID: z.number().min(1, "Supplier is required"),
  SUPPLIER: z.string().min(1, "Supplier is required"),
  WORKORDER_RECEIVE_ID: z.number().min(1, "Wo is required"),
  WORKORDER_RECEIVE_NO: z.string().min(1, "Wo is required"),
  REMARKS: z.string(),
  EMBELLISHMENT_TYPE: z.string(),
  RECEIVE_TYPE: z.string(),
  EMBELLISHMENT_CATEGORY: z.string(),
  EMBELLISHMENT_WO: z.string(),
});


const searchFormSchema = z.object({
  BUYER_ID: z.number().default(0),
  BUYER: z.string().optional(),
  STYLE_ID: z.number().optional(),
  STYLE: z.string().optional(),
  PO_ID: z.number().optional(),
  PO: z.string().optional(),
  COLOR_ID: z.number().optional(),
  COLOR: z.string().optional(),
});

interface IBuyer {
  Id: string;
  NAME: string;
  DISPLAY_NAME: string;
};

interface IStyle {
  Id: string;
  Styleno: string;
};

interface IPO {
  Id: string;
  Pono: string;
};

interface IColor {
  ID: number;
  COLORNAME: string;
};

interface ISupplier {
  Id: number;
  Name: string;
};

interface IRcvWorkOrder {
  ID: number;
  WORK_ORDER_NO: string;
};


interface ISearchData {
  BUYER_ID: number;
  BUYER: string;
  STYLE_ID: number;
  STYLE: string;
  PO_ID: number;
  PO: string;
  COLOR_ID: number;
  COLOR: string;
};

export default function PrintEmbDeliveryForm({
  data,
  pageAction,
}: {
  data: PrintEmbDeliveryMasterType | undefined | null;
  pageAction: string;
}): React.JSX.Element {
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const axios = useAxiosInstance();

  const mutation = useMutation({
    mutationFn: (tag: any) => {
      if (pageAction === PageAction.add) {
        return Save(tag, axios);
      } else if (pageAction === PageAction.edit) {
        return Update(tag, axios);
      } else if (pageAction === PageAction.delete) {
        return Delete(tag.ID, axios);
      } else {
        throw new Error("Page Action no found.");
      }
    },
    onSuccess: () => {

      toast.success("Action performed successfully!");

      queryClient.invalidateQueries({
        queryKey: [ReactQueryKey.SwtPlanningBoard, data?.ID],
      });

      const params = new URLSearchParams(location.search);
      const index = params.get("pageIndex");

      const basePath = location.pathname.includes("win/")
        ? "/win/printing-embroidery/print-emb-delivery"
        : "/dashboard/printing-embroidery/print-emb-delivery";

      setTimeout(() => {
        navigator(`${basePath}?pageIndex=${index || 0}`);
      }, 2000);
    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
    },
  });

  const api = useApiUrl();

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
  const getPO = async (woId: number, styleId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllPoByEmbWorkOrderReceiveAndStyle?woId=" + woId + "&styleId=" + styleId);
    setPO(response?.data);
  }


  const [color, setColor] = useState<IColor[]>([]);
  const GetColor = async (woId: number, poId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllColorByEmbWorkOrderReceiveAndStyle?woId=" + woId + "&styleId=" + searchData.STYLE_ID + "&poId=" + poId);
    setColor(response?.data);
  }


  const [workOrder, setWorkOrder] = useState<IRcvWorkOrder[]>([]);
  const getWorkOrder = async (supplierId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetEmbWorkOrderReceiveByFiltering?supplierId=" + supplierId);
    setWorkOrder(response?.data);
  }

  const [supplier, setSupplier] = useState<ISupplier[]>([]);
  const getSupplier = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllEmbWorkOrderReceiveSupplier");
    setSupplier(response?.data);
  }

  const getNextDeliveryNumber = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/PrintEmbDelivery/NextDeliveryNumber");
    setMasterData(prev => ({ ...prev, MATERIAL_RECEIVE_NO: response?.data.DeliveryNo }));
    masterForm.setValue("DELIVERY_CHALLAN_NO", response?.data.DeliveryNo);

    setMasterData(prev => ({ ...prev, DELIVERY_CHALLAN_NO: response?.data.DeliveryNo }));
  }

  const getWorkOrderRcvInfo = async (woId: Number) => {
    const response = await axios.get(api.ProductionUrl + "/production/PrintEmbDelivery/EmbWorkOrderRcvInfo?woId=" + woId);

    setMasterData(prev => ({ ...prev, SUPPLIER_ID: response?.data.SUPPLIER_ID, SUPPLIER: response?.data.SUPPLIER, WORKORDER_RECEIVE_ID: response?.data.WORKORDER_RECEIVE_ID, WORKORDER_RECEIVE_NO: response?.data.WORKORDER_RECEIVE_NO, PrintEmbDeliveryDetails: response?.data?.PrintEmbDeliveryDetails }));

    setdetailsData(response?.data?.PrintEmbDeliveryDetails)


    masterForm.setValue("SUPPLIER", response?.data.SUPPLIER);
    masterForm.setValue("SUPPLIER_ID", response?.data.SUPPLIER_ID);
    masterForm.setValue("WORKORDER_RECEIVE_NO", response?.data.WORKORDER_RECEIVE_NO);
    masterForm.setValue("EMBELLISHMENT_TYPE", response?.data.EMBELLISHMENT_TYPE);
    masterForm.setValue("RECEIVE_TYPE", response?.data.RECEIVE_TYPE);
    masterForm.setValue("EMBELLISHMENT_CATEGORY", response?.data.EMBELLISHMENT_CATEGORY);
    masterForm.setValue("EMBELLISHMENT_WO", response?.data.EMBELLISHMENT_WO);
  }

  const getWorkOrderRcv = async (poId: number) => {
    try {
      const { BUYER_ID, STYLE_ID } = searchData;

      const response = await axios.get(`${api.ProductionUrl}/production/EmbWorkOrderReceive/GetEmbWorkOrderReceiveByBuyerStylePo`, {
        params: {
          buyerId: BUYER_ID,
          styleId: STYLE_ID,
          poId: poId,
          colorId: 0
        }
      });

      const data = response?.data;

      if (Array.isArray(data) && data.length === 1) {
        const workOrder = data[0];

        setMasterData(prev => ({
          ...prev,
          WORKORDER_RECEIVE_ID: workOrder.ID,
          WORKORDER_RECEIVE_NO: workOrder.WORK_ORDER_NO
        }));

        masterForm.setValue("WORKORDER_RECEIVE_ID", workOrder.ID);
        masterForm.setValue("WORKORDER_RECEIVE_NO", workOrder.WORK_ORDER_NO);

        getWorkOrderRcvInfo(workOrder.ID);
      }
      else {
        setdetailsData(null);
      }

      setWorkOrder(data);

    } catch (error) {
    }
  };

  useEffect(() => {
    getWorkOrder(0);
    getSupplier();
    getBuyerData(0);

    if (pageAction === PageAction.add) { getNextDeliveryNumber() }

  }, []);

  const masterForm = useForm<z.infer<typeof masterFormSchema>>({
    resolver: zodResolver(masterFormSchema),
    defaultValues: {
      DELIVERY_DATE: data?.DELIVERY_DATE
        ? new Date(data.DELIVERY_DATE).toLocaleDateString("en-CA")
        : new Date().toLocaleDateString("en-CA"),
      DELIVERY_SERIAL: data?.DELIVERY_SERIAL || 1,
      DELIVERY_CHALLAN_NO: data?.DELIVERY_CHALLAN_NO || "",
      SUPPLIER_ID: data?.SUPPLIER_ID || 0,
      SUPPLIER: data?.SUPPLIER || "",
      WORKORDER_RECEIVE_ID: data?.WORKORDER_RECEIVE_ID || 0,
      WORKORDER_RECEIVE_NO: data?.WORKORDER_RECEIVE_NO?.toString() || "",
      REMARKS: data?.REMARKS || "",
      EMBELLISHMENT_TYPE: data?.EMBELLISHMENT_TYPE || "",
      RECEIVE_TYPE: data?.RECEIVE_TYPE || "",
      EMBELLISHMENT_CATEGORY: data?.EMBELLISHMENT_CATEGORY || "",
      EMBELLISHMENT_WO: data?.EMBELLISHMENT_WO || "",
    },
  });


  const searchForm = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      BUYER_ID: 0,
      BUYER: "",
      STYLE_ID: 0,
      STYLE: "",
      PO_ID: 0,
      PO: "",
    },
  });

  const [searchData, setSearchData] = useState<ISearchData>({
    BUYER_ID: 0,
    BUYER: "",
    STYLE_ID: 0,
    STYLE: "",
    PO_ID: 0,
    PO: "",
    COLOR_ID: 0,
    COLOR: "",
  })

  const [openBuyer, setOpenBuyer] = useState(false);
  const [openStyle, setOpenStyle] = useState(false);
  const [openPO, setOpenPO] = useState(false);
  const [openColor, setOpenColor] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();


    if (pageAction === PageAction.delete) {
      const confirmDelete = window.confirm("Are you sure you want to delete this item?");
      if (!confirmDelete) return;
    }


    const validationResult = masterFormSchema.safeParse(masterData);
    type MasterFormType = z.infer<typeof masterFormSchema>;


    if (!validationResult.success) {

      const errors = validationResult.error.flatten().fieldErrors;

      Object.entries(errors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          masterForm.setError(field as keyof MasterFormType, {
            type: "manual",
            message: messages[0],
          });
        }
      });
      return;
    }

    const data = masterData;

    data.PrintEmbDeliveryDetails = (detailsData || []).filter(item => item.DELIVERY_QTY || 0 > 0);

    mutation.mutate(data, {
      onSuccess: (_response) => {
        console.log("Mutation successful:", _response);
      },
      onError: (error) => {
        console.error("Error during mutation:", error);
      },
    });
  }

  let errorMessage: string = "";
  if (mutation.isError) {
    errorMessage = mutation.error.message;
  }

  const [detailsData, setdetailsData] = useState<
    PrintEmbDeliveryDetailsType[] | null | undefined
  >(data?.PrintEmbDeliveryDetails);

  // const handleRemove = (index: number) => {
  //   const items = detailsData?.filter((_d, i) => i !== index);
  //   setdetailsData([...(items || [])]);
  // };

  const [masterData, setMasterData] = useState<PrintEmbDeliveryMasterType>({
    ID: data ? data.ID : 0,
    DELIVERY_DATE: data?.DELIVERY_DATE
      ? new Date(data.DELIVERY_DATE).toLocaleDateString("en-CA")
      : new Date().toLocaleDateString("en-CA"),
    DELIVERY_SERIAL: data ? data.DELIVERY_SERIAL : 1,
    DELIVERY_CHALLAN_NO: data?.DELIVERY_CHALLAN_NO || "",
    SUPPLIER_ID: data ? data.SUPPLIER_ID : 0,
    SUPPLIER: data?.SUPPLIER || "",
    WORKORDER_RECEIVE_ID: data ? data.WORKORDER_RECEIVE_ID : 0,
    WORKORDER_RECEIVE_NO: data ? data.WORKORDER_RECEIVE_NO : "",
    CREATED_BY: data?.CREATED_BY || "",
    CREATED_DATE: data?.CREATED_DATE || new Date().toLocaleDateString("en-CA"),
    UPDATED_BY: data?.UPDATED_BY || "",
    UPDATED_DATE: data?.UPDATED_DATE || new Date().toLocaleDateString("en-CA"),
    REMARKS: data?.REMARKS || "",
    EMBELLISHMENT_TYPE: data?.EMBELLISHMENT_TYPE || "",
    RECEIVE_TYPE: data?.RECEIVE_TYPE || "",
    EMBELLISHMENT_CATEGORY: data?.EMBELLISHMENT_CATEGORY || "",
    EMBELLISHMENT_WO: data?.EMBELLISHMENT_WO || "",
    PrintEmbDeliveryDetails: data?.PrintEmbDeliveryDetails || [],
  });

  const handleMasterInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setMasterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [openWorkOrder, setOpenWorkOrder] = useState(false);
  const [openSupplier, setOpenSupplier] = useState(false);


  const handleSearch = () => {

    const searchedData = detailsData?.filter((item) => {

      const buyerValue = item.BUYER?.trim() || item.OS_BUYER?.trim() || '';

      if (
        searchData.BUYER &&
        !buyerValue.toLowerCase().includes(searchData.BUYER.toLowerCase())
      ) {
        return false;
      }

      const styleValue = item.STYLE?.trim() || item.OS_STYLE?.trim() || '';

      if (
        searchData.STYLE &&
        !styleValue.toLowerCase().includes(searchData.STYLE.toLowerCase())
      ) {
        return false;
      }

      const poValue = item.PO_NO?.trim() || item.OS_PO_NO?.trim() || '';

      if (
        searchData.PO &&
        !poValue.toLowerCase().includes(searchData.PO.toLowerCase())
      ) {
        return false;
      }

      const colorValue = item.COLOR || "";

      if (searchData.COLOR && !colorValue.toLowerCase().includes(searchData.COLOR.toLowerCase())) {
        return false;
      }

      return true;
    });
    setdetailsData(searchedData);
  };

  return (
    <AppPageContainer>
      <div className="w-full p-1">
        <Alert
          variant="destructive"
          className={mutation.isError ? "visible" : "hidden"}
        >
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>

        {/* Master Data */}
        <div>
          <ToastContainer position="top-right" autoClose={2000} />
          <Form {...masterForm}>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
              className=""
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">

                <FormField
                  control={masterForm.control}
                  name="DELIVERY_DATE"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-bold">Delivery Date</FormLabel>
                      <FormControl>
                        <Input
                          style={{ marginTop: "2px" }}
                          placeholder=""
                          type="date"
                          value={field.value ? new Date(field.value).toLocaleDateString("en-CA") : ''}
                          onChange={(e) => {
                            const newDate = e.target.value ? new Date(e.target.value) : null;
                            field.onChange(newDate);
                            setMasterData((prev) => ({
                              ...prev,
                              DELIVERY_DATE: new Date(e.target.value).toLocaleDateString("en-CA"),
                            }));
                          }}
                          className="form-control w-full h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={masterForm.control}
                  name="SUPPLIER_ID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel className="font-bold">Customer</FormLabel>
                      <Popover open={openSupplier} onOpenChange={setOpenSupplier}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openSupplier}
                              className={cn(
                                "w-full justify-between bg-emerald-100",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? supplier?.find(
                                  (s) =>
                                    Number(s.Id) === Number(field.value)
                                )?.Name
                                : "Select a customer type"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search supplier type..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No supplier type found.</CommandEmpty>
                              <CommandGroup>
                                {supplier?.map((s) => (
                                  <CommandItem
                                    value={s.Name}
                                    key={s.Id}
                                    onSelect={() => {
                                      field.onChange(Number(s.Id));
                                      setMasterData((prev) => ({
                                        ...prev,
                                        SUPPLIER_ID: Number(s.Id),
                                        SUPPLIER: s.Name,
                                      }));
                                      setOpenSupplier(false);
                                      getWorkOrder(Number(s.Id));
                                    }}
                                  >
                                    {s.Name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        Number(s.Id) === Number(field.value)
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

                <FormField
                  control={masterForm.control}
                  name="WORKORDER_RECEIVE_ID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel className="font-bold">Wo Rcv No</FormLabel>
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
                                  (wo) =>
                                    Number(wo.ID) === Number(field.value)
                                )?.WORK_ORDER_NO
                                : "Select a wo"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search wo rcv no..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No wo rcv found.</CommandEmpty>
                              <CommandGroup>
                                {workOrder?.map((wo) => (
                                  <CommandItem
                                    value={wo.WORK_ORDER_NO}
                                    key={wo.ID}
                                    onSelect={() => {
                                      field.onChange(Number(wo.ID));
                                      setMasterData((prev) => ({
                                        ...prev,
                                        WORKORDER_RECEIVE_ID: Number(wo.ID),
                                        WORKORDER_RECEIVE_NO: wo.WORK_ORDER_NO,
                                      }));
                                      setOpenWorkOrder(false);
                                      getWorkOrderRcvInfo(wo.ID);

                                    }}
                                  >
                                    {wo.WORK_ORDER_NO}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        Number(wo.ID) === Number(field.value)
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


                <FormField
                  control={masterForm.control}
                  name="EMBELLISHMENT_TYPE"
                  render={({ field }) => (
                    <FormItem className="w-full h-10">
                      <FormLabel className="font-bold  mb-0">Embellishment Type</FormLabel>
                      <FormControl className="m-0">
                        <Input
                          disabled
                          style={{ marginTop: "2px" }}
                          placeholder=""
                          {...field}
                          className="form-control h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={masterForm.control}
                  name="RECEIVE_TYPE"
                  render={({ field }) => (
                    <FormItem className="w-full h-10">
                      <FormLabel className="font-bold  mb-0">Receive Type</FormLabel>
                      <FormControl className="m-0">
                        <Input
                          disabled
                          style={{ marginTop: "2px" }}
                          placeholder=""
                          {...field}
                          className="form-control h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={masterForm.control}
                  name="EMBELLISHMENT_CATEGORY"
                  render={({ field }) => (
                    <FormItem className="w-full h-10">
                      <FormLabel className="font-bold  mb-0">Embellishment Category</FormLabel>
                      <FormControl className="m-0">
                        <Input
                          disabled
                          style={{ marginTop: "2px" }}
                          placeholder=""
                          {...field}
                          className="form-control h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={masterForm.control}
                  name="EMBELLISHMENT_WO"
                  render={({ field }) => (
                    <FormItem className="w-full h-10">
                      <FormLabel className="font-bold  mb-0">Embellishment Wo</FormLabel>
                      <FormControl className="m-0">
                        <Input
                          disabled
                          style={{ marginTop: "2px" }}
                          placeholder=""
                          {...field}
                          className="form-control h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={masterForm.control}
                  name="DELIVERY_CHALLAN_NO"
                  render={({ field }) => (
                    <FormItem className="w-full h-10">
                      <FormLabel className="font-bold  mb-0">Delivery Challan No</FormLabel>
                      <FormControl className="m-0">
                        <Input
                          disabled
                          style={{ marginTop: "2px" }}
                          placeholder=""
                          {...field}
                          className="form-control h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={masterForm.control}
                  name="REMARKS"
                  render={({ field }) => (
                    <FormItem className="w-full h-10">
                      <FormLabel className="font-bold  mb-0 mt-5">Remarks</FormLabel>
                      <FormControl className="m-0" onChange={handleMasterInputChange}>
                        <Input
                          style={{ marginTop: "2px" }}
                          placeholder=""
                          {...field}
                          className="form-control h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="m-10"></div>

              <div className="">
                {/* search form */}
                <div className="border p-1">
                  <Form {...searchForm} >
                    <form
                      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
                      className=""
                    >
                      <div className="flex flex-wrap gap-3">
                        <div className="flex justify-between gap-2 items-end">
                          <div>
                            <div className="flex justify-between items-end">
                              <FormField
                                control={searchForm.control}
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
                                                    getStyleByBuyer(Number(0), Number(buyer?.Id));
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
                          </div>

                          <div>
                            <div className="flex justify-between items-end">
                              <FormField
                                control={searchForm.control}
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
                                                    // GetColor(Number(masterData.WORKORDER_RECEIVE_ID), Number(item?.Id));
                                                    getPO(Number(0), Number(item?.Id));
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
                          </div>

                          <div>
                            <div>
                              <FormField
                                control={searchForm.control}
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
                                                      PO: item.Pono,
                                                    }));
                                                    GetColor(Number(0), Number(item?.Id));
                                                    getWorkOrderRcv(Number(item.Id));
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

                          <div className="">
                            <div>
                              <FormField
                                control={searchForm.control}
                                name="COLOR_ID"
                                render={({ field }) => (
                                  <FormItem className="flex flex-col flex-1">
                                    <FormLabel className="font-bold">Color</FormLabel>
                                    <Popover open={openColor} onOpenChange={setOpenColor}>
                                      <PopoverTrigger asChild>
                                        <FormControl>
                                          <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openColor}
                                            className={cn(
                                              "w-full justify-between bg-emerald-100",
                                              !field.value && "text-muted-foreground"
                                            )}
                                          >
                                            {field.value
                                              ? color?.find(
                                                (colorData) =>
                                                  Number(colorData.ID) === field.value
                                              )?.COLORNAME
                                              : "Select a color"}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                          </Button>
                                        </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-full p-0">
                                        <Command>
                                          <CommandInput placeholder="Search Color .." className="h-9" />
                                          <CommandList>
                                            <CommandEmpty>No color found.</CommandEmpty>
                                            <CommandGroup>
                                              {color?.map((colorData) => (
                                                <CommandItem
                                                  value={colorData.COLORNAME}
                                                  key={colorData.ID}
                                                  onSelect={() => {
                                                    field.onChange(Number(colorData.ID));
                                                    setSearchData((prev) => ({
                                                      ...prev,
                                                      COLOR_ID: Number(colorData.ID),
                                                      COLOR: colorData.COLORNAME,
                                                    }));
                                                    // getWorkOrderRcv(Number(colorData.ID));
                                                    setOpenColor(false);
                                                  }}
                                                >
                                                  {colorData.COLORNAME}
                                                  <CheckIcon
                                                    className={cn(
                                                      "ml-auto h-4 w-4",
                                                      Number(colorData.ID) === field.value
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
                      </div>
                    </form>
                  </Form>
                  <div>
                    <Button
                      type="button"
                      onClick={() => { handleSearch(); }}
                      className="mt-2  mb-2"
                    >
                      Search
                    </Button>
                  </div>
                  {/* ######################### details data ################################ */}
                  <div className="max-h-[300px] overflow-y-auto border rounded-md mt-5">
                    <Table className="min-w-full rounded-md">
                      <TableHeader className="bg-green-100 border border-gray-300 text-center px-4">
                        <TableRow className=" rounded-md">
                          <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                            S/L
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Buyer
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Style
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            PO
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Color
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Size
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Wo Qty
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Input Qty
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Production Qty
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Delivered Qty
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Ready for Delivery
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Delivery Qty
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Parts
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {detailsData?.map((item, index) => (
                          <TableRow key={index} className={`odd:bg-white even:bg-gray-50`}>
                            <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                              {index + 1}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4  text-center">
                              {item.BUYER ? item?.BUYER : item?.OS_BUYER}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.STYLE ? item?.STYLE : item?.OS_STYLE}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.PO_NO ? item?.PO_NO : item?.OS_PO_NO}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.COLOR}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.SIZE}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.WO_QTY}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.RCV_QTY}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.PRODUCTION_QTY}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.DELIVERED_QTY}
                            </TableCell>

                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {Number(item.PRODUCTION_QTY) - Number(item.DELIVERED_QTY)}
                            </TableCell>

                            <TableCell className="border border-gray-300 px-4 text-center w-[60px]">
                              <input
                                type="number"
                                className="w-full text-center text-sm border border-gray-300 rounded p-1"
                                value={item.DELIVERY_QTY}
                                onChange={(e) => {
                                  const updatedData = [...detailsData];

                                  const rcvQty = item.RCV_QTY || 0;
                                  const deliveryQty = Number(e.target.value);
                                  if (deliveryQty > rcvQty) {
                                    toast.error("Delivery Qty cannot be greater than rcv Qty");
                                    return;
                                  }

                                  updatedData[index] = {
                                    ...updatedData[index],
                                    DELIVERY_QTY: Number(e.target.value),
                                  };
                                  setdetailsData(updatedData);
                                }}
                              />

                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.PATRS}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className={cn("flex justify-between mt-4")}>
                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className={cn(
                          "w-24",
                          pageAction === PageAction.view ? "hidden" : " "
                        )}
                        variant={
                          pageAction === PageAction.delete ? "destructive" : "default"
                        }
                      >
                        {pageAction === PageAction.add
                          ? "Save"
                          : pageAction === PageAction.edit
                            ? "Update"
                            : "Delete"}
                      </Button>
                    </div>

                    {pageAction !== PageAction.add && (
                      <Button
                        type="button"
                        disabled={mutation.isPending}
                        onClick={() =>
                          window.open(
                            `../../../../report/embellishment/embellishment-delivery-report?id=${data?.ID}`,
                            "_blank"
                          )
                        }
                        variant="default"
                        className={cn("w-24")}
                      >
                        Show
                      </Button>
                    )}

                    <Button
                      type="reset"
                      disabled={mutation.isPending}
                      onClick={() => {
                        const params = new URLSearchParams(location.search);
                        const index = params.get("pageIndex");

                        location.pathname.includes("win/")
                          ? navigator("/win/printing-embroidery/print-emb-delivery?pageIndex=" + index)
                          : navigator("/dashboard/printing-embroidery/print-emb-delivery?pageIndex=" + index)
                      }}

                      variant={"outline"}
                      className={cn("w-24")}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </div>

            </form>
          </Form>
        </div>
      </div >
    </AppPageContainer >
  );
}
