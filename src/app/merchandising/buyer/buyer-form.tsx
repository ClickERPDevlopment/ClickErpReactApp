import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CheckIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { MdOutlineClear } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";
import { BuyerType } from "src/actions/Sweater/merch-buyer-action";
import {
  Delete,
  Save,
  Update,
} from "src/actions/Sweater/merch-buyer-action";
import { Alert, AlertTitle, AlertDescription } from "src/components/ui/alert";
import { Button } from "src/components/ui/button";
import { Checkbox } from "src/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "src/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import useAxiosInstance from "src/lib/axios-instance";
import { cn } from "src/lib/utils";
import { PageAction } from "src/utility/page-actions";
import { ReactQueryKey } from "src/utility/react-query-key";
import { z } from "zod";
import { CountryType } from "src/actions/get-country-action";
import moment from "moment";

const gaugeSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const formSchema = z.object({
  Id: z.number().default(0),
  CODE: z.string().min(1, "Code is required."),
  NAME: z.string().min(1, "Name is required."),
  DISPLAY_NAME: z.string().min(1, "Display name is required."),
  CONTACT: z.string().default(""),
  EMAIL: z.string().default(""),
  COMMISSION: z.string().default("0"),
  MAINBUYERID: z.number().default(0),
  COUNTRYID: z.number().default(0),
  ADDRESS: z.string().default(""),
  BUNDLENOSTARTFROMZERO: z.boolean().default(true),
  ISACTIVE: z.boolean().default(true),
});

type NewType = {
  data: BuyerType | undefined;
  lstMainBuyer: BuyerType[] | undefined;
  lstCountry: CountryType[] | undefined;
  pageAction: string;
};

type comboBoxDataType = {
  label: string;
  value: string;
};

export default function BuyerForm({
  data,
  lstMainBuyer,
  lstCountry,
  pageAction,
}: NewType) {
  //--
  const [mainBuyers, setMainBuyers] = React.useState<comboBoxDataType[]>();
  const [openMainBuyer, setOpenMainBuyer] = React.useState(false);

  const [country, setCountry] = React.useState<comboBoxDataType[]>();
  const [openCountry, setOpenCountry] = React.useState(false);

  //--
  //--------------------------
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const axios = useAxiosInstance();
  //--------------------------

  React.useEffect(() => {
    let _: comboBoxDataType[] = [];
    //---
    lstMainBuyer?.forEach((ele) => {
      _.push({ label: ele.NAME, value: ele.Id.toString() });
    });
    setMainBuyers([..._]);
    _ = [];
    //---
    lstCountry?.forEach((ele) => {
      _.push({ label: ele.Name, value: ele.CountryId.toString() });
    });
    setCountry([..._]);

  }, [lstCountry, lstMainBuyer]);

  const mutation = useMutation({
    mutationFn: (tag: BuyerType) => {
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
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKey.SwtMachineGroup],
      });

      location.pathname.includes("win/")
        ? navigator("/win/merchandising/buyer")
        : navigator("/dashboard/merchandising/buyer");
    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
    },
  });

  // 1. Define your form.
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Id: data?.Id ? data.Id : 0,
      NAME: data?.NAME ? data.NAME : "",
      CODE: data?.CODE ? data.CODE : "",
      DISPLAY_NAME: data?.DISPLAY_NAME ? data.DISPLAY_NAME : "",
      CONTACT: data?.CONTACT ? data.CONTACT : undefined,
      EMAIL: data?.EMAIL ? data.EMAIL : undefined,
      COMMISSION: data?.COMMISSION ? data.COMMISSION.toString() : "0",
      MAINBUYERID: data?.MAINBUYERID ? data.MAINBUYERID : 0,
      COUNTRYID: data?.COUNTRYID ? data.COUNTRYID : 0,
      ADDRESS: data?.ADDRESS ? data.ADDRESS : undefined,
      BUNDLENOSTARTFROMZERO: data?.BUNDLENOSTARTFROMZERO == "1" ? true : false,
      ISACTIVE: data?.ISACTIVE == "1" ? true : false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("form-value", values);

    var data: BuyerType = {
      Id: values.Id,
      NAME: values.NAME,
      CODE: values.CODE,
      DISPLAY_NAME: values.DISPLAY_NAME,
      CONTACT: values.CONTACT,
      EMAIL: values.EMAIL,
      COMMISSION: Number(values.COMMISSION),
      MAINBUYERID: values.MAINBUYERID,
      COUNTRYID: values.COUNTRYID,
      ADDRESS: values.ADDRESS,
      BUNDLENOSTARTFROMZERO: values.BUNDLENOSTARTFROMZERO ? "1" : "0",
      ISACTIVE: values.ISACTIVE ? "1" : "0",
      Country: null,
      REMARKS: null,
      CREATEBY: "",
      CREATEDATE: moment().format("YYYY-MM-DD"),
      UPDATEBY: null,
      UPDATEDATE: moment().format("YYYY-MM-DD"),
      IS_LOCAL: "",
      OUTSIDE_CHALLAN_BUYER_NAME: "",
    };
    mutation.mutate(data);
  }

  let errorMessage: string = "";
  if (mutation.isError) {
    errorMessage = mutation.error.message;
  }

  return (
    <>
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
          <div className="flex flex-wrap gap-4 justify-start">
            {/* Left Column */}
            <div className="w-full sm:w-5/12 flex flex-col gap-2">
              {/* Hidden ID Field */}
              <FormField
                control={form.control}
                name="Id"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormLabel>id</FormLabel>
                    <FormControl>
                      <Input placeholder="Buyer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buyer Code */}
              <FormField
                control={form.control}
                name="CODE"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Buyer Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Buyer Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buyer Name */}
              <FormField
                control={form.control}
                name="NAME"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Buyer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Buyer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Display Name */}
              <FormField
                control={form.control}
                name="DISPLAY_NAME"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Buyer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact No */}
              <FormField
                control={form.control}
                name="CONTACT"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact No</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact No" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="EMAIL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Is Active Checkbox */}
              <FormField
                control={form.control}
                name="ISACTIVE"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Is Active?</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              {/* Bundle No Start From Zero Checkbox */}
              <FormField
                control={form.control}
                name="BUNDLENOSTARTFROMZERO"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Bundle No Start From Zero?</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Right Column */}
            <div className="w-full sm:w-5/12 flex flex-col gap-2">
              {/* Buying Commission */}
              <FormField
                control={form.control}
                name="COMMISSION"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Buying Commission</FormLabel>
                    <FormControl>
                      <Input placeholder="Buying Commission" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Main Buyer Dropdown */}
              <div className="flex justify-between items-end">
                <FormField
                  control={form.control}
                  name="MAINBUYERID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Main Buyer</FormLabel>
                      <Popover open={openMainBuyer} onOpenChange={setOpenMainBuyer}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openMainBuyer}
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? mainBuyers?.find((buyer) => Number(buyer.value) === field.value)?.label
                                : "Select a buyer"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search floor..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No buyer found.</CommandEmpty>
                              <CommandGroup>
                                {mainBuyers?.map((buyer) => (
                                  <CommandItem
                                    value={buyer.label}
                                    key={buyer.value}
                                    onSelect={() => {
                                      form.setValue("MAINBUYERID", Number(buyer.value));
                                      setOpenMainBuyer(false);
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  onClick={() => form.resetField("MAINBUYERID")}
                  variant={"outline"}
                  type="button"
                  className="m-0 ml-1 px-[12px]"
                >
                  <MdOutlineClear className="rounded text-slate-600 m-0" />
                </Button>
              </div>

              {/* Country Dropdown */}
              <div className="flex justify-between items-end">
                <FormField
                  control={form.control}
                  name="COUNTRYID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Country</FormLabel>
                      <Popover open={openCountry} onOpenChange={setOpenCountry}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openCountry}
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? country?.find((country) => Number(country.value) === field.value)?.label
                                : "Select a Country"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search Country..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No country found.</CommandEmpty>
                              <CommandGroup>
                                {country?.map((country) => (
                                  <CommandItem
                                    value={country.label}
                                    key={country.value}
                                    onSelect={() => {
                                      form.setValue("COUNTRYID", Number(country.value));
                                      setOpenCountry(false);
                                    }}
                                  >
                                    {country.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        Number(country.value) === field.value
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
                  onClick={() => form.resetField("COUNTRYID")}
                  variant={"outline"}
                  type="button"
                  className="m-0 ml-1 px-[12px]"
                >
                  <MdOutlineClear className="rounded text-slate-600 m-0" />
                </Button>
              </div>

              {/* Address */}
              <FormField
                control={form.control}
                name="ADDRESS"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
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
                  ? navigator("/win/merchandising/buyer")
                  : navigator("/dashboard/merchandising/buyer")
              }
              variant={"outline"}
              className={cn("w-24")}
            >
              Back
            </Button>
          </div>
        </form>
      </Form >
    </>
  );
}
