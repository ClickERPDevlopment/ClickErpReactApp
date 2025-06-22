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
} from "@/actions/PrintingEmbroidery/print-emb-production-action";
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
import { SquarePen, SquarePlus, Trash2Icon } from "lucide-react";

import AppPageContainer from "@/components/app-page-container";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useApiUrl from "@/hooks/use-ApiUrl";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { PrintEmbProductionDetailsType, PrintEmbProductionMasterType, RejectionReasonDetailsType } from "@/actions/PrintingEmbroidery/print-emb-production-action";
import PrintEmbProductionOperationIndex from "./components/print-emb-production-operation-index";
import PrintEmbProductionShiftIndex from "./components/print-emb-production-shift-index";
import PrintEmbProductionWorkStationIndex from "./components/print-emb-production-work-station-index";
import PrintEmbProductionHourIndex from "./components/print-emb-production-hour-index";

const formSchema = z.object({
  ID: z.number().default(0),
  MASTER_ID: z.number().default(0),
  WORK_ORDER_ID: z.number().default(0),
  WORK_ORDER_NO: z.string().optional(),
  BUYER_ID: z.number().optional(),
  BUYER: z.string().optional(),
  STYLE_ID: z.number().optional(),
  STYLE: z.string().optional(),
  PO_ID: z.number().default(0),
  PO_NO: z.string().optional(),
  COLOR_ID: z.number().optional(),
  COLOR: z.string().optional(),
  SIZE_ID: z.number().optional(),
  SIZE: z.string().optional(),
  QC_PASSED_QTY: z.number().optional()
});

const masterFormSchema = z.object({
  PRODUCTION_DATE: z.string(),
  TYPE_ID: z.number().min(1, "Type is required"),
  TYPE: z.string().min(1, "Type is required"),
  SHIFT_ID: z.number().min(1, "Shift is required"),
  SHIFT: z.string().min(1, "Shift is required"),
  OPERATION_ID: z.number().min(1, "Operation is required"),
  OPERATION: z.string().min(1, "Operation is required"),
  FLOOR_ID: z.number().min(1, "Floor is required"),
  FLOOR: z.string().min(1, "Floor is required"),
  WORKSTATION_ID: z.number().min(1, "Workstation is required"),
  WORKSTATION: z.string().min(1, "Workstation is required"),
  MP: z.number().min(1, "MP must be more then zero"),
  PRODUCTION_HOUR_ID: z.number().min(1, "Production hour is required"),
  PRODUCTION_HOUR: z.string().min(1, "Production hour is required"),
  REMARKS: z.string().optional(),
});


const reasonFormSchema = z.object({
  ID: z.number().default(0),
  MASTER_ID: z.number().default(0),
  REASON: z.string().min(1, "Reason is required"),
  QTY: z.number().min(1, "Quantity must be at least 1"),
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


interface IType {
  ID: number;
  NAME: string;
};

interface IWorkstation {
  ID: number;
  NAME: string;
};

interface IOperation {
  ID: number;
  NAME: string;
  TYPE_ID: number;
  TYPE: string;
};

interface IHour {
  ID: number;
  NAME: string;
};

interface IShift {
  ID: number;
  NAME: string;
};

interface IFloor {
  Id: number;
  Unitname: string;
};


interface IRcvWorkOrder {
  ID: number;
  WORK_ORDER_NO: string;
};

interface IColor {
  ID: number;
  COLORNAME: string;
};

interface ISize {
  ID: number;
  SIZENAME: string;
};


export default function PrintEmbProductionForm({
  data,
  pageAction,
}: {
  data: PrintEmbProductionMasterType | undefined | null;
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

      if (pageAction === PageAction.add) {

        masterForm.setValue("PRODUCTION_HOUR", "");
        masterForm.setValue("PRODUCTION_HOUR_ID", 0);

        setMasterData(prev => ({ ...prev, PRODUCTION_HOUR: "", PRODUCTION_HOUR_ID: 0 }));

        setdetailsData([]);
        setSizeWip(null);
        getProductionHour(masterData.PRODUCTION_DATE || new Date().toLocaleDateString("en-CA"));
        //form.reset();
        return;
      }

      queryClient.invalidateQueries({
        queryKey: [ReactQueryKey.SwtPlanningBoard, data?.ID],
      });
      setTimeout(() => {
        location.pathname.includes("win/")
          ? navigator("/win/printing-embroidery/print-emp-production")
          : navigator("/dashboard/printing-embroidery/print-emp-production");
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
  const getPOByStyle = async (woId: number, styleId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllPoByEmbWorkOrderReceiveAndStyle?woId=" + woId + "&styleId=" + styleId);
    setPO(response?.data);
  }

  const [color, setColor] = useState<IColor[]>([]);
  const GetColorByBuyer = async (woId: number, styleId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllColorByEmbWorkOrderReceiveAndStyle?woId=" + woId + "&styleId=" + styleId);
    setColor(response?.data);
  }

  const [size, setSize] = useState<ISize[]>([]);
  const GetSizeByBuyer = async (woId: number, styleId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllSizeByEmbWorkOrderReceiveAndStyle?woId=" + woId + "&styleId=" + styleId);
    setSize(response?.data);
  }

  //get production data
  const [productionHour, setProductionHour] = useState<IHour[]>([]);
  const getProductionHour = async (date: string) => {
    const response = await axios.get(api.ProductionUrl + "/production/PrintEmbProductionHour/GetProductionHourByProductionDate?date=" + date);
    setProductionHour(response?.data);
  }

  const [operation, setOperation] = useState<IOperation[]>([]);
  const getOperation = async (typeId: number = 0) => {
    const response = await axios.get(api.ProductionUrl + "/production/PrintEmbProductionOperation/GetPrintEmbProductionOperationByTypeId?typeId=" + typeId);
    setOperation(response?.data);
  }

  const [shift, setShift] = useState<IShift[]>([]);
  const getShift = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/PrintEmbProductionShift");
    setShift(response?.data);

  }

  const [productionType, setProductionType] = useState<IType[]>([]);
  const getProductionType = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/PrintEmbProductionType");
    setProductionType(response?.data);
  }

  const [workstation, setWorkstation] = useState<IWorkstation[]>([]);
  const getWorkStation = async (typeId: number = 0) => {
    const response = await axios.get(api.ProductionUrl + "/production/PrintEmbProductionWorkStation/GetPrintEmbProductionWorkStationByType?typeId=" + typeId);
    setWorkstation(response?.data);
  }

  const [floor, setFloor] = useState<IFloor[]>([]);
  const getFloor = async (sectionId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/Unit/GetAllUnitBySection?sectionId=" + sectionId);

    if (response?.data.length == 1) {
      masterForm.setValue("FLOOR_ID", response?.data[0].Id);
      setMasterData(prev => ({ ...prev, FLOOR_ID: response?.data[0].Id, FLOOR: response?.data[0].Unitname }));
    }

    setFloor(response?.data);
  }

  const [workOrder, setWorkOrder] = useState<IRcvWorkOrder[]>([]);
  const getWorkOrder = async (embTypeId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/Emb-Wo-Recv-By-Emb-Type?embTypeId=" + embTypeId);
    setWorkOrder(response?.data);
  }

  useEffect(() => {
    getProductionHour(new Date(data?.PRODUCTION_DATE || new Date()).toLocaleDateString("en-CA"));
    getShift();
    getProductionType();

    if (data?.TYPE_ID) {
      getFloor(data?.TYPE_ID);
      getWorkOrder(data?.TYPE_ID);
      getOperation(data?.TYPE_ID);
      getWorkStation(data?.TYPE_ID);
    }
  }, []);


  const masterForm = useForm<z.infer<typeof masterFormSchema>>({
    resolver: zodResolver(masterFormSchema),
    defaultValues: {
      PRODUCTION_DATE: data?.PRODUCTION_DATE ? new Date(data.PRODUCTION_DATE).toLocaleDateString("en-CA") : new Date().toLocaleDateString("en-CA"),
      TYPE_ID: data?.TYPE_ID || 0,
      TYPE: data?.TYPE || "",
      SHIFT_ID: data?.SHIFT_ID || 0,
      SHIFT: data?.SHIFT || "",
      OPERATION_ID: data?.OPERATION_ID || 0,
      OPERATION: data?.OPERATION || "",
      FLOOR_ID: data?.FLOOR_ID || 0,
      FLOOR: data?.FLOOR || "",
      WORKSTATION_ID: data?.WORKSTATION_ID || 0,
      WORKSTATION: data?.WORKSTATION || "",
      MP: data?.MP || 0,
      PRODUCTION_HOUR_ID: data?.PRODUCTION_HOUR_ID || 0,
      PRODUCTION_HOUR: data?.PRODUCTION_HOUR || "",
      REMARKS: data?.REMARKS || "",
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

    data.PrintEmbProductionDetails = detailsData || [];

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
    PrintEmbProductionDetailsType[] | null | undefined
  >(data?.PrintEmbProductionDetails);


  const [printEmbProductionDetailserror, setprintEmbProductionDetailserror] = useState({
    WORK_ORDER_NO: "",
    BUYER: "",
    STYLE: "",
    PO_NO: "",
    COLOR: "",
    SIZE: ""
  });

  const validateFields = (excludeFields: string[] = []): boolean => {
    const requiredFields = [
      "WORK_ORDER_NO",
      "BUYER",
      "STYLE",
      "PO_NO",
      "COLOR",
      "SIZE"
    ];

    const errors: Record<string, string> = {};
    let hasError = false;

    requiredFields.forEach((field) => {
      if (excludeFields.includes(field)) {
        errors[field] = "";
        return;
      }

      const value = (printEmbProductionDetails as any)[field];
      if (!value || (typeof value === "string" && value.trim() === "")) {
        errors[field] = `${field} is required`;
        hasError = true;
      } else {
        errors[field] = "";
      }
    });

    setprintEmbProductionDetailserror(errors as typeof printEmbProductionDetailserror);
    return !hasError;
  };

  const handleAdd = async (type: string = "") => {

    if (type === "Edit") {

      if (editingIndex !== null && detailsData) {
        setdetailsData((prevData) => {
          const newData = [...(prevData || [])];
          const currentItem = newData[editingIndex];
          const updatedItem: PrintEmbProductionDetailsType = { ...currentItem };

          (Object.keys(printEmbProductionDetails) as (keyof PrintEmbProductionDetailsType)[]).forEach((key) => {
            if (key === "ReasonDetails") return;
            const newValue = printEmbProductionDetails[key];

            const shouldUpdate =
              (typeof newValue === "string" && newValue.trim() !== "") ||
              (typeof newValue === "number" && newValue !== 0) ||
              (Array.isArray(newValue) && newValue.length > 0);

            if (shouldUpdate) {
              (updatedItem as any)[key] = newValue;
            }
          });

          newData[editingIndex] = updatedItem;
          return newData;
        });
      }

      form.reset({ QC_PASSED_QTY: 0 });

      setEditingIndex(-1);
      setEditBtn(false);
    }
    else {

      if (type === "Add All Size") {
        if (!validateFields(["SIZE"])) return;

        const response = await axios.get(api.ProductionUrl + `/production/PrintEmbProduction/EmbWorkOrderRcvDetails?woId=${printEmbProductionDetails.WORK_ORDER_ID}&buyerId=${printEmbProductionDetails.BUYER_ID}&styleId=${printEmbProductionDetails.STYLE_ID}&poId=${printEmbProductionDetails.PO_ID}&colorId=${printEmbProductionDetails.COLOR_ID}&sizeId=0`);

        setdetailsData(prev => [...(prev || []), ...(response?.data || [])]);

      }
      else {
        if (!validateFields()) return;

        const wipQty = Number(sizeWip) || 0;
        const qcPassedQty = printEmbProductionDetails.QC_PASSED_QTY || 0;

        if (qcPassedQty > wipQty) {
          toast.error("QC Passed Quantity cannot be greater than WIP quantity.");
          return;
        }

        const response = await axios.get(api.ProductionUrl + `/production/PrintEmbProduction/EmbWorkOrderRcvDetails?woId=${printEmbProductionDetails.WORK_ORDER_ID}&buyerId=${printEmbProductionDetails.BUYER_ID}&styleId=${printEmbProductionDetails.STYLE_ID}&poId=${printEmbProductionDetails.PO_ID}&colorId=${printEmbProductionDetails.COLOR_ID}&sizeId=${printEmbProductionDetails.SIZE_ID}`);


        setdetailsData(prev => [
          ...(prev || []),
          ...((response?.data || []).map((item: PrintEmbProductionDetailsType) => ({
            ...item,
            QC_PASSED_QTY: qcPassedQty
          })))
        ]);

      }
    }
    reasonForm.reset();
  };

  const handleRemove = (index: number) => {
    const items = detailsData?.filter((_d, i) => i !== index);
    setdetailsData([...(items || [])]);
  };

  const [masterData, setMasterData] = useState<PrintEmbProductionMasterType>({
    ID: data ? data.ID : 0,
    PRODUCTION_DATE: data?.PRODUCTION_DATE ? new Date(data.PRODUCTION_DATE).toLocaleDateString("en-CA") : new Date().toLocaleDateString("en-CA"),
    TYPE_ID: data ? data.TYPE_ID : 0,
    TYPE: data ? data.TYPE : "",
    SHIFT_ID: data ? data.SHIFT_ID : 0,
    SHIFT: data ? data.SHIFT : "",
    OPERATION_ID: data ? data.OPERATION_ID : 0,
    OPERATION: data ? data.OPERATION : "",
    FLOOR_ID: data ? data.FLOOR_ID : 0,
    FLOOR: data ? data.FLOOR : "",
    WORKSTATION_ID: data ? data.WORKSTATION_ID : 0,
    WORKSTATION: data ? data.WORKSTATION : "",
    MP: data ? data.MP : 0,
    PRODUCTION_HOUR_ID: data ? data.PRODUCTION_HOUR_ID : 0,
    PRODUCTION_HOUR: data ? data.PRODUCTION_HOUR : "",
    REMARKS: data ? data.REMARKS || "" : "",
    PrintEmbProductionDetails: data ? data.PrintEmbProductionDetails : []
  });

  const [printEmbProductionDetails, setPrintEmbProductionDetails] = useState<PrintEmbProductionDetailsType>({
    ID: 0,
    MASTER_ID: 0,
    WORK_ORDER_ID: 0,
    WORK_ORDER_NO: "",
    BUYER_ID: 0,
    BUYER: "",
    OS_BUYER_ID: 0,
    OS_BUYER: "",
    STYLE_ID: 0,
    STYLE: "",
    OS_STYLE_ID: 0,
    OS_STYLE: "",
    PO_ID: 0,
    PO_NO: "",
    OS_PO_ID: 0,
    OS_PO_NO: "",
    COLOR_ID: 0,
    COLOR: "",
    SIZE_ID: 0,
    SIZE: "",
    QC_PASSED_QTY: 0,
    ReasonDetails: [],
  });


  const [reasonDetails, setReasonDetails] = useState<RejectionReasonDetailsType>({
    ID: 0,
    MASTER_ID: 0,
    REASON: "",
    QTY: 0,
  });

  const handleReasonDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setReasonDetails((prev) => ({
      ...prev,
      [name]: name === "QTY" ? Number(value) : value,
    }));
  };

  const handleMasterInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setMasterData((prev) => ({
      ...prev,
      [name]: name === "MP" ? Number(value) : value,
    }));
  };

  const handleDetailsInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setPrintEmbProductionDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ID: 0,
      MASTER_ID: 0,
      WORK_ORDER_ID: 0,
      WORK_ORDER_NO: "",
      BUYER_ID: 0,
      BUYER: "",
      STYLE_ID: 0,
      STYLE: "",
      PO_ID: 0,
      PO_NO: "",
      COLOR_ID: 0,
      COLOR: "",
      SIZE_ID: 0,
      SIZE: "",
      QC_PASSED_QTY: 0,
    },
  });

  const reasonForm = useForm<z.infer<typeof reasonFormSchema>>({
    resolver: zodResolver(reasonFormSchema),
    defaultValues: {
      ID: 0,
      MASTER_ID: 0,
      REASON: "",
      QTY: 0
    },
  });

  if (!reasonForm?.control) {
    console.error("orderForm control is not available.");

  }


  const [openBuyer, setOpenBuyer] = useState(false);
  const [openStyle, setOpenStyle] = useState(false);
  const [openPO, setOpenPO] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openSize, setOpenSize] = useState(false);


  const [openProductionType, setOpenProductionType] = useState(false);
  const [openShift, setOpenShift] = useState(false);
  const [openOperation, setOpenOperation] = useState(false);
  const [openFloor, setOpenFloor] = useState(false);
  const [openWorkstaion, setOpenWorkstation] = useState(false);
  const [openProductionHour, setOpenProductionHour] = useState(false);
  const [openWorkOrder, setOpenWorkOrder] = useState(false);


  const [openReasonDetailsModal, setOpenReasonDetailsModal] = useState(false);
  const [openOperationModal, setOpenOperationModal] = useState(false);
  const [openShiftnModal, setOpenShiftModal] = useState(false);
  const [openWorkStationModal, setOpenWorkStationModal] = useState(false);
  const [openProductionHourModal, setOpenProductionHourModal] = useState(false);
  const [reasonModalData, setReasonModalData] = useState<RejectionReasonDetailsType[]>([]);
  const [selectedDetailsIndex, setSelectedDetailsIndex] = useState<number>(-1);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [editBtn, setEditBtn] = useState(false);



  const handleEdit = (selectedData: PrintEmbProductionDetailsType) => {

    setPrintEmbProductionDetails(selectedData);

    form.reset({
      QC_PASSED_QTY: selectedData.QC_PASSED_QTY,
    });

  };

  const [sizeWip, setSizeWip] = useState<number | null>(null);

  const loadSizeWiseWip = async (sizeId: number) => {

    if (!printEmbProductionDetails.WORK_ORDER_ID || !printEmbProductionDetails.BUYER_ID || !printEmbProductionDetails.STYLE_ID || !printEmbProductionDetails.PO_ID || !printEmbProductionDetails.COLOR_ID) {
      toast.error("Please select all required fields before loading WIP.");
      return;
    }

    const response = await axios.get(api.ProductionUrl + `/production/PrintEmbProduction/EmbWorkOrderRcvDetails?woId=${printEmbProductionDetails.WORK_ORDER_ID}&buyerId=${printEmbProductionDetails.BUYER_ID}&styleId=${printEmbProductionDetails.STYLE_ID}&poId=${printEmbProductionDetails.PO_ID}&colorId=${printEmbProductionDetails.COLOR_ID}&sizeId=${sizeId}`);

    console.log("WIP Response:", response?.data);
    setSizeWip(response?.data?.[0]?.WIP || null);
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
                  name="PRODUCTION_DATE"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-bold">Production Date</FormLabel>
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
                            getProductionHour(newDate?.toLocaleDateString("en-CA") || new Date().toLocaleDateString("en-CA"));
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
                                      field.onChange(Number(typeData.ID));
                                      setMasterData((prev) => ({
                                        ...prev,
                                        TYPE_ID: Number(typeData.ID),
                                        TYPE: typeData.NAME,
                                      }));
                                      getFloor(typeData.ID);
                                      getWorkOrder(typeData.ID);
                                      getOperation(typeData.ID);
                                      getWorkStation(typeData.ID);
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

                <div className="flex items-start">
                  <FormField
                    control={masterForm.control}
                    name="SHIFT_ID"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel className="font-bold">Shift</FormLabel>
                        <Popover open={openShift} onOpenChange={setOpenShift}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openShift}
                                className={cn(
                                  "w-full justify-between bg-emerald-100",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? shift?.find(
                                    (shift) =>
                                      Number(shift.ID) === Number(field.value)
                                  )?.NAME
                                  : "Select a shift type"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search production type..." className="h-9" />
                              <CommandList>
                                <CommandEmpty>No production shift found.</CommandEmpty>
                                <CommandGroup>
                                  {shift?.map((shiftData) => (
                                    <CommandItem
                                      value={shiftData.NAME}
                                      key={shiftData.ID}
                                      onSelect={() => {
                                        field.onChange(Number(shiftData.ID));
                                        setMasterData((prev) => ({
                                          ...prev,
                                          SHIFT_ID: Number(shiftData.ID),
                                          SHIFT: shiftData.NAME,
                                        }));
                                        setOpenShift(false);
                                      }}
                                    >
                                      {shiftData.NAME}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          Number(shiftData.ID) === Number(field.value)
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
                  <Button
                    type="button"
                    onClick={() => setOpenShiftModal(true)}
                    variant="outline"
                    className="h-9 w-9 flex items-center justify-center shadow-none mb-0.5 mt-5"
                  >
                    <SquarePlus className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-start">
                  <FormField
                    control={masterForm.control}
                    name="OPERATION_ID"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel className="font-bold">Operation</FormLabel>
                        <Popover open={openOperation} onOpenChange={setOpenOperation}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openOperation}
                                className={cn(
                                  "w-full justify-between bg-emerald-100",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? operation?.find(
                                    (operationData) =>
                                      Number(operationData.ID) === Number(field.value)
                                  )?.NAME
                                  : "Select an operation"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search production type..." className="h-9" />
                              <CommandList>
                                <CommandEmpty>No operation found.</CommandEmpty>
                                <CommandGroup>
                                  {operation?.map((operationData) => (
                                    <CommandItem
                                      value={operationData.NAME}
                                      key={operationData.ID}
                                      onSelect={() => {
                                        field.onChange(Number(operationData.ID));
                                        setMasterData((prev) => ({
                                          ...prev,
                                          OPERATION_ID: Number(operationData.ID),
                                          OPERATION: operationData.NAME,
                                        }));
                                        setOpenOperation(false);
                                      }}
                                    >
                                      {operationData.NAME}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          Number(operationData.ID) === Number(field.value)
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
                  <Button
                    type="button"
                    onClick={() => setOpenOperationModal(true)}
                    variant="outline"
                    className="h-9 w-9 flex items-center justify-center shadow-none mb-0.5 mt-5"
                  >
                    <SquarePlus className="w-5 h-5" />
                  </Button>
                </div>


                <FormField
                  control={masterForm.control}
                  name="FLOOR_ID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel className="font-bold">Floor</FormLabel>
                      <Popover open={openFloor} onOpenChange={setOpenFloor}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openOperation}
                              className={cn(
                                "w-full justify-between bg-emerald-100",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? floor?.find(
                                  (floorData) =>
                                    Number(floorData.Id) === Number(field.value)
                                )?.Unitname
                                : "Select a floor"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search floor..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No operation shift found.</CommandEmpty>
                              <CommandGroup>
                                {floor?.map((floorData) => (
                                  <CommandItem
                                    value={floorData.Unitname}
                                    key={floorData.Id}
                                    onSelect={() => {
                                      field.onChange(Number(floorData.Id));
                                      setMasterData((prev) => ({
                                        ...prev,
                                        FLOOR_ID: Number(floorData.Id),
                                        FLOOR: floorData.Unitname,
                                      }));
                                      setOpenFloor(false);
                                    }}
                                  >
                                    {floorData.Unitname}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        Number(floorData.Id) === Number(field.value)
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

                <div className="flex items-start">
                  <FormField
                    control={masterForm.control}
                    name="WORKSTATION_ID"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel className="font-bold">Work Staion</FormLabel>
                        <Popover open={openWorkstaion} onOpenChange={setOpenWorkstation}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openWorkstaion}
                                className={cn(
                                  "w-full justify-between bg-emerald-100",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? workstation?.find(
                                    (workstationData) =>
                                      Number(workstationData.ID) === Number(field.value)
                                  )?.NAME
                                  : "Select a work station"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search production type..." className="h-9" />
                              <CommandList>
                                <CommandEmpty>No work station found.</CommandEmpty>
                                <CommandGroup>
                                  {workstation?.map((workstationData) => (
                                    <CommandItem
                                      value={workstationData.NAME}
                                      key={workstationData.ID}
                                      onSelect={() => {
                                        field.onChange(Number(workstationData.ID));
                                        setMasterData((prev) => ({
                                          ...prev,
                                          WORKSTATION_ID: Number(workstationData.ID),
                                          WORKSTATION: workstationData.NAME,
                                        }));
                                        setOpenWorkstation(false);
                                      }}
                                    >
                                      {workstationData.NAME}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          Number(workstationData.ID) === Number(field.value)
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
                  <Button
                    type="button"
                    onClick={() => setOpenWorkStationModal(true)}
                    variant="outline"
                    className="h-9 w-9 flex items-center justify-center mt-5 shadow-none"
                  >
                    <SquarePlus className="w-5 h-5" />
                  </Button>
                </div>

                <FormField
                  control={masterForm.control}
                  name="MP"
                  render={({ field }) => (
                    <FormItem className="w-full h-10">
                      <FormLabel className="font-bold  mb-0">MP</FormLabel>
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

                <div className="flex items-start">
                  <FormField
                    control={masterForm.control}
                    name="PRODUCTION_HOUR_ID"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel className="font-bold">Production Hour</FormLabel>
                        <Popover open={openProductionHour} onOpenChange={setOpenProductionHour}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openWorkstaion}
                                className={cn(
                                  "w-full justify-between bg-emerald-100",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? productionHour?.find(
                                    (productionHourData) =>
                                      Number(productionHourData.ID) === Number(field.value)
                                  )?.NAME
                                  : "Select a production hour"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search production hour..." className="h-9" />
                              <CommandList>
                                <CommandEmpty>No operation production hour found.</CommandEmpty>
                                <CommandGroup>
                                  {productionHour?.map((productionHourData) => (
                                    <CommandItem
                                      value={productionHourData.NAME}
                                      key={productionHourData.ID}
                                      onSelect={() => {
                                        field.onChange(Number(productionHourData.ID));
                                        setMasterData((prev) => ({
                                          ...prev,
                                          PRODUCTION_HOUR_ID: Number(productionHourData.ID),
                                          PRODUCTION_HOUR: productionHourData.NAME,
                                        }));
                                        setOpenProductionHour(false);
                                      }}
                                    >
                                      {productionHourData.NAME}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          Number(productionHourData.ID) === Number(field.value)
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
                  <Button
                    type="button"
                    onClick={() => setOpenProductionHourModal(true)}
                    variant="outline"
                    className="h-9 w-9 flex items-center justify-center mt-5 shadow-none"
                  >
                    <SquarePlus className="w-5 h-5" />
                  </Button>
                </div>

                <div>
                  <FormField
                    control={masterForm.control}
                    name="REMARKS"
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

              </div>
            </form>
          </Form>
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
                                              setPrintEmbProductionDetails((prev) => ({
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
                      <div className="h-4">
                        {printEmbProductionDetailserror.WORK_ORDER_NO && (
                          <p className="text-sm">{printEmbProductionDetailserror.WORK_ORDER_NO}</p>
                        )}
                      </div>
                    </div>

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
                                              setPrintEmbProductionDetails((prev) => ({
                                                ...prev,
                                                BUYER_ID: Number(buyer?.Id),
                                                BUYER: buyer?.NAME,
                                              }));
                                              getStyleByBuyer(Number(printEmbProductionDetails.WORK_ORDER_ID), Number(buyer?.Id));

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
                        {/* <Button
                        onClick={() => orderForm.resetField("BUYER_ID")}
                        variant={"outline"}
                        type="button"
                        className="m-0 ml-1 px-[12px]"
                      >
                        <MdOutlineClear className="rounded text-slate-600 m-0" />
                      </Button> */}
                      </div>
                      <div className="h-4">
                        {printEmbProductionDetailserror.BUYER && (
                          <p className="text-sm">{printEmbProductionDetailserror.BUYER}</p>
                        )}
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
                                              setPrintEmbProductionDetails((prev) => ({
                                                ...prev,
                                                STYLE_ID: Number(item.Id),
                                                STYLE: item.Styleno,
                                              }));
                                              setOpenStyle(false);
                                              getPOByStyle(Number(printEmbProductionDetails.WORK_ORDER_ID), Number(item?.Id));
                                              GetColorByBuyer(Number(printEmbProductionDetails.WORK_ORDER_ID), Number(item?.Id));
                                              GetSizeByBuyer(Number(printEmbProductionDetails.WORK_ORDER_ID), Number(item?.Id));
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
                        {/* <Button
                        onClick={() => orderForm.resetField("STYLE_ID")}
                        variant={"outline"}
                        type="button"
                        className="m-0 ml-1 px-[12px]"
                      >
                        <MdOutlineClear className="rounded text-slate-600 m-0" />
                      </Button> */}
                      </div>
                      <div className="h-4">
                        {printEmbProductionDetailserror.STYLE && (
                          <p className="text-sm">{printEmbProductionDetailserror.STYLE}</p>
                        )}
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
                                              setPrintEmbProductionDetails((prev) => ({
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
                      <div className="h-4">
                        {printEmbProductionDetailserror.PO_NO && (
                          <p className="text-sm">{printEmbProductionDetailserror.PO_NO}</p>
                        )}
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
                                              setPrintEmbProductionDetails((prev) => ({
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
                      <div className="h-4">
                        {printEmbProductionDetailserror.COLOR && (
                          <p className="text-sm">{printEmbProductionDetailserror.COLOR}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-end">
                        <FormField
                          control={form.control}
                          name="SIZE_ID"
                          render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                              <FormLabel className="font-bold">Size</FormLabel>
                              <Popover open={openSize} onOpenChange={setOpenSize}>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={openSize}
                                      className={cn(
                                        "w-full justify-between bg-emerald-100",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? size?.find(
                                          (sizeData) =>
                                            Number(sizeData.ID) === field.value
                                        )?.SIZENAME
                                        : "Select a size"}
                                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput placeholder="Search size..." className="h-9" />
                                    <CommandList>
                                      <CommandEmpty>No size found.</CommandEmpty>
                                      <CommandGroup>
                                        {size?.map((sizeData) => (
                                          <CommandItem
                                            value={sizeData.SIZENAME}
                                            key={sizeData.ID}
                                            onSelect={() => {
                                              field.onChange(Number(sizeData.ID));
                                              setPrintEmbProductionDetails((prev) => ({
                                                ...prev,
                                                SIZE_ID: Number(sizeData.ID),
                                                SIZE: sizeData.SIZENAME,
                                              }));
                                              setOpenSize(false);
                                              loadSizeWiseWip(sizeData.ID);
                                            }}
                                          >
                                            {sizeData.SIZENAME}
                                            <CheckIcon
                                              className={cn(
                                                "ml-auto h-4 w-4",
                                                Number(sizeData.ID) === field.value
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
                        {
                          sizeWip && sizeWip > 0 &&
                          <div className="text-center">
                            <p className="font-bold">Wip</p>
                            <Button disabled className="bg-inherit hover:bg-inherit text-gray-950">{sizeWip}</Button>
                          </div>
                        }

                      </div>
                      <div className="h-4">
                        {printEmbProductionDetailserror.SIZE && (
                          <p className="text-sm">{printEmbProductionDetailserror.SIZE}</p>
                        )}
                      </div>
                    </div>

                    {/* <div>
                      {sizeWip}
                    </div> */}

                    <div>
                      <div className="flex justify-between items-end">
                        <FormField
                          control={form.control}
                          name="QC_PASSED_QTY"
                          render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                              <FormLabel className="font-bold  mb-0">QC Passed Qty</FormLabel>
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
                {
                  editBtn == true ? <Button
                    type="button"
                    onClick={() => handleAdd("Edit")}
                    className="mt-2 mb-2"
                  >
                    Edit
                  </Button> : <Button
                    type="button"
                    onClick={() => handleAdd()}
                    className="mt-2 mb-2"
                  >
                    Add
                  </Button>
                }
                <Button
                  type="button"
                  onClick={() => handleAdd("Add All Size")}
                  className="mt-2 ms-2 mb-2"
                >
                  Add All Size
                </Button>

                <div className="max-h-[300px] overflow-y-auto border rounded-md">
                  <Table className="min-w-full rounded-md">
                    <TableHeader className="bg-green-100 rounded-md">
                      <TableRow className=" rounded-md">
                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                          S/L
                        </TableHead>
                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                          Work Order No
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
                          PARTS
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          WIP
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          QC Passed Qty
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Rejected Qty
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {detailsData?.map((item, index) => (
                        <TableRow className={`${editingIndex === index ? 'bg-green' : 'odd:bg-white even:bg-gray-50'
                          }`}>
                          <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                            {item?.WORK_ORDER_NO}
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
                            {item.PARTS}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {item.WIP}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center w-[60px]">
                            <input
                              type="number"
                              className="w-full text-center text-sm border border-gray-300 rounded p-1"
                              value={item.QC_PASSED_QTY}
                              onChange={(e) => {
                                const updatedData = [...detailsData];

                                const wipQty = item.WIP || 0;
                                const qcPassedQty = Number(e.target.value);
                                if (qcPassedQty > wipQty) {
                                  toast.error("QC Passed Qty cannot be greater than WIP Qty");
                                  return;
                                }

                                updatedData[index] = {
                                  ...updatedData[index],
                                  QC_PASSED_QTY: Number(e.target.value),
                                };
                                setdetailsData(updatedData);
                              }}
                            />
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center ">

                            <div className="flex align-middle justify-center gap-1 p-1">
                              <span>
                                {item?.ReasonDetails?.reduce(
                                  (acc, item) => acc + Number(item.QTY),
                                  0
                                )}
                              </span>
                              <Button
                                type="button"
                                onClick={() => {
                                  setReasonModalData(item?.ReasonDetails);
                                  setOpenReasonDetailsModal(true)
                                  setSelectedDetailsIndex(index);
                                }}
                                variant="outline"
                                className="h-5 w-5 flex border-0 items-center justify-center mt-auto shadow-none"
                              >
                                <SquarePlus className="w-5 h-5" />
                              </Button>
                            </div>

                          </TableCell>
                          <TableCell className="border border-gray-300 p-0 m-0 hover:cursor-pointer">
                            <div className="w-full h-full p-0 m-0 flex justify-center">
                              <SquarePen
                                size={15}
                                className="hover:text-blue-500"
                                onClick={() => { setEditingIndex(index), handleEdit(item), setEditBtn(true) }}
                                style={{ color: "blue", cursor: "pointer" }}
                              />
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
                    {/* <Button
                      type="reset"
                      disabled={mutation.isPending}
                      onClick={() => {
                        form.reset();
                        form.clearErrors();
                      }}
                      variant={"destructive"}
                      className={cn(
                        "w-24",
                        pageAction === PageAction.view ? "hidden" : "",
                        pageAction === PageAction.delete ? "hidden" : ""
                      )}
                    >
                      Cancel
                    </Button> */}
                  </div>
                  <Button
                    type="reset"
                    disabled={mutation.isPending}
                    onClick={() =>
                      location.pathname.includes("win/")
                        ? navigator("/win/printing-embroidery/print-emp-production")
                        : navigator("/dashboard/printing-embroidery/print-emp-production")
                    }
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
        {/* <div className="p-2 mt-5">
          {
            pageAction != PageAction.add &&
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`/report/merchandising/compensation-claim-report?id=${masterData.ID}`}
              className="px-4 py-2 bg-blue font-semibold text-white rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Show Report
            </a>
          }
        </div> */}
      </div>
      <div>

        {/* reason details dialog */}
        <Dialog open={openReasonDetailsModal} onOpenChange={setOpenReasonDetailsModal}>
          <DialogTrigger asChild>

          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] bg-white">
            <DialogHeader>
              <DialogTitle>Reason</DialogTitle>
              <DialogDescription>

                <div>
                  <Form {...reasonForm} >
                    <form
                      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
                      className=""
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {/* Reason Input Field */}
                        <div className="flex flex-col">
                          <FormField
                            control={reasonForm.control}
                            name="REASON"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold mb-0">Reason</FormLabel>
                                <FormControl className="m-0" onChange={handleReasonDetailsChange}>
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

                        {/* Quantity Input Field */}
                        <div className="flex flex-col">
                          <FormField
                            control={reasonForm.control}
                            name="QTY"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold mb-0">Qty</FormLabel>
                                <FormControl className="m-0" onChange={handleReasonDetailsChange}>
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
                      </div>
                    </form>
                  </Form>
                </div>

                <div className="mt-1">
                  <Button
                    onClick={() => {
                      const updatedReasonModalData = [...reasonModalData, reasonDetails];
                      setReasonModalData(updatedReasonModalData);

                      setReasonDetails({ ID: 0, MASTER_ID: 0, REASON: "", QTY: 0 });

                      if (selectedDetailsIndex !== null && detailsData) {
                        setdetailsData((prevData) => {
                          const newData = [...prevData || []];
                          const targetItem = { ...newData[selectedDetailsIndex] };

                          targetItem.ReasonDetails = updatedReasonModalData;
                          newData[selectedDetailsIndex] = targetItem;
                          return newData;
                        });
                      }
                      reasonForm.reset();
                    }}
                  >
                    Add
                  </Button>
                </div>

                <div className="mt-3">
                  <Table className="min-w-full rounded-md">
                    <TableHeader className="bg-green-100 rounded-md">
                      <TableRow className=" rounded-md">
                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                          S/L
                        </TableHead>
                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                          Reason
                        </TableHead>
                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                          Qty
                        </TableHead>
                        <TableHead className="w-[60px] border border-gray-300 text-center px-4 whitespace-nowrap">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {
                        reasonModalData?.map((reason, index) => <TableRow className="odd:bg-white even:bg-gray-50">
                          <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                            {reason?.REASON}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                            {reason?.QTY}
                          </TableCell>
                          <TableCell className="border border-gray-300 p-0 m-0 hover:cursor-pointer">
                            <div className="w-full h-full p-0 m-0 flex justify-center">
                              <Trash2Icon
                                size={15}
                                className=" hover:text-red-500"
                                onClick={() => {
                                  const updated = reasonModalData.filter((_, i) => i !== index);

                                  setReasonModalData(updated);
                                  if (selectedDetailsIndex !== null && detailsData) {
                                    setdetailsData((prevData) => {
                                      const newData = [...prevData || []];
                                      const targetItem = { ...newData[selectedDetailsIndex] };

                                      targetItem.ReasonDetails = updated;
                                      newData[selectedDetailsIndex] = targetItem;

                                      return newData;
                                    });
                                  }
                                }}
                                style={{ color: "red" }}
                              />
                            </div>
                          </TableCell>
                        </TableRow>)
                      }
                    </TableBody>
                  </Table>
                </div>

              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            </div>
            <DialogFooter>
              <Button onClick={() => { setReasonModalData([]), setOpenReasonDetailsModal(false) }} >Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>


        {/* operation dialog */}
        <Dialog open={openOperationModal} onOpenChange={setOpenOperationModal}>
          <DialogTrigger asChild>

          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] bg-white">
            <DialogHeader>
              <DialogTitle>Production Operation</DialogTitle>
              <DialogDescription>
                <PrintEmbProductionOperationIndex></PrintEmbProductionOperationIndex>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            </div>
            <DialogFooter>
              <Button onClick={() => { getOperation(), setOpenOperationModal(false) }} >Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>


        {/* shift dialog */}
        <Dialog open={openShiftnModal} onOpenChange={setOpenShiftModal}>
          <DialogTrigger asChild>

          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] bg-white">
            <DialogHeader>
              <DialogTitle>Production Shift</DialogTitle>
              <DialogDescription>
                <PrintEmbProductionShiftIndex></PrintEmbProductionShiftIndex>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            </div>
            <DialogFooter>
              <Button onClick={() => { getShift(), setOpenShiftModal(false) }} >Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>


        {/* work station dialog */}
        <Dialog open={openWorkStationModal} onOpenChange={setOpenWorkStationModal}>
          <DialogTrigger asChild>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] bg-white">
            <DialogHeader>
              <DialogTitle>Work Station</DialogTitle>
              <DialogDescription>
                <PrintEmbProductionWorkStationIndex></PrintEmbProductionWorkStationIndex>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            </div>
            <DialogFooter>
              <Button onClick={() => { getWorkStation(), setOpenWorkStationModal(false) }} >Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* work production hour */}
        <Dialog open={openProductionHourModal} onOpenChange={setOpenProductionHourModal}>
          <DialogTrigger asChild>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] bg-white">
            <DialogHeader>
              <DialogTitle>Production Hour</DialogTitle>
              <DialogDescription>
                <PrintEmbProductionHourIndex></PrintEmbProductionHourIndex>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            </div>
            <DialogFooter>
              <Button onClick={() => { getProductionHour(masterData.PRODUCTION_DATE || new Date().toLocaleDateString("en-CA")), setOpenProductionHourModal(false) }} >Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </AppPageContainer>
  );
}
