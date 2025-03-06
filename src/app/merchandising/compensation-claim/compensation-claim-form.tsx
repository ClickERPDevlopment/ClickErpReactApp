/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from "@/actions/Merchandising/compensation-claim-action";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { GetSupplier } from "@/actions/get-supplier";
import { CompensationClaimDetailsType, CompensationClaimMasterType, CompensationClaimOrderInfoType } from "@/actions/Merchandising/compensation-claim-action";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useApiUrl from "@/hooks/use-ApiUrl";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { MdOutlineClear } from "react-icons/md";

const formSchema = z.object({
  ID: z.number().default(0),
  MASTER_ID: z.number().default(0),
  MATERIAL_ID: z.number().default(0),
  MATERIAL_GROUP_ID: z.number().default(0),
  MATERIAL_SUB_GROUP_ID: z.number().default(0),
  MATERIAL_NAME: z.string().optional(),
  TYPE_ID: z.number().default(0),
  TYPE_NAME: z.string().optional(),
  QUANTITY_DAMAGED: z.number().min(0),
  UOM: z.string().optional(),
  DAMAGE_DETAILS: z.string().optional(),
  CLAIM_AMOUNT: z.number().min(0),
  ACTION_TAKEN: z.string().optional(),
});

const masterFormSchema = z.object({
  CLAIM_ID: z.string(),
  CLAIM_DATE: z.date(),
  COMPENSATION_TYPE: z.string(),
  RELATED_SUPPLIER_ID: z.number().default(0),
  RELATED_SUPPLIER_NAME: z.string(),
  REPORTED_BY: z.string(),
  ADDITIONAL_NOTES: z.string(),
});

const orderFormSchema = z.object({
  BUYER_ID: z.number().default(0),
  BUYER_NAME: z.string(),
  STYLE_ID: z.number().default(0),
  STYLE_NAME: z.string(),
  PO_ID: z.number().default(0),
  PO_NO: z.string(),
});

interface IMaterialGroup {
  ID: number;
  CODE: string;
  NAME: string;
};

interface IMaterialSubGroup {
  ID: number;
  CODE: string;
  MATERIALGROUPID: number;
  NAME: string;
};

interface IMaterial {
  ID: number;
  MATERIALGROUPID: number;
  MATERIALSUBGROUPID: number;
  CODE: string;
  NAME: string;
  UOM: string;
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

export default function CompensationClaimForm({
  data,
  pageAction,
  claimId,
}: {
  data: CompensationClaimMasterType | undefined | null;
  pageAction: string;
  claimId: string;
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
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKey.SwtPlanningBoard, data?.ID],
      });
      location.pathname.includes("win/")
        ? navigator("/win/merchandising/compensation-claim")
        : navigator("/dashboard/merchandising/compensation-claim");
    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
    },
  });

  const { data: supplierData } = GetSupplier();

  const api = useApiUrl();

  const [buyerData, setBuyerData] = useState<IBuyer[]>([]);
  const getBuyerData = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/buyer/GetAllBuyer");
    setBuyerData(response?.data);
  }

  const [style, setStyle] = useState<IStyle[]>([]);
  const getStyleByBuyer = async (id: number = 0) => {
    const response = await axios.get(api.ProductionUrl + "/production/Style/GetAllStyleByBuyer?buyerId=" + id);
    setStyle(response?.data);
  }

  const [PO, setPO] = useState<IPO[]>([]);
  const getPOByStyle = async (id: number = 0) => {
    const response = await axios.get(api.ProductionUrl + "/production/PurchaseOrder/GetAllPOByStyle?styleId=" + id);
    setPO(response?.data);
  }

  const [materialGroup, setMaterialGroup] = useState<IMaterialGroup[]>([]);
  const getMaterialGroup = async () => {
    const response = await axios.get(api.ProductionUrl + "/store/MaterialGroup");
    setMaterialGroup(response?.data);
  }

  const [materialSubGroup, setMaterialSubGroup] = useState<IMaterialSubGroup[]>([]);
  const getMaterialSubGroup = async () => {
    const response = await axios.get(api.ProductionUrl + "/store/MaterialSubGroup");
    setMaterialSubGroup(response?.data);
  }

  const getMaterialSubGroupByGroup = async (id: number = 0) => {
    const response = await axios.get(api.ProductionUrl + "/store/MaterialSubGroup/ByGroup/" + id);
    setMaterialSubGroup(response?.data);
  }

  const [material, setMaterial] = useState<IMaterial[]>([]);
  const getMaterial = async () => {
    const response = await axios.get(api.ProductionUrl + "/store/Material");
    setMaterial(response?.data);
  }

  const getMaterialByGroup = async (id: number = 0) => {
    const response = await axios.get(api.ProductionUrl + "/store/Material/GetAllMaterialByGroup/" + id);
    setMaterial(response?.data);
  }

  const getMaterialBySubGroup = async (id: number = 0) => {
    const response = await axios.get(api.ProductionUrl + "/store/Material/GetAllMaterialBySubGroup/" + id);
    setMaterial(response?.data);
  }

  useEffect(() => {
    getMaterialGroup();
    getMaterialSubGroup();
    getMaterial();
    getBuyerData();
  }, []);


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = masterData;
    data.ClaimDetails = detailsData || [];
    data.RelatedOrders = orderInfo || [];

    console.log(data)

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
    CompensationClaimDetailsType[] | null | undefined
  >(data?.ClaimDetails);

  const [orderInfo, setOrderInfo] = useState<
    CompensationClaimOrderInfoType[] | null | undefined
  >(data?.RelatedOrders);

  const handleAdd = () => {
    setdetailsData((prev) => {
      return [...(prev || []), claimDetails];
    });

    setClaimDetails({
      ID: 0,
      MASTER_ID: 0,
      MATERIAL_ID: 0,
      MATERIAL_GROUP_ID: 0,
      MATERIAL_GROUP_NAME: "",
      MATERIAL_SUB_GROUP_ID: 0,
      MATERIAL_SUB_GROUP_NAME: "",
      MATERIAL_NAME: "",
      TYPE_ID: 0,
      TYPE_NAME: "",
      QUANTITY_DAMAGED: 0,
      UOM: "",
      DAMAGE_DETAILS: "",
      CLAIM_AMOUNT: 0,
      ACTION_TAKEN: ""
    });
    form.reset();
  };

  const handleAddOrder = () => {
    setOrderInfo((prev) => {
      return [...(prev || []), orderDetails];
    });

    setOrderDetails({
      ID: 0,
      MASTER_ID: 0,
      BUYER_ID: 0,
      BUYER_NAME: "",
      STYLE_ID: 0,
      STYLE_NAME: "",
      PO_ID: 0,
      PO_NO: ""
    });

    orderForm.reset();
  };

  const handleRemove = (index: number) => {
    const items = detailsData?.filter((_d, i) => i !== index);
    setdetailsData([...(items || [])]);
  };

  const handleRemoveOrder = (index: number) => {
    const items = orderInfo?.filter((_d, i) => i !== index);
    setOrderInfo([...(items || [])]);
  };

  const [masterData, setMasterData] = useState<CompensationClaimMasterType>({
    ID: data ? data.ID : 0,
    CLAIM_ID: data ? data.CLAIM_ID : claimId,
    CLAIM_DATE: data?.CLAIM_DATE ? new Date(data.CLAIM_DATE) : new Date(),
    COMPENSATION_TYPE: data ? data.COMPENSATION_TYPE : "",
    RELATED_SUPPLIER_ID: data ? data.RELATED_SUPPLIER_ID : 0,
    RELATED_SUPPLIER_NAME: data ? data.RELATED_SUPPLIER_NAME : "",
    REPORTED_BY: data ? data.REPORTED_BY : "",
    ADDITIONAL_NOTES: data ? data.ADDITIONAL_NOTES : "",
    CREATED_BY: data ? data.CREATED_BY : "",
    CREATED_DATE: data?.CREATED_DATE ? new Date(data.CREATED_DATE) : new Date(),
    UPDATED_BY: data ? data.UPDATED_BY : "",
    UPDATED_DATE: data?.UPDATED_DATE ? new Date(data.UPDATED_DATE) : new Date(),
    ClaimDetails: data ? data.ClaimDetails : [],
    RelatedOrders: data ? data.RelatedOrders : [],
  });

  const [claimDetails, setClaimDetails] = useState<CompensationClaimDetailsType>({
    ID: 0,
    MASTER_ID: 0,
    MATERIAL_ID: 0,
    MATERIAL_GROUP_ID: 0,
    MATERIAL_GROUP_NAME: "",
    MATERIAL_SUB_GROUP_ID: 0,
    MATERIAL_SUB_GROUP_NAME: "",
    MATERIAL_NAME: "",
    TYPE_ID: 0,
    TYPE_NAME: "",
    QUANTITY_DAMAGED: 0,
    UOM: "",
    DAMAGE_DETAILS: "",
    CLAIM_AMOUNT: 0,
    ACTION_TAKEN: "",
  });

  const [orderDetails, setOrderDetails] = useState<CompensationClaimOrderInfoType>(
    {
      ID: 0,
      MASTER_ID: 0,
      BUYER_ID: 0,
      BUYER_NAME: "",
      STYLE_ID: 0,
      STYLE_NAME: "",
      PO_ID: 0,
      PO_NO: ""
    }
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setClaimDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMasterInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setMasterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ID: 0,
      MASTER_ID: 0,
      MATERIAL_ID: 0,
      MATERIAL_GROUP_ID: 0,
      MATERIAL_SUB_GROUP_ID: 0,
      MATERIAL_NAME: "",
      TYPE_ID: 0,
      TYPE_NAME: "",
      QUANTITY_DAMAGED: 0,
      UOM: "",
      DAMAGE_DETAILS: "",
      CLAIM_AMOUNT: 0,
      ACTION_TAKEN: "",
    },
  });

  const orderForm = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      BUYER_ID: 0,
      BUYER_NAME: "",
      STYLE_ID: 0,
      STYLE_NAME: "",
      PO_ID: 0,
      PO_NO: "",
    },
  });

  if (!orderForm?.control) {
    console.error("orderForm control is not available.");

  }


  const masterForm = useForm<z.infer<typeof masterFormSchema>>({
    resolver: zodResolver(masterFormSchema),
    defaultValues: {
      CLAIM_ID: data?.CLAIM_ID || claimId,
      CLAIM_DATE: data?.CLAIM_DATE ? new Date(data.CLAIM_DATE) : new Date(),
      COMPENSATION_TYPE: data?.COMPENSATION_TYPE || "",
      RELATED_SUPPLIER_ID: data?.RELATED_SUPPLIER_ID || 0,
      RELATED_SUPPLIER_NAME: data?.RELATED_SUPPLIER_NAME || "",
      REPORTED_BY: data?.REPORTED_BY || "",
      ADDITIONAL_NOTES: data?.ADDITIONAL_NOTES || "",
    },
  });

  const [isOpenDamageDtls, setIsOpenDamageDtls] = useState(false);
  const [isOpenActionTaken, setIsOpenActionTaken] = useState(false);
  const [isOpenMaterial, setIsOpenMaterial] = useState(false);

  const [openSupplier, setOpenSupplier] = useState(false);
  const [openMaterialGroup, setOpenMaterialGroup] = useState(false);
  const [openMaterialSubGroup, setOpenMaterialSubGroup] = useState(false);
  const [openMaterial, setOpenMaterial] = useState(false);
  const [openBuyer, setOpenBuyer] = useState(false);
  const [openStyle, setOpenStyle] = useState(false);
  const [openPO, setOpenPO] = useState(false);


  console.log(masterData);

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
          <Form {...masterForm}>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
              className=""
            >
              <div className="flex flex-wrap gap-2">
                <FormField
                  control={masterForm.control}
                  name="CLAIM_ID"
                  render={({ field }) => (
                    <FormItem className="w-52" style={{ minWidth: "200px" }}>
                      <FormLabel className="font-bold">Claim Id</FormLabel>
                      <FormControl onChange={handleMasterInputChange}>
                        <Input
                          placeholder=""
                          {...field}
                          className="form-control"
                          disabled={true}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={masterForm.control}
                  name="CLAIM_DATE"
                  render={({ field }) => (
                    <FormItem className="w-52" style={{ minWidth: "200px" }}>
                      <FormLabel className="font-bold">Claim Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          type="date"
                          value={field.value ? field.value.toISOString().slice(0, 10) : ''}
                          onChange={(e) => {
                            const newDate = e.target.value ? new Date(e.target.value) : null;
                            field.onChange(newDate);
                            setMasterData((prev) => ({
                              ...prev,
                              CLAIM_DATE: new Date(e.target.value),
                            }));
                          }}
                          className="form-control"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={masterForm.control}
                  name="COMPENSATION_TYPE"
                  render={() => (
                    <FormItem className="min-w-52">
                      <FormLabel className="font-bold"> Compensation Type</FormLabel>
                      <Select
                        value={masterData?.COMPENSATION_TYPE?.toString()}
                        onValueChange={(value) => {
                          setMasterData((prev) => ({
                            ...prev,
                            COMPENSATION_TYPE: value,
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key="Type1" value="Type1">
                            Type1
                          </SelectItem>
                          <SelectItem key="Type2" value="Type2">
                            Type2
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                {/* ==================================Supplier======================================= */}
                <div className="flex justify-between items-end">
                  <FormField
                    control={masterForm.control}
                    name="RELATED_SUPPLIER_ID"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel className="font-bold">Related Supplier</FormLabel>
                        <Popover open={openSupplier} onOpenChange={setOpenSupplier}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openSupplier}
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? supplierData?.find(
                                    (supplier) =>
                                      Number(supplier.ID) === field.value
                                  )?.NAME
                                  : "Select a supplier"}
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
                                  {supplierData?.map((supplier) => (
                                    <CommandItem
                                      value={supplier.NAME}
                                      key={supplier.ID}
                                      onSelect={() => {
                                        field.onChange(Number(supplier.ID));
                                        setMasterData((prev) => ({
                                          ...prev,
                                          RELATED_SUPPLIER_ID: Number(supplier.ID),
                                          RELATED_SUPPLIER_NAME: supplier.NAME,
                                        }));
                                        setOpenSupplier(false);
                                      }}
                                    >
                                      {supplier.NAME}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          Number(supplier.ID) === field.value
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
                    onClick={() => masterForm.resetField("RELATED_SUPPLIER_ID")}
                    variant={"outline"}
                    type="button"
                    className="m-0 ml-1 px-[12px]"
                  >
                    <MdOutlineClear className="rounded text-slate-600 m-0" />
                  </Button>
                </div>
                <FormField
                  control={masterForm.control}
                  name="REPORTED_BY"
                  render={({ field }) => (
                    <FormItem className="w-52" style={{ minWidth: "200px" }}>
                      <FormLabel className="font-bold">Reported By</FormLabel>
                      <FormControl onChange={handleMasterInputChange}>
                        <Input
                          placeholder=""
                          {...field}
                          className="form-control"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
            </form>
          </Form>
        </div>
        <div className="mt-4"></div>

        <div className="flex gap-2">

          {/* ===================================Details data===================================== */}
          <div className="w-2/3 border p-1">
            <Form {...form} >
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
                className=""
              >
                <div className="flex flex-wrap gap-2">


                  <FormField
                    control={form.control}
                    name="QUANTITY_DAMAGED"
                    render={({ field }) => (
                      <FormItem className="w-52" style={{ minWidth: "200px" }}>
                        <FormLabel className="font-bold">Quantity Damaged</FormLabel>
                        <FormControl onChange={handleInputChange}>
                          <Input
                            placeholder=""
                            {...field}
                            className="form-control"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* =================================Material======================================= */}
                  <div className="flex">
                    <div>
                      <FormField
                        control={form.control}
                        name="MATERIAL_NAME"
                        render={({ field }) => (
                          <FormItem className="w-52" style={{ minWidth: "200px" }}>
                            <FormLabel className="font-bold">Material</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={claimDetails.MATERIAL_NAME}
                                {...field}
                                className="form-control"
                                disabled={true}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Dialog open={isOpenMaterial} onOpenChange={setIsOpenMaterial}>
                      <DialogTrigger asChild>
                        <Button onClick={() => setIsOpenMaterial(true)} variant="outline" className="mt-auto mb-0.5">Add</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] bg-white">
                        <DialogHeader>
                          <DialogTitle>Add Material</DialogTitle>
                          <DialogDescription>
                            <div className="mt-1"></div>

                            {/* ===============================Material group================================ */}
                            <div className="flex justify-between items-end">
                              <FormField
                                control={form.control}
                                name="MATERIAL_GROUP_ID"
                                render={({ field }) => (
                                  <FormItem className="flex flex-col flex-1">
                                    <FormLabel className="font-bold">Material Group</FormLabel>
                                    <Popover open={openMaterialGroup} onOpenChange={setOpenMaterialGroup}>
                                      <PopoverTrigger asChild>
                                        <FormControl>
                                          <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openMaterialGroup}
                                            className={cn(
                                              "w-full justify-between",
                                              !field.value && "text-muted-foreground"
                                            )}
                                          >
                                            {field.value
                                              ? materialGroup?.find(
                                                (group) =>
                                                  Number(group.ID) === field.value
                                              )?.NAME
                                              : "Select a material group"}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                          </Button>
                                        </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-full p-0">
                                        <Command>
                                          <CommandInput placeholder="Search material group..." className="h-9" />
                                          <CommandList>
                                            <CommandEmpty>No material group found.</CommandEmpty>
                                            <CommandGroup>
                                              {materialGroup?.map((group) => (
                                                <CommandItem
                                                  value={group.NAME}
                                                  key={group.ID}
                                                  onSelect={() => {
                                                    field.onChange(Number(group.ID));
                                                    setClaimDetails((prev) => ({
                                                      ...prev,
                                                      MATERIAL_GROUP_ID: Number(group.ID),
                                                      MATERIAL_GROUP_NAME: group.NAME,
                                                    }));
                                                    getMaterialByGroup(Number(group.ID));
                                                    getMaterialSubGroupByGroup(Number(group.ID));
                                                    setOpenMaterialGroup(false);
                                                  }}
                                                >
                                                  {group.NAME}
                                                  <CheckIcon
                                                    className={cn(
                                                      "ml-auto h-4 w-4",
                                                      Number(group.ID) === field.value
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
                                onClick={() => form.resetField("MATERIAL_GROUP_ID")}
                                variant={"outline"}
                                type="button"
                                className="m-0 ml-1 px-[12px]"
                              >
                                <MdOutlineClear className="rounded text-slate-600 m-0" />
                              </Button>
                            </div>
                            <div className="mt-1"></div>

                            {/* ===============================Material subgroup================================ */}
                            <div className="flex justify-between items-end">
                              <FormField
                                control={form.control}
                                name="MATERIAL_SUB_GROUP_ID"
                                render={({ field }) => (
                                  <FormItem className="flex flex-col flex-1">
                                    <FormLabel className="font-bold">Material Sub Group</FormLabel>
                                    <Popover open={openMaterialSubGroup} onOpenChange={setOpenMaterialSubGroup}>
                                      <PopoverTrigger asChild>
                                        <FormControl>
                                          <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openMaterialSubGroup}
                                            className={cn(
                                              "w-full justify-between",
                                              !field.value && "text-muted-foreground"
                                            )}
                                          >
                                            {claimDetails?.MATERIAL_SUB_GROUP_ID
                                              ? materialSubGroup?.find(
                                                (subGroup) => subGroup.ID === claimDetails.MATERIAL_SUB_GROUP_ID
                                              )?.NAME
                                              : "Select a material sub group"}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                          </Button>
                                        </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-full p-0">
                                        <Command>
                                          <CommandInput placeholder="Search material sub group..." className="h-9" />
                                          <CommandList>
                                            <CommandEmpty>No material sub group found.</CommandEmpty>
                                            <CommandGroup>
                                              {materialSubGroup?.map((subGroup) => (
                                                <CommandItem
                                                  value={subGroup.NAME}
                                                  key={subGroup.ID}
                                                  onSelect={() => {
                                                    const selectedMaterialSubGroup = materialSubGroup?.find(
                                                      (data) => data.ID === subGroup.ID
                                                    );
                                                    if (selectedMaterialSubGroup) {
                                                      setClaimDetails((prev) => ({
                                                        ...prev,
                                                        MATERIAL_SUB_GROUP_ID: Number(selectedMaterialSubGroup.ID),
                                                        MATERIAL_SUB_GROUP_NAME: selectedMaterialSubGroup.NAME,
                                                      }));
                                                    }
                                                    getMaterialBySubGroup(Number(subGroup.ID));
                                                    setOpenMaterialSubGroup(false);
                                                  }}
                                                >
                                                  {subGroup.NAME}
                                                  <CheckIcon
                                                    className={cn(
                                                      "ml-auto h-4 w-4",
                                                      Number(subGroup.ID) === claimDetails?.MATERIAL_SUB_GROUP_ID
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
                                onClick={() => form.resetField("MATERIAL_SUB_GROUP_ID")}
                                variant={"outline"}
                                type="button"
                                className="m-0 ml-1 px-[12px]"
                              >
                                <MdOutlineClear className="rounded text-slate-600 m-0" />
                              </Button>
                            </div>
                            <div className="mt-1"></div>

                            {/* ===============================Material================================ */}
                            <div className="flex justify-between items-end">
                              <FormField
                                control={form.control}
                                name="MATERIAL_ID"
                                render={({ field }) => (
                                  <FormItem className="flex flex-col flex-1">
                                    <FormLabel className="font-bold">Material</FormLabel>
                                    <Popover open={openMaterial} onOpenChange={setOpenMaterial}>
                                      <PopoverTrigger asChild>
                                        <FormControl>
                                          <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openMaterial}
                                            className={cn(
                                              "w-full justify-between",
                                              !field.value && "text-muted-foreground"
                                            )}
                                          >
                                            {claimDetails?.MATERIAL_ID
                                              ? material?.find(
                                                (material) => material.ID === claimDetails.MATERIAL_ID
                                              )?.NAME
                                              : "Select a group"}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                          </Button>
                                        </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-full p-0">
                                        <Command>
                                          <CommandInput placeholder="Search material sub group..." className="h-9" />
                                          <CommandList>
                                            <CommandEmpty>No material found.</CommandEmpty>
                                            <CommandGroup>
                                              {material?.map((item) => (
                                                <CommandItem
                                                  value={item.NAME}
                                                  key={item.ID}
                                                  onSelect={() => {
                                                    const selectedMaterial = material?.find(
                                                      (data) => data.ID === item.ID
                                                    );
                                                    if (selectedMaterial) {
                                                      setClaimDetails((prev) => ({
                                                        ...prev,
                                                        MATERIAL_ID: Number(selectedMaterial.ID),
                                                        MATERIAL_NAME: selectedMaterial.NAME,
                                                        UOM: selectedMaterial?.UOM?.toString(),
                                                      }));
                                                    }
                                                    setOpenMaterial(false);
                                                  }}
                                                >
                                                  {item.NAME}
                                                  <CheckIcon
                                                    className={cn(
                                                      "ml-auto h-4 w-4",
                                                      Number(item.ID) === claimDetails?.MATERIAL_ID
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
                                onClick={() => form.resetField("MATERIAL_ID")}
                                variant={"outline"}
                                type="button"
                                className="m-0 ml-1 px-[12px]"
                              >
                                <MdOutlineClear className="rounded text-slate-600 m-0" />
                              </Button>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        </div>
                        <DialogFooter>
                          <Button onClick={() => setIsOpenMaterial(false)} >Save changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <FormField
                    control={form.control}
                    name="UOM"
                    render={({ field }) => (
                      <FormItem className="w-52" style={{ minWidth: "200px" }}>
                        <FormLabel className="font-bold">Uom</FormLabel>
                        <FormControl onChange={handleInputChange}>
                          <Input
                            placeholder={claimDetails.UOM}
                            {...field}
                            className="form-control"
                            disabled={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex">
                    <div>
                      <FormField
                        control={form.control}
                        name="DAMAGE_DETAILS"
                        render={({ field }) => (
                          <FormItem className="w-52" style={{ minWidth: "200px" }}>
                            <FormLabel className="font-bold">Damage Details</FormLabel>
                            <FormControl onChange={handleInputChange}>
                              <Input
                                placeholder={claimDetails.DAMAGE_DETAILS}
                                {...field}
                                className="form-control"
                                disabled={true}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Dialog open={isOpenDamageDtls} onOpenChange={setIsOpenDamageDtls}>
                      <DialogTrigger asChild>
                        <Button onClick={() => setIsOpenDamageDtls(true)} variant="outline" className="mt-auto mb-0.5">Add</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] bg-white">
                        <DialogHeader>
                          <DialogTitle>Damage Details</DialogTitle>
                          <DialogDescription>

                            <FormField
                              control={form.control}
                              name="DAMAGE_DETAILS"
                              render={({ field }) => (
                                <FormItem className="w-full">
                                  <FormControl onChange={handleInputChange}>
                                    <Textarea
                                      placeholder="Enter damage details..."
                                      {...field}
                                      className="form-control w-full"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        </div>
                        <DialogFooter>
                          <Button onClick={() => setIsOpenDamageDtls(false)}>Save changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <FormField
                    control={form.control}
                    name="CLAIM_AMOUNT"
                    render={({ field }) => (
                      <FormItem className="w-52" style={{ minWidth: "200px" }}>
                        <FormLabel className="font-bold">Claim Amount</FormLabel>
                        <FormControl onChange={handleInputChange}>
                          <Input
                            placeholder=""
                            {...field}
                            className="form-control"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex">
                    <div>
                      <FormField
                        control={form.control}
                        name="ACTION_TAKEN"
                        render={({ field }) => (
                          <FormItem className="w-52" style={{ minWidth: "200px" }}>
                            <FormLabel className="font-bold">Action Taken</FormLabel>
                            <FormControl onChange={handleInputChange}>
                              <Input
                                placeholder={claimDetails.ACTION_TAKEN}
                                disabled={true}
                                {...field}
                                className="form-control"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Dialog open={isOpenActionTaken} onOpenChange={setIsOpenActionTaken}>
                      <DialogTrigger asChild>
                        <Button onClick={() => setIsOpenActionTaken(true)} variant="outline" className="mt-auto mb-0.5">Add</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] bg-white">
                        <DialogHeader>
                          <DialogTitle>Action Taken</DialogTitle>
                          <DialogDescription>

                            <FormField
                              control={form.control}
                              name="ACTION_TAKEN"
                              render={({ field }) => (
                                <FormItem className="w-full">
                                  <FormControl onChange={handleInputChange}>
                                    <Textarea
                                      placeholder="Enter damage details..."
                                      {...field}
                                      className="form-control w-full"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">

                        </div>
                        <DialogFooter>
                          <Button onClick={() => setIsOpenActionTaken(false)}>Save changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={() => handleAdd()}
                  className="mt-1 mb-1"
                >
                  Add
                </Button>
                <div className="mb-5 min-h-60 p-0.5 border rounded-md">
                  <Table className="min-w-full rounded-md">
                    <TableHeader className="bg-green-100 rounded-md">
                      <TableRow className=" rounded-md">
                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                          S/L
                        </TableHead>
                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                          Material Name
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Quantity Damaged
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Damage Details
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          UOM
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Claim Amount
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Action Taken
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {detailsData?.map((item, index) => (
                        <TableRow className="odd:bg-white even:bg-gray-50">
                          <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                            {item?.MATERIAL_NAME}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4  text-center">
                            {item.QUANTITY_DAMAGED}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {item.DAMAGE_DETAILS}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {item.UOM}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {item.CLAIM_AMOUNT}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {item.ACTION_TAKEN}
                          </TableCell>
                          <TableCell className="border border-gray-300 p-0 m-0 hover:cursor-pointer">
                            <div className="w-full h-full p-0 m-0 flex justify-center">
                              <Trash2Icon
                                size={15}
                                className=" hover:text-red-500"
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
                <div className={cn("flex justify-between")}>
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
                    <Button
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
                    </Button>
                  </div>
                  <Button
                    type="reset"
                    disabled={mutation.isPending}
                    onClick={() =>
                      location.pathname.includes("win/")
                        ? navigator("/win/merchandising/compensation-claim")
                        : navigator("/dashboard/merchandising/compensation-claim")
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

          {/* ===================================Order data===================================== */}
          <div className="w-1/3 border p-1">
            <Form {...orderForm} >
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
                className=""
              >
                <div className="flex flex-wrap gap-2">
                  <div className="flex justify-between items-end">
                    <FormField
                      control={orderForm.control}
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
                                    "w-full justify-between",
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
                                          setOrderDetails((prev) => ({
                                            ...prev,
                                            BUYER_ID: Number(buyer?.Id),
                                            BUYER_NAME: buyer?.NAME,
                                          }));
                                          getStyleByBuyer(Number(buyer?.Id));
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
                    <Button
                      onClick={() => orderForm.resetField("BUYER_ID")}
                      variant={"outline"}
                      type="button"
                      className="m-0 ml-1 px-[12px]"
                    >
                      <MdOutlineClear className="rounded text-slate-600 m-0" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-end">
                    <FormField
                      control={orderForm.control}
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
                                    "w-full justify-between",
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
                                          setOrderDetails((prev) => ({
                                            ...prev,
                                            STYLE_ID: Number(item.Id),
                                            STYLE_NAME: item.Styleno,
                                          }));
                                          setOpenStyle(false);
                                          getPOByStyle(Number(item.Id));
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
                    <Button
                      onClick={() => orderForm.resetField("STYLE_ID")}
                      variant={"outline"}
                      type="button"
                      className="m-0 ml-1 px-[12px]"
                    >
                      <MdOutlineClear className="rounded text-slate-600 m-0" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-end">
                    <FormField
                      control={orderForm.control}
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
                                  aria-expanded={openStyle}
                                  className={cn(
                                    "w-full justify-between",
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
                                          setOrderDetails((prev) => ({
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
                    <Button
                      onClick={() => orderForm.resetField("PO_ID")}
                      variant={"outline"}
                      type="button"
                      className="m-0 ml-1 px-[12px]"
                    >
                      <MdOutlineClear className="rounded text-slate-600 m-0" />
                    </Button>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => handleAddOrder()}
                  className="mt-1 mb-1"
                >
                  Add
                </Button>
                <div className="mb-5 min-h-60 p-0.5 border rounded-md">
                  <Table className="min-w-full rounded-md">
                    <TableHeader className="bg-green-100 rounded-md">
                      <TableRow className=" rounded-md">
                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                          S/L
                        </TableHead>
                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                          Buyer
                        </TableHead>
                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                          Style
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          PO
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderInfo?.map((item, index) => (
                        <TableRow className="odd:bg-white even:bg-gray-50">
                          <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                            {item?.BUYER_NAME}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                            {item?.STYLE_NAME}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4  text-center">
                            {item.PO_NO}
                          </TableCell>
                          <TableCell className="border border-gray-300 p-0 m-0 hover:cursor-pointer">
                            <div className="w-full h-full p-0 m-0 flex justify-center">
                              <Trash2Icon
                                size={15}
                                className=" hover:text-red-500"
                                onClick={() => handleRemoveOrder(index)}
                                style={{ color: "red" }}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </AppPageContainer>
  );
}
