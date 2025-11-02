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
} from "@/actions/PrintingEmbroidery/print-emb-quality-action";
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
import { SquarePlus, Trash2Icon } from "lucide-react";

import AppPageContainer from "@/components/app-page-container";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useApiUrl from "@/hooks/use-ApiUrl";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

import { PrintEmbQualityDefectDetail, PrintEmbQualityDetail, PrintEmbQualityMaster } from "@/actions/PrintingEmbroidery/print-emb-quality-action";

const formSchema = z.object({
  Id: z.number().default(0),
  MasterId: z.number().default(0),
  BuyerId: z.number().default(0),
  Buyer: z.string().optional(),
  OsBuyerId: z.number().optional(),
  OsBuyer: z.string().optional(),
  StyleId: z.number().optional(),
  Style: z.string().optional(),
  OsStyleId: z.number().default(0),
  OsStyle: z.string().optional(),
  PoId: z.number().optional(),
  Po: z.string().optional(),
  OsPoId: z.number().optional(),
  OsPo: z.string().optional(),
  ColorId: z.number().optional(),
  Color: z.string().optional(),
  Parts: z.string().optional(),
  OrderQty: z.number().optional(),
  CheckQty: z.number().optional(),
  QcPassedQty: z.number().optional(),
  RectifyQty: z.number().optional(),
  RejectQty: z.number().optional(),
  DefectQty: z.number().optional(),
  QC_PASSED_QTY: z.number().optional()
});

const masterFormSchema = z.object({
  Id: z.number().default(0),
  EntryDate: z.string(),
  PartyId: z.number().min(1, "Party is required"),
  Party: z.string().min(1, "Party is required"),
  EmbTypeId: z.number().min(1, "Emb Type is required"),
  EmbType: z.string().min(1, "Emb Type is required"),
  FloorId: z.number().min(1, "Floor is required"),
  Floor: z.string().min(1, "Floor is required"),
  WorkStationId: z.number().min(1, "Work Station is required"),
  WorkStation: z.string().min(1, "Work Station is required"),
  WorkOrderId: z.number().min(1, "Work Order is required"),
  WorkOrder: z.string().min(1, "Work Order is required"),
  Remarks: z.string().optional(),
});


const defectFormSchema = z.object({
  Id: z.number().default(0),
  DetailId: z.number().default(0),
  DefectId: z.number().default(0),
  DefectName: z.string().min(1, "Reason is required"),
  Qty: z.number().min(1, "Quantity must be at least 1"),
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

interface IDefect {
  Id: number;
  Name: string;
};


interface ISupplier {
  Id: number;
  Name: string;
};


export default function PrintEmbQualityForm({
  data,
  pageAction,
}: {
  data: PrintEmbQualityMaster | undefined | null;
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
        return Delete(tag.Id, axios);
      } else {
        throw new Error("Page Action no found.");
      }
    },
    onSuccess: () => {

      toast.success("Action performed successfully!");

      queryClient.invalidateQueries({
        queryKey: [ReactQueryKey.PrintEmbQuality, data?.Id],
      });
      const params = new URLSearchParams(location.search);
      const index = params.get("pageIndex");

      const basePath = location.pathname.includes("win/")
        ? "/win/printing-embroidery/print-emb-quality"
        : "/dashboard/printing-embroidery/print-emb-quality";

      setTimeout(() => {
        navigator(`${basePath}?pageIndex=${index || 0}`);
      }, 2000);


    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
    },
  });

  const api = useApiUrl();

  const [supplier, setSupplier] = useState<ISupplier[]>([]);
  const getSupplier = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllEmbWorkOrderReceiveSupplier");
    setSupplier(response?.data);
  }

  const [defect, setDefect] = useState<IDefect[]>([]);
  const getDefectData = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/PrintEmbQuality/GetPrintEmbDefect");
    setDefect(response?.data);
  }

  const [buyerData, setBuyerData] = useState<IBuyer[]>([]);
  const getBuyerData = async (woId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllBuyerByEmbWorkOrderReceive?Id=" + woId + "&EmbTypeId=" + 0);
    setBuyerData(response?.data);
  }

  const [style, setStyle] = useState<IStyle[]>([]);
  const getStyleByBuyer = async (woId: number, BuyerId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllStyleByEmbWorkOrderReceiveAndBuyer?woId=" + woId + "&BuyerId=" + BuyerId);
    setStyle(response?.data);
  }

  const [PO, setPO] = useState<IPO[]>([]);
  const getPOByStyle = async (woId: number, StyleId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllPoByEmbWorkOrderReceiveAndStyle?woId=" + woId + "&StyleId=" + StyleId);
    setPO(response?.data);
  }

  const [color, setColor] = useState<IColor[]>([]);
  const GetColor = async (woId: number, poId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllColorByEmbWorkOrderReceiveAndStyle?woId=" + woId + "&StyleId=" + printEmbQualityDetails.StyleId + "&poId=" + poId);
    setColor(response?.data);
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

  const [Floor, setFloor] = useState<IFloor[]>([]);
  const getFloor = async (sectionId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/Unit/GetAllUnitBySection?sectionId=" + sectionId);

    if (response?.data.length == 1) {
      masterForm.setValue("FloorId", response?.data[0].Id);
      setMasterData(prev => ({ ...prev, FloorId: response?.data[0].Id, Floor: response?.data[0].Unitname }));
    }

    setFloor(response?.data);
  }

  const [WorkOrder, setWorkOrder] = useState<IRcvWorkOrder[]>([]);

  const getWorkOrder = async (BuyerId: number, StyleId: number, poId: number, EmbTypeId: number) => {

    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetEmbWorkOrderReceiveByBuyerStylePo?BuyerId=" + BuyerId + "&StyleId=" + StyleId + "&poId=" + poId + "&EmbTypeId=" + EmbTypeId);

    setWorkOrder(response?.data);

    if (response?.data?.length === 1) {

      masterForm.setValue("WorkOrderId", response?.data[0]?.ID)

      setMasterData(prev => ({
        ...prev,
        WorkOrderId: response?.data?.[0]?.ID,
        WorkOrder: response?.data?.[0]?.WORK_ORDER_NO
      }));

      GetColor(response?.data[0]?.ID, poId);
    }
  }

  const getProductionInfo = async (buyerId: number, styleId: number, poId: number) => {
    try {
      const response = await axios.get(
        `${api.ProductionUrl}/production/PrintEmbProduction?woId=0&buyerId=${buyerId}&styleId=${styleId}&poId=${poId}`
      );

      const data = response?.data;

      if (Array.isArray(data) && data.length > 0) {
        const distinctData = data.filter(
          (obj, index, self) =>
            index ===
            self.findIndex(
              (t) =>
                t.WORKSTATION_ID === obj.WORKSTATION_ID &&
                t.FLOOR_ID === obj.FLOOR_ID
            )
        );

        const formattedData = distinctData.map((item) => ({
          WorkStationId: item.WORKSTATION_ID,
          WorkStation: item.WORKSTATION,
          FloorId: item.FLOOR_ID,
          Floor: item.FLOOR,
        }));

        const floorList: IFloor[] = distinctData
          .filter(
            (obj, index, self) =>
              index === self.findIndex((t) => t.FLOOR_ID === obj.FLOOR_ID)
          )
          .map((item) => ({
            Id: item.FLOOR_ID,
            Unitname: item.FLOOR,
          }));

        const workstationList: IWorkstation[] = distinctData
          .filter(
            (obj, index, self) =>
              index === self.findIndex((t) => t.WORKSTATION_ID === obj.WORKSTATION_ID)
          )
          .map((item) => ({
            ID: item.WORKSTATION_ID,
            NAME: item.WORKSTATION,
          }));

        setFloor(floorList);
        setWorkstation(workstationList);

        if (formattedData.length === 1) {
          const workOrder = formattedData[0];

          setMasterData((prev) => ({
            ...prev,
            WorkStationId: workOrder.WorkStationId,
            WorkStation: workOrder.WorkStation,
            FloorId: workOrder.FloorId,
            Floor: workOrder.Floor
          }));

          masterForm.setValue("WorkStationId", workOrder.WorkStationId);
          masterForm.setValue("WorkStation", workOrder.WorkStation);
          masterForm.setValue("FloorId", workOrder.FloorId);
          masterForm.setValue("Floor", workOrder.Floor);
        }

        return formattedData;
      }

      return [];
    } catch (error) {
      console.error("Error fetching production info:", error);
      return [];
    }
  };


  useEffect(() => {
    getProductionType();
    getDefectData();
    getSupplier();
    getBuyerData(0);

    if (pageAction === PageAction.add) {

      const partyId = 12;
      masterForm.setValue("PartyId", partyId);
      masterForm.setValue("Party", "Dummy");
      setMasterData(prev => ({
        ...prev,
        PartyId: partyId,
        Party: "Dummy"
      }));

    }

    if (data?.EmbTypeId) {
      getFloor(data?.EmbTypeId);
      getWorkStation(data?.EmbTypeId);
      getWorkOrder(0, 0, 0, data?.EmbTypeId);
      getBuyerData(data?.WorkOrderId || 0);
    }

  }, []);


  const masterForm = useForm<z.infer<typeof masterFormSchema>>({
    resolver: zodResolver(masterFormSchema),
    defaultValues: {
      EntryDate: data?.EntryDate
        ? new Date(data.EntryDate).toISOString().split("T")[0]
        : (() => {
          const d = new Date();
          d.setDate(d.getDate() - 1);
          return d.toLocaleDateString("en-CA");
        })(),
      PartyId: data?.PartyId || 0,
      Party: data?.Party || "",
      EmbTypeId: data?.EmbTypeId || 0,
      EmbType: data?.EmbType || "",
      FloorId: data?.FloorId || 0,
      Floor: data?.Floor || "",
      WorkStationId: data?.WorkStationId || 0,
      WorkStation: data?.WorkStation || "",
      WorkOrderId: data?.WorkOrderId || 0,
      WorkOrder: data?.WorkOrder || "",
      Remarks: data?.Remarks || "",
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

    data.Details = (detailsData || []).map(d => ({
      Id: d?.Id ?? 0,
      MasterId: d?.MasterId ?? 0,
      BuyerId: d?.BuyerId ?? 0,
      Buyer: d?.Buyer ?? "",
      OsBuyerId: d?.OsBuyerId ?? 0,
      OsBuyer: d?.OsBuyer ?? "",
      StyleId: d?.StyleId ?? 0,
      Style: d?.Style ?? "",
      OsStyleId: d?.OsStyleId ?? 0,
      OsStyle: d?.OsStyle ?? "",
      PoId: d?.PoId ?? 0,
      Po: d?.Po ?? "",
      OsPoId: d?.OsPoId ?? 0,
      OsPo: d?.OsPo ?? "",
      ColorId: d?.ColorId ?? 0,
      Color: d?.Color ?? "",
      Parts: d?.Parts ?? "",
      OrderQty: d?.OrderQty ?? 0,
      CheckQty: d?.CheckQty ?? 0,
      QcPassedQty: d?.QcPassedQty ?? 0,
      RectifyQty: d?.RectifyQty ?? 0,
      RejectQty: d?.RejectQty ?? 0,
      DefectQty: d?.DefectQty ?? 0,

      Defects: (d?.Defects || []).map(def => ({
        Id: def?.Id ?? 0,
        DetailId: def?.DetailId ?? 0,
        DefectId: def?.DefectId ?? 0,
        DefectName: def?.DefectName ?? "",
        Qty: def?.Qty ?? 0
      }))
    }));



    if ((data?.Details?.length || 0) <= 0) {
      return;
    }


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
    PrintEmbQualityDetail[] | undefined
  >(data?.Details);


  const [printEmbProductionDetailserror, _] = useState({
    WORK_ORDER_NO: "",
    BUYER: "",
    STYLE: "",
    PO_NO: "",
    COLOR: "",
    SIZE: ""
  });

  const handleAdd = async () => {

    const response = await axios.get(api.ProductionUrl + `/production/PrintEmbQuality/EmbWorkOrderRcvInfo?woId=${masterData.WorkOrderId}&BuyerId=${printEmbQualityDetails.BuyerId}&StyleId=${printEmbQualityDetails.StyleId}&poId=${printEmbQualityDetails.PoId}&colorId=${printEmbQualityDetails.ColorId}`);



    setdetailsData((prev) => [
      ...(prev || []),
      ...((response?.data || []).map((item: PrintEmbQualityDetail) => ({
        ...item,
        QcPassedQty: printEmbQualityDetails.QcPassedQty,
        CheckQty: printEmbQualityDetails.CheckQty,
        RectifyQty: printEmbQualityDetails.RectifyQty,
        RejectQty: printEmbQualityDetails.RejectQty,
        DefectQty: printEmbQualityDetails.DefectQty,
        Defects: defect.map((d) => ({
          Id: 0,
          DetailId: 0,
          DefectId: d.Id,
          DefectName: d.Name,
          Qty: 0,
        })),
      }))),
    ]);
  };

  const handleRemove = (index: number) => {
    const items = detailsData?.filter((_d, i) => i !== index);
    setdetailsData([...(items || [])]);
  };

  const [masterData, setMasterData] = useState<PrintEmbQualityMaster>({
    Id: data ? data.Id : 0,
    EntryDate: data?.EntryDate
      ? new Date(data.EntryDate).toLocaleDateString("en-CA")
      : (() => {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return d.toLocaleDateString("en-CA");
      })(),
    PartyId: data ? data.PartyId : 0,
    Party: data ? data.Party : "",
    EmbTypeId: data ? data.EmbTypeId : 0,
    EmbType: data ? data.EmbType : "",
    FloorId: data ? data.FloorId : 0,
    Floor: data ? data.Floor : "",
    WorkStationId: data ? data.WorkStationId : 0,
    WorkStation: data ? data.WorkStation : "",
    WorkOrderId: data ? data.WorkOrderId : 0,
    WorkOrder: data ? data.WorkOrder : "",
    Remarks: data ? data.Remarks || "" : "",
    Details: data ? data.Details : []
  });


  const [printEmbQualityDetails, setPrintEmbQualityDetails] = useState<PrintEmbQualityDetail>({
    Id: 0,
    MasterId: 0,
    BuyerId: 0,
    Buyer: "",
    OsBuyerId: 0,
    OsBuyer: "",
    StyleId: 0,
    Style: "",
    OsStyleId: 0,
    OsStyle: "",
    PoId: 0,
    Po: "",
    OsPoId: 0,
    OsPo: "",
    ColorId: 0,
    Color: "",
    Parts: "",
    OrderQty: 0,
    CheckQty: 0,
    QcPassedQty: 0,
    RectifyQty: 0,
    RejectQty: 0,
    DefectQty: 0,
    Defects: []
  });


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

    setPrintEmbQualityDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Id: 0,
      MasterId: 0,
      BuyerId: 0,
      Buyer: "",
      OsBuyerId: 0,
      OsBuyer: "",
      StyleId: 0,
      Style: "",
      OsStyleId: 0,
      OsStyle: "",
      PoId: 0,
      Po: "",
      OsPoId: 0,
      OsPo: "",
      ColorId: 0,
      Color: "",
      Parts: "",
      OrderQty: 0,
      CheckQty: 0,
      QcPassedQty: 0,
      RectifyQty: 0,
      RejectQty: 0,
      DefectQty: 0,
    },
  });


  const defectForm = useForm<z.infer<typeof defectFormSchema>>({
    resolver: zodResolver(defectFormSchema),
    defaultValues: {
      Id: 0,
      DetailId: 0,
      DefectId: 0,
      DefectName: "",
      Qty: 0
    },
  });



  if (!defectForm?.control) {
    console.error("orderForm control is not available.");

  }
  const [openBuyer, setOpenBuyer] = useState(false);
  const [openStyle, setOpenStyle] = useState(false);
  const [openPO, setOpenPO] = useState(false);
  const [openColor, setOpenColor] = useState(false);

  const [openProductionType, setOpenProductionType] = useState(false);
  const [openFloor, setOpenFloor] = useState(false);
  // const [openParts, setOpenParts] = useState(false);
  const [openWorkstaion, setOpenWorkstation] = useState(false);
  const [openWorkOrder, setOpenWorkOrder] = useState(false);

  const [openReasonDetailsModal, setOpenDefectDetailsModal] = useState(false);
  const [defectModalData, setDefectModalData] = useState<PrintEmbQualityDefectDetail[]>([]);
  const [selectedDetailsIndex, setSelectedDetailsIndex] = useState<number>(-1);

  const [openSupplier, setOpenSupplier] = useState(false);

  const handleDefectDetailsChange = () => {

    if (selectedDetailsIndex === -1) return;

    const updatedDetails = [...(detailsData || [])];
    updatedDetails[selectedDetailsIndex].Defects = defectModalData;
    updatedDetails[selectedDetailsIndex].DefectQty = defectModalData.reduce((sum, d) => sum + (d.Qty || 0), 0);
    setdetailsData(updatedDetails);
    setOpenDefectDetailsModal(false);
    setDefectModalData([]);
    setSelectedDetailsIndex(-1);

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
                  name="EntryDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-bold">Date</FormLabel>
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
                              EntryDate: new Date(e.target.value).toLocaleDateString("en-CA"),
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
                                : "Select a customer type"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search supplier..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No supplier found.</CommandEmpty>
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
                  name="EmbTypeId"
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
                                        EmbTypeId: Number(typeData.ID),
                                        EmbType: typeData.NAME,
                                      }));

                                      // getFloor(typeData.ID);
                                      // getWorkStation(typeData.ID);

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


                <FormField
                  control={masterForm.control}
                  name="FloorId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel className="font-bold">Floor</FormLabel>
                      <Popover open={openFloor} onOpenChange={setOpenFloor}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openFloor}
                              className={cn(
                                "w-full justify-between bg-emerald-100",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? Floor?.find(
                                  (floorData) =>
                                    Number(floorData.Id) === Number(field.value)
                                )?.Unitname
                                : "Select a Floor"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search Floor..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No floor found.</CommandEmpty>
                              <CommandGroup>
                                {Floor?.map((floorData) => (
                                  <CommandItem
                                    value={floorData.Unitname}
                                    key={floorData.Id}
                                    onSelect={() => {
                                      field.onChange(Number(floorData.Id));
                                      setMasterData((prev) => ({
                                        ...prev,
                                        FloorId: Number(floorData.Id),
                                        Floor: floorData.Unitname,
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
                    name="WorkStationId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel className="font-bold">Machine NO</FormLabel>
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
                                          WorkStationId: Number(workstationData.ID),
                                          WorkStation: workstationData.NAME,
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
                </div>


                <div>
                  <div className="flex justify-between items-end">
                    <FormField
                      control={masterForm.control}
                      name="WorkOrderId"
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
                                    ? WorkOrder?.find(
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
                                    {WorkOrder?.map((workOrderData) => (
                                      <CommandItem
                                        value={workOrderData.WORK_ORDER_NO}
                                        key={workOrderData.ID}
                                        onSelect={() => {
                                          field.onChange(Number(workOrderData.ID));
                                          setMasterData((prev) => ({
                                            ...prev,
                                            WorkOrderId: Number(workOrderData.ID),
                                            WorkOrder: workOrderData.WORK_ORDER_NO,
                                          }));
                                          getBuyerData(workOrderData.ID)
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
                  <div className="h-4">
                    {printEmbProductionDetailserror.WORK_ORDER_NO && (
                      <p className="text-sm">{printEmbProductionDetailserror.WORK_ORDER_NO}</p>
                    )}
                  </div>
                </div>
                <div>
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

                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {/* Buyer */}
                  <FormField
                    control={form.control}
                    name="BuyerId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full">
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
                                  ? buyerData?.find((b) => Number(b.Id) === field.value)?.NAME
                                  : "Select a Buyer"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search buyer..." className="h-9" />
                              <CommandList>
                                <CommandEmpty>No Buyer found.</CommandEmpty>
                                <CommandGroup>
                                  {buyerData?.map((b) => (
                                    <CommandItem
                                      key={b.Id}
                                      value={b.NAME}
                                      onSelect={() => {
                                        field.onChange(Number(b.Id));
                                        setPrintEmbQualityDetails((prev) => ({
                                          ...prev,
                                          BuyerId: Number(b.Id),
                                          Buyer: b.NAME,
                                        }));
                                        getStyleByBuyer(masterData.WorkOrderId, Number(b.Id));
                                        setOpenBuyer(false);
                                      }}
                                    >
                                      {b.NAME}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          Number(b.Id) === field.value ? "opacity-100" : "opacity-0"
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

                  {/* Style */}
                  <FormField
                    control={form.control}
                    name="StyleId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full">
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
                                  ? style?.find((s) => Number(s.Id) === field.value)?.Styleno
                                  : "Select a Style"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search style..." className="h-9" />
                              <CommandList>
                                <CommandEmpty>No Style found.</CommandEmpty>
                                <CommandGroup>
                                  {style?.map((s) => (
                                    <CommandItem
                                      key={s.Id}
                                      value={s.Styleno}
                                      onSelect={() => {
                                        field.onChange(Number(s.Id));
                                        setPrintEmbQualityDetails((prev) => ({
                                          ...prev,
                                          StyleId: Number(s.Id),
                                          Style: s.Styleno,
                                        }));
                                        setOpenStyle(false);
                                        getPOByStyle(masterData.WorkOrderId, Number(s.Id));
                                      }}
                                    >
                                      {s.Styleno}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          Number(s.Id) === field.value ? "opacity-100" : "opacity-0"
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

                  {/* PO */}
                  <FormField
                    control={form.control}
                    name="PoId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full">
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
                                  ? PO?.find((p) => Number(p.Id) === field.value)?.Pono
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
                                  {PO?.map((p) => (
                                    <CommandItem
                                      key={p.Id}
                                      value={p.Pono}
                                      onSelect={() => {
                                        field.onChange(Number(p.Id));
                                        setPrintEmbQualityDetails((prev) => ({
                                          ...prev,
                                          PoId: Number(p.Id),
                                          PO_NO: p.Pono,
                                        }));
                                        GetColor(masterData.WorkOrderId, Number(p.Id));
                                        getWorkOrder(
                                          printEmbQualityDetails.BuyerId || 0,
                                          printEmbQualityDetails.StyleId || 0,
                                          Number(p.Id), 0
                                        );

                                        getProductionInfo(
                                          printEmbQualityDetails.BuyerId || 0,
                                          printEmbQualityDetails.StyleId || 0,
                                          Number(p.Id),
                                        );

                                        setOpenPO(false);
                                      }}
                                    >
                                      {p.Pono}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          Number(p.Id) === field.value ? "opacity-100" : "opacity-0"
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

                  {/* Color */}
                  <FormField
                    control={form.control}
                    name="ColorId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full">
                        <FormLabel className="font-bold ">Color</FormLabel>
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
                                  ? color?.find((c) => Number(c.ID) === field.value)?.COLORNAME
                                  : "Select a Color"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search Color..." className="h-9" />
                              <CommandList>
                                <CommandEmpty>No Color found.</CommandEmpty>
                                <CommandGroup>
                                  {color?.map((c) => (
                                    <CommandItem
                                      key={c.ID}
                                      value={c.COLORNAME}
                                      onSelect={() => {
                                        field.onChange(Number(c.ID));
                                        setPrintEmbQualityDetails((prev) => ({
                                          ...prev,
                                          ColorId: Number(c.ID),
                                          COLOR: c.COLORNAME,
                                        }));
                                        setOpenColor(false);
                                      }}
                                    >
                                      {c.COLORNAME}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          Number(c.ID) === field.value ? "opacity-100" : "opacity-0"
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

                  {/* Order Qty, Parts, Check Qty, Rectify Qty, Reject Qty */}
                  {/* ["OrderQty", "Parts",] */}
                  {["QcPassedQty", "CheckQty", "RectifyQty", "RejectQty"].map((name) => (
                    <div>
                      <FormField
                        key={name}
                        control={form.control}
                        name={name as any}
                        render={({ field }) => (
                          <FormItem className="flex flex-col w-full">
                            <FormLabel className="font-bold mb-0">{name}</FormLabel>
                            <FormControl className="m-0" onChange={handleDetailsInputChange}>
                              <Input
                                style={{ marginTop: "7px" }}
                                placeholder=""
                                {...field}
                                className="form-control w-full h-9"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>



                <Button
                  type="button"
                  onClick={() => handleAdd()}
                  className="mt-2 mb-2"
                >
                  Add
                </Button>
                <div>
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
                            Order Qty
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Position
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Check Qty
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            QC Passed Qty
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Defect Qty
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Rectify Qty
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Reject Qty
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {detailsData?.map((item, index) => (
                          <TableRow key={index} className={`odd:bg-white even:bg-gray-50'
                            }`}>
                            <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                              {index + 1}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                              {masterData.WorkOrder}
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
                              {item.OrderQty}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.Parts}
                            </TableCell>

                            <TableCell className="border border-gray-300 px-4 text-center w-[60px]">
                              <input
                                type="number"
                                className="w-full text-center text-sm border border-gray-300 rounded p-1"
                                value={item.CheckQty}
                                onChange={(e) => {
                                  const updatedData = [...detailsData];
                                  updatedData[index] = {
                                    ...updatedData[index],
                                    CheckQty: Number(e.target.value),
                                  };
                                  setdetailsData(updatedData);
                                }}
                              />
                            </TableCell>

                            <TableCell className="border border-gray-300 px-4 text-center w-[60px]">
                              <input
                                type="number"
                                className="w-full text-center text-sm border border-gray-300 rounded p-1"
                                value={item.QcPassedQty}
                                onChange={(e) => {
                                  const updatedData = [...detailsData];
                                  updatedData[index] = {
                                    ...updatedData[index],
                                    QcPassedQty: Number(e.target.value),
                                  };
                                  setdetailsData(updatedData);
                                }}
                              />
                            </TableCell>



                            <TableCell className="border border-gray-300 px-4 text-center ">

                              <div className="flex align-middle justify-center gap-1 p-1">
                                <span>
                                  {item?.Defects?.reduce(
                                    (acc, item) => acc + Number(item.Qty),
                                    0
                                  )}
                                </span>
                                <Button
                                  type="button"
                                  onClick={() => {
                                    setDefectModalData(item?.Defects);
                                    setOpenDefectDetailsModal(true)
                                    setSelectedDetailsIndex(index);
                                  }}
                                  variant="outline"
                                  className="h-5 w-5 flex border-0 items-center justify-center mt-auto shadow-none"
                                >
                                  <SquarePlus className="w-5 h-5" />
                                </Button>
                              </div>

                            </TableCell>


                            <TableCell className="border border-gray-300 px-4 text-center w-[60px]">
                              <input
                                type="number"
                                className="w-full text-center text-sm border border-gray-300 rounded p-1"
                                value={item.RectifyQty}
                                onChange={(e) => {
                                  const updatedData = [...detailsData];
                                  updatedData[index] = {
                                    ...updatedData[index],
                                    RectifyQty: Number(e.target.value),
                                  };
                                  setdetailsData(updatedData);
                                }}
                              />
                            </TableCell>

                            <TableCell className="border border-gray-300 px-4 text-center w-[60px]">
                              <input
                                type="number"
                                className="w-full text-center text-sm border border-gray-300 rounded p-1"
                                value={item.RejectQty}
                                onChange={(e) => {
                                  const updatedData = [...detailsData];
                                  updatedData[index] = {
                                    ...updatedData[index],
                                    RejectQty: Number(e.target.value),
                                  };
                                  setdetailsData(updatedData);
                                }}
                              />
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
                    <Button
                      type="reset"
                      disabled={mutation.isPending}
                      onClick={() => {
                        const params = new URLSearchParams(location.search);
                        const index = params.get("pageIndex");
                        location.pathname.includes("win/")
                          ? navigator("/win/printing-embroidery/print-emb-quality?pageIndex=" + index)
                          : navigator("/dashboard/printing-embroidery/print-emb-quality?pageIndex=" + index)
                      }}
                      variant={"outline"}
                      className={cn("w-24")}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
          <div>

            {/* Defect dialog */}
            <Dialog open={openReasonDetailsModal} onOpenChange={setOpenDefectDetailsModal}>
              <DialogTrigger asChild>

              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] bg-white">
                <DialogHeader>
                  <DialogTitle>Defect</DialogTitle>
                  <DialogDescription>

                    <div>
                      <Form {...defectForm} >
                        <form
                          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
                          className=""
                        >
                          <div className="grid grid-cols-2 gap-4">
                            {/* Reason Input Field */}
                            {/* <div className="flex flex-col">
                              <FormField
                                control={defectForm.control}
                                name="DefectId"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="font-bold mb-0">Reason</FormLabel>
                                    <FormControl className="m-0" onChange={handleDefectDetailsChange}>
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
                            </div> */}

                            {/* Quantity Input Field */}
                            {/* <div className="flex flex-col">
                              <FormField
                                control={defectForm.control}
                                name="Qty"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="font-bold mb-0">Qty</FormLabel>
                                    <FormControl className="m-0" onChange={handleDefectDetailsChange}>
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
                            </div> */}
                          </div>
                        </form>
                      </Form>
                    </div>

                    <div className="mt-1">
                      {/* <Button
                        onClick={() => {
                          const updatedReasonModalData = [...defectModalData, defectDetails];
                          setDefectModalData(updatedReasonModalData);

                          setDefectDetails({ Id: 0, DetailId: 0, DefectId: 0, DefectName: "", Qty: 0 });

                          if (selectedDetailsIndex !== null && detailsData) {
                            setdetailsData((prevData) => {
                              const newData = [...prevData || []];
                              const targetItem = { ...newData[selectedDetailsIndex] };

                              targetItem.Defects = updatedReasonModalData;
                              newData[selectedDetailsIndex] = targetItem;
                              return newData;
                            });
                          }
                          defectForm.reset();
                        }}
                      >
                        Add
                      </Button> */}
                    </div>

                    <div className="mt-3">
                      <Table className="min-w-full rounded-md">
                        <TableHeader className="bg-green-100 rounded-md">
                          <TableRow className=" rounded-md">
                            <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                              S/L
                            </TableHead>
                            <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                              Defect
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
                            defectModalData?.map((reason, index) => <TableRow className="odd:bg-white even:bg-gray-50">
                              <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                                {index + 1}
                              </TableCell>
                              <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                                {reason?.DefectName}
                              </TableCell>
                              <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                                <input
                                  type="number"
                                  className="w-full text-center text-sm border border-gray-300 rounded p-1"
                                  value={reason?.Qty}
                                  onChange={(e) => {
                                    const updatedData = [...defectModalData];
                                    updatedData[index] = {
                                      ...updatedData[index],
                                      Qty: Number(e.target.value),
                                    };
                                    setDefectModalData(updatedData);
                                  }}
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-0 m-0 hover:cursor-pointer">
                                <div className="w-full h-full p-0 m-0 flex justify-center">
                                  <Trash2Icon
                                    size={15}
                                    className=" hover:text-red-500"
                                    onClick={() => {
                                      const updated = defectModalData.filter((_, i) => i !== index);

                                      setDefectModalData(updated);
                                      if (selectedDetailsIndex !== null && detailsData) {
                                        setdetailsData((prevData) => {
                                          const newData = [...prevData || []];
                                          const targetItem = { ...newData[selectedDetailsIndex] };

                                          targetItem.Defects = updated;
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
                  <Button onClick={() => { handleDefectDetailsChange(), setDefectModalData([]), setOpenDefectDetailsModal(false) }} >Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div >
      </div >
    </AppPageContainer >
  );
}
