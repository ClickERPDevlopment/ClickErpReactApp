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
import { DeletePrintEmbBill, PrintEmbBillDetaiiType, PrintEmbBillMasterType, SavePrintEmbBill, UpdatePrintEmbBill } from "@/actions/PrintingEmbroidery/print-emb-bill-action";
import { Trash2Icon } from "lucide-react";

const masterFormSchema = z.object({

  Id: z.number().optional(),
  BillDate: z.string().optional(),
  BillSerial: z.number().optional(),
  BillNo: z.string().optional(),

  PartyId: z.number().min(1, "Party is required"),
  Party: z.string().optional(),

  CompanyId: z.number().min(1, "Company is required"),
  Company: z.string().optional(),

  Remarks: z.string().optional(),
});


const searchFormSchema = z.object({
  WorkOrderId: z.number().optional(),
  WorkOrder: z.string().optional(),
  MerEmbWorkOrder: z.string().optional(),
});

interface ISupplier {
  Id: number;
  Name: string;
};

interface IRcvWorkOrder {
  ID: number;
  WORK_ORDER_NO: string;
};


interface ISearchData {
  WorkOrderId: number;
  WorkOrder: string,
  EmbWorkOrder: string,
};

export default function PrintEmbBillForm({
  data,
  pageAction,
  CompanyId
}: {
  data: PrintEmbBillMasterType | undefined | null;
  pageAction: string;
  CompanyId: number;
}): React.JSX.Element {
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const axios = useAxiosInstance();

  const mutation = useMutation({
    mutationFn: (tag: any) => {
      if (pageAction === PageAction.add) {
        return SavePrintEmbBill(tag, axios, CompanyId);
      } else if (pageAction === PageAction.edit) {
        return UpdatePrintEmbBill(tag, axios, CompanyId);
      } else if (pageAction === PageAction.delete) {
        return DeletePrintEmbBill(tag.Id, axios, CompanyId);
      } else {
        throw new Error("Page Action no found.");
      }
    },
    onSuccess: () => {

      toast.success("Action performed successfully!");

      queryClient.invalidateQueries({
        queryKey: [ReactQueryKey.SwtPlanningBoard, data?.Id],
      });

      const params = new URLSearchParams(location.search);
      const index = params.get("pageIndex");

      const basePath = location.pathname.includes("win/")
        ? "/win/printing-embroidery/print-emb-bill"
        : "/dashboard/printing-embroidery/print-emb-bill";

      setTimeout(() => {
        navigator(`${basePath}?pageIndex=${index || 0}&CompanyId=${CompanyId}`);
      }, 2000);
    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
    },
  });

  const api = useApiUrl();

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

  const getNextBillNumber = async () => {
    const response = await axios.get(api.ProductionUrl + `/production/${CompanyId}/PrintEmbBill/NextBillNumber`);
    setMasterData(prev => ({ ...prev, BillNo: response?.data.BillNo }));
    masterForm.setValue("BillNo", response?.data.BillNo);
  }

  const getWorkOrderRcvInfo = async (woId: Number) => {

    const response = await axios.get(api.ProductionUrl + "/production/PrintEmbDelivery/EmbWorkOrderRcvInfo?woId=" + woId);
    searchForm.setValue("MerEmbWorkOrder", response?.data.EMBELLISHMENT_WO);

  }


  useEffect(() => {

    getSupplier();
    if (pageAction === PageAction.add) { getNextBillNumber() }

    if (data && data.PartyId) {
      getWorkOrder(data.PartyId);
    }

  }, []);



  type masterFormSchemaType = z.infer<typeof masterFormSchema>;

  const masterForm = useForm<masterFormSchemaType>({
    resolver: zodResolver(masterFormSchema),
    defaultValues: {
      Id: data?.Id || 0,
      BillDate: data?.BillDate
        ? new Date(data.BillDate).toLocaleDateString("en-CA")
        : new Date().toLocaleDateString("en-CA"),
      BillSerial: data?.BillSerial || 1,
      BillNo: data?.BillNo || "",

      PartyId: data?.PartyId || 0,
      Party: data?.Party || "",

      CompanyId: data?.CompanyId || 0,
      Company: data?.Company || "",

      Remarks: data?.Remarks || "",
    },
  });


  const searchForm = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      WorkOrderId: 0,
      WorkOrder: "",
      MerEmbWorkOrder: "",

    },
  });

  const [searchData, setSearchData] = useState<ISearchData>({
    WorkOrderId: 0,
    WorkOrder: "",
    EmbWorkOrder: "",
  })


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(masterData);

    masterData.CompanyId = CompanyId


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

    data.Details = detailsData || [];

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
    PrintEmbBillDetaiiType[] | null | undefined
  >(data?.Details || []);


  const [masterData, setMasterData] = useState<PrintEmbBillMasterType>({
    Id: data ? data.Id : 0,
    BillDate: data?.BillDate
      ? new Date(data.BillDate).toLocaleDateString("en-CA")
      : new Date().toLocaleDateString("en-CA"),
    BillSerial: data ? data.BillSerial : 1,
    BillNo: data?.BillNo || "",
    PartyId: data ? data.PartyId : 0,
    Party: data?.Party || "",
    CompanyId: data ? data.CompanyId : 0,
    Company: data ? data.Company : "",
    CreatedBy: data?.CreatedBy || "",
    CreatedDate: data?.CreatedDate || new Date().toLocaleDateString("en-CA"),
    UpdatedBy: data?.UpdatedBy || "",
    UpdatedDate: data?.UpdatedDate || new Date().toLocaleDateString("en-CA"),
    Remarks: data?.Remarks || "",
    Details: data?.Details || [],
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



  const handleAdd = async () => {
    try {
      const response = await axios.get(
        `${api.ProductionUrl}/production/${CompanyId}/PrintEmbBill/EmbWorkOrderRcvInfo?woId=${searchData.WorkOrderId}`
      );

      const data = response?.data ?? [];

      if (!data || data.length === 0) {
        window.alert("Bill already done with this Work Order.");
        return;
      }

      setdetailsData(prev => [...(prev ?? []), ...data]);
    } catch (error) {
      console.error("Error fetching Work Order data:", error);
      window.alert("Failed to fetch Work Order data. Please try again.");
    }
  };


  function handleRemove(workOrderId: number): void {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete all details for Work Order?`
    );

    if (confirmDelete) {
      setdetailsData(prev =>
        prev ? prev.filter(item => item.WorkOrderId !== workOrderId) : prev
      );

    }
  }


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
                  name="BillDate"
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
                              BillDate: new Date(e.target.value).toLocaleDateString("en-CA"),
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
                  name="PartyId"
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
                                ? supplier?.find(
                                  (s) =>
                                    Number(s.Id) === Number(field.value)
                                )?.Name
                                : "Select a party"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search supplier type..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No party found.</CommandEmpty>
                              <CommandGroup>
                                {supplier?.map((s) => (
                                  <CommandItem
                                    value={s.Name}
                                    key={s.Id}
                                    onSelect={() => {
                                      field.onChange(Number(s.Id));
                                      setMasterData((prev) => ({
                                        ...prev,
                                        PartyId: Number(s.Id),
                                        Party: s.Name,
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
                  name="BillNo"
                  render={({ field }) => (
                    <FormItem className="w-full h-10">
                      <FormLabel className="font-bold  mb-0">Bill No</FormLabel>
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
                <br></br>
                <FormField
                  control={masterForm.control}
                  name="Remarks"
                  render={({ field }) => (
                    <FormItem className="w-full h-10">
                      <FormLabel className="font-bold  mb-0">Remarks</FormLabel>
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
                                name="WorkOrderId"
                                render={({ field }) => (
                                  <FormItem className="flex flex-col flex-1">
                                    <FormLabel className="font-bold">Emb Wo No</FormLabel>
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
                                                    setSearchData((prev) => ({
                                                      ...prev,
                                                      WorkOrderId: Number(wo.ID),
                                                      WorkOrder: wo.WORK_ORDER_NO,
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
                            </div>
                          </div>
                          <div>
                            <FormField
                              control={searchForm.control}
                              name="MerEmbWorkOrder"
                              render={({ field }) => (
                                <FormItem className="w-full">
                                  <FormLabel className="font-bold  mb-0">Mer. Wo No</FormLabel>
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
                          </div>
                        </div>
                      </div>
                    </form>
                  </Form>
                  <div>
                    <Button
                      type="button"
                      onClick={() => { handleAdd() }}
                      className="mt-2  mb-2"
                    >
                      Add
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
                            Emb Order No
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
                            Order Qty
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Delivery Qty
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Bill Qty
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Emb Type
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Rate
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Total Amount
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Currency
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Action
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
                              {item.WorkOrder}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4  text-center">
                              {item.Buyer ? item?.Buyer : item?.OsBuyer}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.Style ? item?.Style : item?.OsStyle}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.Po ? item?.Po : item?.OsPo}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.Color}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.WoQty}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.DeliveryQty}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              <input
                                type="number"
                                className="w-full text-center text-sm border border-gray-300 rounded p-1"
                                value={item.BillQty}
                                onChange={(e) => {
                                  const updatedData = [...detailsData];
                                  updatedData[index] = {
                                    ...updatedData[index],
                                    BillQty: Number(e.target.value),
                                  };
                                  setdetailsData(updatedData);
                                }}
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.EmbType}
                            </TableCell>

                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.Rate}
                            </TableCell>

                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {((item.Rate || 0) * (item.BillQty || 0)).toFixed(6)}
                            </TableCell>

                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.Currency}
                            </TableCell>
                            <TableCell className="border border-gray-300 p-0 m-0 hover:cursor-pointer">
                              <div className="w-full h-full p-0 m-0 flex justify-center">
                                <Trash2Icon
                                  size={15}
                                  className=" hover:text-red-500 ms-2"
                                  onClick={() => handleRemove(item.WorkOrderId)}
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

                    {pageAction == "rr" && (
                      <Button
                        type="button"
                        disabled={mutation.isPending}
                        onClick={() =>
                          window.open(
                            `../../../../report/embellishment/embellishment-delivery-report?id=${data?.Id}`,
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
                          ? navigator("/win/printing-embroidery/print-emb-bill?pageIndex=" + index + "&CompanyId=" + CompanyId)
                          : navigator("/dashboard/printing-embroidery/print-emb-bill?pageIndex=" + index + "&CompanyId=" + CompanyId)
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
