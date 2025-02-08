/* eslint-disable @typescript-eslint/no-unused-expressions */
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CheckIcon } from "lucide-react";
import React from "react";

import { useForm } from "react-hook-form";
import { MdOutlineClear } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";
import { EmployeeType } from "@/actions/Configurations/employee-action";
import { FloorType } from "@/actions/Configurations/floor-action";
import { BrandType } from "@/actions/get-brand";
import { ItemType } from "@/actions/Merchandising/item-type-action";
import { SwtGaugeType } from "@/actions/Sweater/swt-gauge-action";
import {
  SwtMachineGroupType,
  Delete,
  Save,
  Update,
} from "@/actions/Sweater/swt-mc-group-action";
import MultipleSelector from "@/components/app-multi-select-combobox";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAxiosInstance from "@/lib/axios-instance";
import { cn } from "@/lib/utils";
import { PageAction } from "@/utility/page-actions";
import { ReactQueryKey } from "@/utility/react-query-key";
import { z } from "zod";
import AppPageContainer from "@/components/app-page-container";

const gaugeSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const formSchema = z.object({
  ID: z.number().default(0),
  GROUP_NAME: z.string(),
  CODE: z.string(),
  FLOOR_ID: z.number().default(0),
  SUPERVISOR_ID: z.number().default(0),
  BEST_FOR_ITEM_ID: z.number().default(0),
  MC_BRAND_ID: z.number().default(0),
  lstMC_GAUGE: z.array(gaugeSchema).min(1, "Gauge is required."),
  NUMBER_OF_MACHINE: z.coerce.number().gte(1, "Must be 1 and above"),
  IS_ACTIVE: z.boolean().default(true),
});

type NewType = {
  data: SwtMachineGroupType | undefined;
  pageAction: string;
  lstFloor: FloorType[] | undefined;
  lstSupervisor: EmployeeType[] | undefined;
  lstItemType: ItemType[] | undefined;
  lstBrand: BrandType[] | undefined;
  lstGauge: SwtGaugeType[] | undefined;
};

type comboBoxDataType = {
  label: string;
  value: string;
};

export default function McGroupForm({
  data,
  pageAction,
  lstFloor,
  lstSupervisor,
  lstItemType,
  lstBrand,
  lstGauge,
}: NewType) {
  //--
  const [floors, setFloors] = React.useState<comboBoxDataType[]>();
  const [openFloor, setOpenFloor] = React.useState(false);
  //--
  const [supervisors, setSupervisors] = React.useState<comboBoxDataType[]>();
  const [openSuperviosr, setOpenSupervisor] = React.useState(false);
  //--
  const [brands, setBrands] = React.useState<comboBoxDataType[]>();
  const [openBrand, setOpenBrand] = React.useState(false);
  //--

  const [itemTypes, setItemTypes] = React.useState<comboBoxDataType[]>();
  const [openItemType, setOpenItemType] = React.useState(false);
  //--

  const [gauges, setGauges] = React.useState<comboBoxDataType[]>();
  //--

  //--------------------------
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const axios = useAxiosInstance();
  //--------------------------

  React.useEffect(() => {
    //---
    let _: comboBoxDataType[] = [];
    lstFloor?.forEach((ele) => {
      _.push({ label: ele.Unitname, value: ele.Id.toString() });
    });

    setFloors([..._]);
    //---
    _ = [];
    lstSupervisor?.forEach((ele) => {
      _.push({ label: ele.NAME, value: ele.EMP_ID.toString() });
    });
    setSupervisors([..._]);
    //---
    _ = [];
    lstBrand?.forEach((ele) => {
      _.push({ label: ele.BRAND_NAME, value: ele.BRAND_ID.toString() });
    });
    setBrands([..._]);
    //---
    _ = [];
    lstItemType?.forEach((ele) => {
      _.push({ label: ele.Name, value: ele.Id.toString() });
    });
    setItemTypes([..._]);
    //---
    _ = [];
    lstGauge?.forEach((ele) => {
      _.push({ label: ele.GAUGE, value: ele.ID.toString() });
    });
    setGauges([..._]);
    //---
  }, [lstBrand, lstFloor, lstGauge, lstItemType, lstSupervisor]);

  const mutation = useMutation({
    mutationFn: (tag: SwtMachineGroupType) => {
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
        queryKey: [ReactQueryKey.SwtMachineGroup],
      });

      location.pathname.includes("win/")
        ? navigator("/win/sweater/mc-group")
        : navigator("/dashboard/sweater/mc-group");
    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ID: data?.ID ? data.ID : 0,
      GROUP_NAME: data?.GROUP_NAME ? data.GROUP_NAME : "",
      CODE: data?.CODE ? data.CODE : "",
      FLOOR_ID: data?.FLOOR_ID ? data.FLOOR_ID : 0,
      SUPERVISOR_ID: data?.SUPERVISOR_ID ? data.SUPERVISOR_ID : 0,
      BEST_FOR_ITEM_ID: data?.BEST_FOR_ITEM_ID ? data.BEST_FOR_ITEM_ID : 0,
      MC_BRAND_ID: data?.MC_BRAND_ID ? data.MC_BRAND_ID : 0,
      NUMBER_OF_MACHINE: data?.NUMBER_OF_MACHINE ? data.NUMBER_OF_MACHINE : 0,
      IS_ACTIVE: data?.IS_ACTIVE ? data.IS_ACTIVE : true,
      // MC_GAUGE_ID: data?.MC_GAUGE_ID ? data.MC_GAUGE_ID : 0,
      lstMC_GAUGE: data?.lstMC_GAUGE?.map((d) => {
        return { value: d.MC_GAUGE_ID.toString(), label: d.MC_GAUGE };
      }),
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("form-value", values);
    const data: SwtMachineGroupType = {
      ID: values.ID,
      GROUP_NAME: values.GROUP_NAME,
      CODE: values.CODE,
      FLOOR_ID: values.FLOOR_ID,
      FLOOR: undefined,
      SUPERVISOR_ID: values.SUPERVISOR_ID,
      SUPERVISOR: undefined,
      BEST_FOR_ITEM_ID: values.BEST_FOR_ITEM_ID,
      BEST_FOR_ITEM: undefined,
      MC_BRAND_ID: values.MC_BRAND_ID,
      MC_BRAND: undefined,
      NUMBER_OF_MACHINE: values.NUMBER_OF_MACHINE,
      IS_ACTIVE: values.IS_ACTIVE,
      MC_GAUGE: "",
      lstMC_GAUGE: values.lstMC_GAUGE.map((g) => {
        return {
          ID: 0,
          MASTER_ID: 0,
          MC_GAUGE_ID: Number(g.value),
          MC_GAUGE: g.label,
        };
      }),
    };
    console.log("data", data);
    mutation.mutate(data);
  }

  let errorMessage: string = "";
  if (mutation.isError) {
    errorMessage = mutation.error.message;
  }

  return (
    <AppPageContainer>
      <Alert
        variant="destructive"
        className={mutation.isError ? "visible" : "hidden"}
      >
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 lg:w-8/12 w-full"
        >
          <div className="flex flex-wrap gap-2 justify-between">
            <div className="w-full sm:w-5/12 flex flex-col gap-3">
              <FormField
                control={form.control}
                name="ID"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormLabel>id</FormLabel>
                    <FormControl>
                      <Input placeholder="Group name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="GROUP_NAME"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Group name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="CODE"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Floor============================================================================ */}
              <div className="flex justify-between items-end">
                <FormField
                  control={form.control}
                  name="FLOOR_ID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Floor</FormLabel>
                      <Popover open={openFloor} onOpenChange={setOpenFloor}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openFloor}
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? floors?.find(
                                    (buyer) =>
                                      Number(buyer.value) === field.value
                                  )?.label
                                : "Select a floor"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search floor..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No buyer found.</CommandEmpty>
                              <CommandGroup>
                                {floors?.map((buyer) => (
                                  <CommandItem
                                    value={buyer.label}
                                    key={buyer.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "FLOOR_ID",
                                        Number(buyer.value)
                                      );
                                      setOpenFloor(false);
                                    }}
                                  >
                                    {buyer.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        Number(buyer.value) === field.value
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
                      {/* <FormDescription>
                              This is the buyer that will be used in the report.
                            </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  onClick={() => form.resetField("FLOOR_ID")}
                  variant={"outline"}
                  type="button"
                  className="m-0 ml-1 px-[12px]"
                >
                  <MdOutlineClear className="rounded text-slate-600 m-0" />
                </Button>
              </div>
              {/* end-floor */}

              {/* Supervisor============================================================================ */}
              <div className="flex justify-between items-end">
                <FormField
                  control={form.control}
                  name="SUPERVISOR_ID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Supervisor</FormLabel>
                      <Popover
                        open={openSuperviosr}
                        onOpenChange={setOpenSupervisor}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openSuperviosr}
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? supervisors?.find(
                                    (buyer) =>
                                      Number(buyer.value) === field.value
                                  )?.label
                                : "Select a supervisor"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search floor..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No buyer found.</CommandEmpty>
                              <CommandGroup>
                                {supervisors?.map((buyer) => (
                                  <CommandItem
                                    value={buyer.label}
                                    key={buyer.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "SUPERVISOR_ID",
                                        Number(buyer.value)
                                      );
                                      setOpenSupervisor(false);
                                    }}
                                  >
                                    {buyer.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        Number(buyer.value) === field.value
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
                      {/* <FormDescription>
                              This is the buyer that will be used in the report.
                            </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  onClick={() => form.resetField("SUPERVISOR_ID")}
                  variant={"outline"}
                  type="button"
                  className="m-0 ml-1 px-[12px]"
                >
                  <MdOutlineClear className="rounded text-slate-600 m-0" />
                </Button>
              </div>
              {/* end-Supervisor============== */}
            </div>
            <div className="w-full sm:w-5/12 flex flex-col gap-3">
              {/* item-type============================================================================ */}
              <div className="flex justify-between items-end">
                <FormField
                  control={form.control}
                  name="BEST_FOR_ITEM_ID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Best For Item</FormLabel>
                      <Popover
                        open={openItemType}
                        onOpenChange={setOpenItemType}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openItemType}
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? itemTypes?.find(
                                    (buyer) =>
                                      Number(buyer.value) === field.value
                                  )?.label
                                : "Select an item"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search item type..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No buyer found.</CommandEmpty>
                              <CommandGroup>
                                {itemTypes?.map((buyer) => (
                                  <CommandItem
                                    value={buyer.label}
                                    key={buyer.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "BEST_FOR_ITEM_ID",
                                        Number(buyer.value)
                                      );
                                      setOpenItemType(false);
                                    }}
                                  >
                                    {buyer.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        Number(buyer.value) === field.value
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
                      {/* <FormDescription>
                              This is the buyer that will be used in the report.
                            </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  onClick={() => form.resetField("BEST_FOR_ITEM_ID")}
                  variant={"outline"}
                  type="button"
                  className="m-0 ml-1 px-[12px]"
                >
                  <MdOutlineClear className="rounded text-slate-600 m-0" />
                </Button>
              </div>
              {/* end-item-type============== */}
              {/* brand============================================================================ */}
              <div className="flex justify-between items-end">
                <FormField
                  control={form.control}
                  name="MC_BRAND_ID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Brand</FormLabel>
                      <Popover open={openBrand} onOpenChange={setOpenBrand}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openBrand}
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? brands?.find(
                                    (buyer) =>
                                      Number(buyer.value) === field.value
                                  )?.label
                                : "Select a brand"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search brand..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No buyer found.</CommandEmpty>
                              <CommandGroup>
                                {brands?.map((buyer) => (
                                  <CommandItem
                                    value={buyer.label}
                                    key={buyer.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "MC_BRAND_ID",
                                        Number(buyer.value)
                                      );
                                      setOpenBrand(false);
                                    }}
                                  >
                                    {buyer.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        Number(buyer.value) === field.value
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
                      {/* <FormDescription>
                              This is the buyer that will be used in the report.
                            </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  onClick={() => form.resetField("MC_BRAND_ID")}
                  variant={"outline"}
                  type="button"
                  className="m-0 ml-1 px-[12px]"
                >
                  <MdOutlineClear className="rounded text-slate-600 m-0" />
                </Button>
              </div>
              {/* end-brand============== */}

              <FormField
                control={form.control}
                name="NUMBER_OF_MACHINE"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of m/c</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="No. of m/c"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="IS_ACTIVE"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Is Active?</FormLabel>
                      <FormDescription>
                        If this field is not checked then this item will not
                        show in other pages.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            {/* gauge============================================================================ */}
            <div className="flex justify-between flex-col w-auto min-w-full mt-0">
              <div className="min-w-full mt-2">
                <FormField
                  control={form.control}
                  name="lstMC_GAUGE"
                  render={() => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Gauge</FormLabel>
                      <MultipleSelector
                        options={gauges}
                        value={form.getValues("lstMC_GAUGE")}
                        onChange={(v) => {
                          form.setValue("lstMC_GAUGE", v);
                        }}
                        badgeClassName="bg-white text-gray-500 border border-gray-400 hover:bg-gray-200"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* end-gauge============== */}
          </div>
          <div className="flex justify-between">
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
                  ? navigator("/win/sweater/mc-group")
                  : navigator("/dashboard/sweater/mc-group")
              }
              variant={"outline"}
              className={cn("w-24")}
            >
              Back
            </Button>
          </div>
        </form>
      </Form>
    </AppPageContainer>
  );
}
