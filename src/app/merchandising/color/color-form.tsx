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
} from "src/actions/Merchandising/merch-color-action";
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
import { ColorType } from "src/actions/Merchandising/merch-color-action";

const gaugeSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const formSchema = z.object({
  ID: z.number().default(0),
  BUYERID: z.number().default(0),
  COLORNAME: z.string().min(1, "Name is required."),
  COLOR_DISPLAY_NAME: z.string().min(1, "Display name is required."),
  COLOR_DESCRIPTION: z.string().min(1, "Description name is required."),
});

type NewType = {
  data: ColorType | undefined;
  lstBuyer: BuyerType[] | undefined;
  pageAction: string;
};

type comboBoxDataType = {
  label: string;
  value: string;
};

export default function ColorForm({
  data,
  lstBuyer,
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
    lstBuyer?.forEach((ele) => {
      _.push({ label: ele.NAME, value: ele.Id.toString() });
    });
    setMainBuyers([..._]);

  }, [lstBuyer]);

  const mutation = useMutation({
    mutationFn: (tag: ColorType) => {
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
        ? navigator("/win/merchandising/color")
        : navigator("/dashboard/merchandising/color");
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
      ID: data?.ID ? data.ID : 0,
      BUYERID: data?.BUYERID ? data.BUYERID : 0,
      COLORNAME: data?.COLORNAME ? data.COLORNAME : "",
      COLOR_DISPLAY_NAME: data?.COLOR_DISPLAY_NAME ? data.COLOR_DISPLAY_NAME : "",
      COLOR_DESCRIPTION: data?.COLOR_DESCRIPTION ? data.COLOR_DESCRIPTION : "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("form-value", values);

    var data: ColorType = {
      ID: values.ID,
      BUYERID: values.BUYERID,
      COLORNAME: values.COLORNAME,
      COLOR_DISPLAY_NAME: values.COLOR_DISPLAY_NAME,
      COLOR_DESCRIPTION: values.COLOR_DESCRIPTION ? values.COLOR_DESCRIPTION : null,
      CREATEDATE: moment().format("YYYY-MM-DD"),
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
                name="ID"
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

              {/* Main Buyer Dropdown */}
              <div className="flex justify-between items-end">
                <FormField
                  control={form.control}
                  name="BUYERID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Buyer</FormLabel>
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
                                      form.setValue("BUYERID", Number(buyer.value));
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
                  onClick={() => form.resetField("BUYERID")}
                  variant={"outline"}
                  type="button"
                  className="m-0 ml-1 px-[12px]"
                >
                  <MdOutlineClear className="rounded text-slate-600 m-0" />
                </Button>
              </div>
              {/* Color */}
              <FormField
                control={form.control}
                name="COLORNAME"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Color name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Right Column */}
            <div className="w-full sm:w-5/12 flex flex-col gap-2">
              {/* Color display Name */}
              <FormField
                control={form.control}
                name="COLOR_DISPLAY_NAME"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Display name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Color description Name */}
              <FormField
                control={form.control}
                name="COLOR_DESCRIPTION"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description name" {...field} />
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
                  ? navigator("/win/merchandising/color")
                  : navigator("/dashboard/merchandising/color")
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
