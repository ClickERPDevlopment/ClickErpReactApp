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
} from "@/actions/PrintingEmbroidery/print-emb-pi-action";
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
import { Trash2Icon } from "lucide-react";

import AppPageContainer from "@/components/app-page-container";
import useApiUrl from "@/hooks/use-ApiUrl";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { PrintEmbPIDetailsType, PrintEmbPIMasterType } from "@/actions/PrintingEmbroidery/print-emb-pi-action";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  COLOR_ID: z.any().optional(),
  PO_ID: z.any().optional(),
  STYLE_ID: z.number().default(0),
  BUYER_ID: z.number().default(0),
  ID: z.number().default(0),
  MASTER_ID: z.number().default(0),
  BUYER: z.string().optional(),
  OS_BUYER: z.string().optional(),
  STYLE: z.string().optional(),
  OS_STYLE: z.string().optional(),
  PO_NO: z.string().optional(),
  OS_PO_NO: z.string().optional(),
  WORK_ORDER_ID: z.number().default(0),
  WORK_ORDER_NO: z.string().optional(),
  EMB_WORK_ORDER_NO: z.string().optional(),
  PART: z.string().optional(),
  PRINT_TYPE: z.string().optional(),
  QTY: z.number().default(0),
  DZN_PRICE: z.number().optional(),
  PRICE: z.number().optional(),
  AMOUNT: z.number().optional(),
});

const masterFormSchema = z.object({
  PI_DATE: z.string(),
  PARTY_ID: z.number().min(1, "Type is required"),
  PARTY: z.string().min(1, "Type is required"),
  ADDRESS: z.string().min(1, "Type is required"),
  PI_NO: z.string().min(1, "Type is required"),
  DISCOUNT_PERCENT: z.number().optional(),
});


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

interface IColor {
  ID: number;
  COLORNAME: string;
};

interface ISupplier {
  Id: number;
  Name: string;
  Address: string;
};

export default function PrintEmbPIForm({
  data,
  pageAction,
  CompanyId
}: {
  data: PrintEmbPIMasterType | undefined | null;
  pageAction: string;
  CompanyId: number
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
        return Delete(tag.ID, CompanyId, axios);
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
        ? "/win/printing-embroidery/print-emb-pi"
        : "/dashboard/printing-embroidery/print-emb-pi";

      setTimeout(() => {
        navigator(`${basePath}?pageIndex=${index || 0}&CompanyId=${CompanyId}`);
      }, 2000);


    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
    },
  });

  const api = useApiUrl();

  const [supplierData, setSupplierData] = useState<ISupplier[]>([]);
  const getSupplierData = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllEmbWorkOrderReceiveSupplier");
    setSupplierData(response?.data);
  }

  const [buyerData, setBuyerData] = useState<IBuyer[]>([]);
  const getBuyerData = async (embTypeId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllBuyerByEmbWorkOrderReceive?id=0&embTypeId=" + embTypeId);
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

  const [color, setColor] = useState<IColor[]>([]);
  const GetColor = async (woId: number, poId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllColorByEmbWorkOrderReceiveAndStyle?woId=" + woId + "&styleId=" + printEmbPIDetails.STYLE_ID + "&poId=" + poId);
    setColor(response?.data);
  }


  const [workOrder, setWorkOrder] = useState<IRcvWorkOrder[]>([]);
  const getWorkOrder = async (buyerId: number, styleId: number, poId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetEmbWorkOrderReceiveByBuyerStylePo?buyerId=" + buyerId + "&styleId=" + styleId + "&poId=" + poId + "&embTypeId=0");

    setWorkOrder(response?.data);
  }


  useEffect(() => {
    getBuyerData(0);
    getSupplierData();
  }, []);


  const masterForm = useForm<z.infer<typeof masterFormSchema>>({
    resolver: zodResolver(masterFormSchema),
    defaultValues: {
      PI_DATE: data?.PI_DATE ? new Date(data.PI_DATE).toLocaleDateString("en-CA") : new Date().toLocaleDateString("en-CA"),
      PARTY_ID: data?.PARTY_ID || 0,
      PARTY: data?.PARTY || "",
      ADDRESS: data?.ADDRESS || "",
      PI_NO: data?.PI_NO || "",
      DISCOUNT_PERCENT: data?.DISCOUNT_PERCENT || 0,
    },
  });


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
    data.TERM_CONDITIONS = termsCondition;

    data.PrintEmbPIDetails = detailsData || [];


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
    PrintEmbPIDetailsType[] | null | undefined
  >(data?.PrintEmbPIDetails || []);


  const handleAdd = async () => {

    if (!printEmbPIDetails.WORK_ORDER_ID) return

    const response = await axios.get(api.ProductionUrl + `/production/${CompanyId}/PrintEmbPI/EmbWorkOrderRcvDetails?woId=${printEmbPIDetails.WORK_ORDER_ID}&buyerId=${printEmbPIDetails.BUYER_ID}&poId=${printEmbPIDetails.PO_ID}&styleId=${printEmbPIDetails.STYLE_ID}&colorId=${printEmbPIDetails.COLOR_ID}`);
    setdetailsData(prev => [
      ...(prev || []),
      ...((response?.data || []))
    ]);

  };

  const handleRemove = (index: number) => {
    const items = detailsData?.filter((_d, i) => i !== index);
    setdetailsData([...(items || [])]);
  };

  const [masterData, setMasterData] = useState<PrintEmbPIMasterType>({
    ID: data ? data.ID : 0,
    PI_DATE: data?.PI_DATE ? new Date(data.PI_DATE).toLocaleDateString("en-CA") : new Date().toLocaleDateString("en-CA"),
    PARTY_ID: data ? data.PARTY_ID : 0,
    PARTY: data ? data.PARTY : "",
    ADDRESS: data ? data.ADDRESS : "",
    PI_NO: data ? data.PI_NO : "",
    TERM_CONDITIONS: data ? data.TERM_CONDITIONS : "",
    COMPANY_ID: CompanyId,
    PrintEmbPIDetails: data ? data.PrintEmbPIDetails : []
  });

  const [printEmbPIDetails, setPrintEmbPIDetails] = useState<PrintEmbPIDetailsType>({
    COLOR_ID: 0,
    PO_ID: 0,
    STYLE_ID: 0,
    BUYER_ID: 0,
    ID: 0,
    MASTER_ID: 0,
    BUYER: "",
    OS_BUYER: "",
    STYLE: "",
    OS_STYLE: "",
    PO_NO: "",
    OS_PO_NO: "",
    WORK_ORDER_ID: 0,
    WORK_ORDER_NO: "",
    EMB_WORK_ORDER_NO: "",
    PART: "",
    PRINT_TYPE: "",
    QTY: 0,
    DZN_PRICE: 0,
    AMOUNT: 0,
  });

  const handleMasterInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setMasterData((prev) => ({
      ...prev,
      [name]: name === "DISCOUNT_PERCENT" ? Number(value) : value,
    }));
  };

  const handleDetailsInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setPrintEmbPIDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      COLOR_ID: 0,
      STYLE_ID: 0,
      BUYER_ID: 0,
      ID: 0,
      MASTER_ID: 0,
      BUYER: "",
      OS_BUYER: "",
      STYLE: "",
      OS_STYLE: "",
      PO_NO: "",
      OS_PO_NO: "",
      WORK_ORDER_ID: 0,
      WORK_ORDER_NO: "",
      EMB_WORK_ORDER_NO: "",
      PART: "",
      PRINT_TYPE: "",
      QTY: 0,
      DZN_PRICE: 0,
      PRICE: 0,
      AMOUNT: 0,
    },
  });

  const [openBuyer, setOpenBuyer] = useState(false);
  const [openStyle, setOpenStyle] = useState(false);
  const [openPO, setOpenPO] = useState(false);
  const [openColor, setOpenColor] = useState(false);

  const [openSupplier, setOpenSupplier] = useState(false);
  const [openWorkOrder, setOpenWorkOrder] = useState(false);

  const [openTermsConditionModal, setOpenTermsConditionModal] = useState(false);


  const [termsCondition, setTermsCondition] = useState(pageAction === PageAction.add ?
    "1. By Confirmed & Irrevocable Letter of Credit 60/90 days sight from the date of Delivery Challan \n2. Delivery within 15 days of receiving the L/C.\n3. HS CODE:6217.10.00\n4. BIN No. 000414104-0103\n5. Advising Bank: Dhaka Bank PLC. Gulshan Branch, Plot: 7, Block: SE (D),24Gulshan Ave, Dhaka1212, Bangladesh." : masterData?.TERM_CONDITIONS
  );




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
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">

                <FormField
                  control={masterForm.control}
                  name="PI_DATE"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-bold">PI Date</FormLabel>
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
                              PRODUCTION_DATE: new Date(e.target.value).toLocaleDateString("en-CA"),
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
                  name="PARTY_ID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel className="font-bold">Party</FormLabel>
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
                                ? supplierData?.find(
                                  (type) =>
                                    Number(type.Id) === Number(field.value)
                                )?.Name
                                : "Select a production type"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search production type..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No party found.</CommandEmpty>
                              <CommandGroup>
                                {supplierData?.map((party) => (
                                  <CommandItem
                                    value={party.Name}
                                    key={party.Id}
                                    onSelect={() => {
                                      field.onChange(Number(party.Id));
                                      setMasterData((prev) => ({
                                        ...prev,
                                        PARTY_ID: Number(party.Id),
                                        PARTY: party.Name,
                                        ADDRESS: party.Address,
                                      }));
                                      masterForm.setValue("ADDRESS", party.Address || "");

                                      setOpenSupplier(false);
                                    }}
                                  >
                                    {party.Name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        Number(party.Id) === Number(field.value)
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
                  name="ADDRESS"
                  render={({ field }) => (
                    <FormItem className="w-full h-10">
                      <FormLabel className="font-bold  mb-0">Address</FormLabel>
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

                <div>
                  <FormField
                    control={masterForm.control}
                    name="PI_NO"
                    render={({ field }) => (
                      <FormItem className="w-full h-10">
                        <FormLabel className="font-bold  mb-0">PI No</FormLabel>
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

                <div>
                  <FormField
                    control={masterForm.control}
                    name="DISCOUNT_PERCENT"
                    render={({ field }) => (
                      <FormItem className="w-full h-10">
                        <FormLabel className="font-bold  mb-0">Discount Percent</FormLabel>
                        <FormControl className="m-0" onChange={handleMasterInputChange}>
                          <Input
                            type="number"
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

              </div>
            </form>
          </Form>
        </div>

        <div className="mt-2">
          <Button
            className="mt-3"
            variant="secondary"
            onClick={() => setOpenTermsConditionModal(true)}
          >
            Edit Terms & Conditions
          </Button>
        </div>

        {/* ===================================Details data===================================== */}
        <div className="mt-10">
          <div className="border p-1">
            <Form {...form} >
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
                className=""
              >
                <div className="flex flex-wrap gap-3">
                  <div className="flex justify-between gap-2 items-end">

                    <div>
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
                                              setPrintEmbPIDetails((prev) => ({
                                                ...prev,
                                                BUYER_ID: Number(buyer?.Id),
                                                BUYER: buyer?.NAME,
                                              }));
                                              getStyleByBuyer(0, Number(buyer?.Id));

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
                                              setPrintEmbPIDetails((prev) => ({
                                                ...prev,
                                                STYLE_ID: Number(item.Id),
                                                STYLE: item.Styleno,
                                              }));
                                              setOpenStyle(false);
                                              getPOByStyle(0, Number(item?.Id));
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
                                              setPrintEmbPIDetails((prev) => ({
                                                ...prev,
                                                PO_ID: Number(item.Id),
                                                PO_NO: item.Pono,
                                              }));
                                              GetColor(Number(0), Number(item?.Id));
                                              getWorkOrder(printEmbPIDetails.BUYER_ID || 0, printEmbPIDetails.STYLE_ID || 0, Number(item.Id));
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


                    <div>
                      <div className="flex justify-between items-end">
                        <FormField
                          control={form.control}
                          name="WORK_ORDER_ID"
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
                                              setPrintEmbPIDetails((prev) => ({
                                                ...prev,
                                                WORK_ORDER_ID: Number(workOrderData.ID),
                                                WORK_ORDER_NO: workOrderData.WORK_ORDER_NO,
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
                    </div>

                    <div>
                      <div className="flex justify-between items-end">
                        <FormField
                          control={form.control}
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
                                    <CommandInput placeholder="Search PO..." className="h-9" />
                                    <CommandList>
                                      <CommandEmpty>No color found.</CommandEmpty>
                                      <CommandGroup>
                                        {color?.map((colorData) => (
                                          <CommandItem
                                            value={colorData.COLORNAME}
                                            key={colorData.ID}
                                            onSelect={() => {
                                              field.onChange(Number(colorData.ID));
                                              setPrintEmbPIDetails((prev) => ({
                                                ...prev,
                                                COLOR_ID: Number(colorData.ID),
                                                COLOR: colorData.COLORNAME,
                                              }));
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

                    <div>
                      <div className="justify-between items-end hidden">
                        <FormField
                          control={form.control}
                          name="PRICE"
                          render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                              <FormLabel className="font-bold  mb-0">Rate/Dzn</FormLabel>
                              <FormControl className="m-0" onChange={handleDetailsInputChange}>
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
                      <div className="h-4">

                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={() => handleAdd()}
                  className="mt-2 mb-2"
                >
                  Add
                </Button>

                <div className="max-h-[300px] overflow-y-auto border rounded-md">
                  <Table className="min-w-full rounded-md">
                    <TableHeader className="bg-green-100 rounded-md">
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
                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                          Work Order No
                        </TableHead>
                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                          Order No
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Part
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Order Type
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Qty ({detailsData?.reduce((acc, item) => acc + (item.QTY || 0), 0)})
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Price/Dzn
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Total Amount(USD) ({detailsData?.reduce((acc, item) => acc + ((item.PRICE || 0) * (item.QTY || 0)), 0).toFixed(2)})
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {detailsData?.map((item, index) => (
                        <TableRow key={index} className={`even:bg-gray-50'
                          }`}>
                          <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4  text-center">
                            {item.BUYER ? item?.BUYER : item?.OS_BUYER}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center break-words max-w-[150px]">
                            <div className="whitespace-normal break-all">
                              {item.STYLE ? item?.STYLE : item?.OS_STYLE}
                            </div>
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center break-words max-w-[150px]">
                            <div className="whitespace-normal break-all">
                              {item.PO_NO ? item?.PO_NO : item?.OS_PO_NO}
                            </div>
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center w-[60px]">
                            <input
                              type="text"
                              className="w-full text-center text-sm border border-gray-300 rounded p-1 bg-yellow"
                              value={item.EMB_WORK_ORDER_NO}
                              onChange={(e) => {
                                const updatedData = [...detailsData];

                                updatedData[index] = {
                                  ...updatedData[index],
                                  EMB_WORK_ORDER_NO: e.target.value,
                                };
                                setdetailsData(updatedData);
                              }}
                            />
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {item.WORK_ORDER_NO}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {item.PART}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {item.PRINT_TYPE}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {item.QTY}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {(item.PRICE || 0) * 12}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {((item.PRICE || 0) * (item.QTY || 0)).toFixed(2)}
                          </TableCell>

                          <TableCell className="border border-gray-300 p-0 m-0 hover:cursor-pointer">
                            <div className="w-full h-full p-0 m-0 flex justify-center">
                              <Trash2Icon
                                size={15}
                                className=" hover:text-red-500 ms-2"
                                onClick={() => handleRemove(index)}
                                style={{ color: "red" }}
                              />
                            </div>
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

                  {
                    pageAction === PageAction.view && (
                      <a
                        target="_blank"
                        href={`../../../../report/embellishment/embellishment-pi-report?id=${data?.ID}`}
                        className="inline-block px-4 py-2 text-sm font-medium text-gray-950 bg-blue-600 rounded-md shadow hover:bg-blue-700 hover:shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 border border-lime-600"
                      >
                        Show
                      </a>
                    )
                  }


                  <Button
                    type="reset"
                    disabled={mutation.isPending}
                    onClick={() => {
                      const params = new URLSearchParams(location.search);
                      const index = params.get("pageIndex");
                      location.pathname.includes("win/")
                        ? navigator("/win/printing-embroidery/print-emb-pi?pageIndex=" + index + "&CompanyId=" + CompanyId)
                        : navigator("/dashboard/printing-embroidery/print-emb-pi?pageIndex=" + index + "&CompanyId=" + CompanyId)
                    }}
                    variant={"outline"}
                    className={cn("w-24")}
                  >
                    Back
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div>

        {/* Terms and condition dialog */}
        <Dialog open={openTermsConditionModal} onOpenChange={setOpenTermsConditionModal}>
          <DialogContent
            style={{ backgroundColor: "white" }}
            className="sm:max-w-l shadow-lg border border-gray-200"
          >
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-gray-800">
                Edit Terms & Conditions
              </DialogTitle>
            </DialogHeader>

            <Textarea
              value={termsCondition}
              onChange={(e) => setTermsCondition(e.target.value)}
              className="w-full h-56 text-sm border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 bg-white"
            />

            <DialogFooter className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setOpenTermsConditionModal(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>


      </div>
    </AppPageContainer>
  );
}
