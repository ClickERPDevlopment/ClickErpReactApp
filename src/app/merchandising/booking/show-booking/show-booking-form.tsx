/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetAllBuyer } from "@/actions/Merchandising/get-buyer";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { MdOutlineClear } from "react-icons/md";
import React from "react";
import { GetAllStyleByBuyer } from "@/actions/Merchandising/get-style";
import { GetAllPoByStyled } from "@/actions/Merchandising/get-po";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type comboBoxDataType = {
  label: string;
  value: string;
};

const FormSchema = z.object({
  buyerId: z
    .number({
      required_error: "Please select a buyer.",
    })
    .optional()
    .default(0),
  poId: z
    .number({
      required_error: "Please select a po.",
    })
    .optional()
    .default(0),
  styleId: z
    .number({
      required_error: "Please select a style.",
    })
    .optional()
    .default(0),

  bookingType: z
    .string({
      required_error: "Please select a booking type.",
    }),

  po: z
    .string({
      required_error: "Please select a po.",
    })
    .optional(),
});

export default function ShowBookingForm() {
  const [_selectedBuyer, setSelectedBuyer] = useState<number>(0);
  const [_selectedPo, setSelectedPo] = useState<number>(0);
  const [_selectedStyle, setSelectedStyle] = useState<number>(0);

  const [buyers, setBuyers] = useState<comboBoxDataType[]>();
  const [pos, setPos] = useState<comboBoxDataType[]>();
  const [styles, setStyles] = useState<comboBoxDataType[]>();

  const [openBuyer, setOpenBuyer] = React.useState(false);
  const [openPo, setOpenPo] = React.useState(false);
  const [openStyle, setOpenStyle] = React.useState(false);

  const { data: buyersData } = GetAllBuyer();
  const { data: styleData } = GetAllStyleByBuyer(_selectedBuyer);
  const { data: poData } = GetAllPoByStyled(_selectedStyle);

  useEffect(() => {
    const _: comboBoxDataType[] = [];
    buyersData?.forEach((element) => {
      _.push({ label: element.NAME, value: element.Id });
    });

    setBuyers([..._]);
  }, [buyersData]);

  useEffect(() => {
    const _: comboBoxDataType[] = [];
    poData?.forEach((element) => {
      _.push({ label: element.Pono, value: element.Id });
    });

    setPos([..._]);
  }, [poData]);

  useEffect(() => {
    const _: comboBoxDataType[] = [];
    styleData?.forEach((element) => {
      _.push({ label: element.Styleno, value: element.Id });
    });

    setStyles([..._]);
  }, [styleData]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    if (data.bookingType === "fabric") {
      window.open(
        `/report/merchandising/booking/fabric-booking-report?poId=${data.poId}&styleId=${data.styleId}`,
        "blank"
      );
    } else {
      window.open(
        `/report/merchandising/booking/yarn-booking-report?buyerId=${data.buyerId}&poId=${data.poId}&poNo=${data.poId}&styleId=${data.styleId}`,
        "blank"
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Buyer==================================================================================== */}
        <div className="flex justify-between items-end">
          <FormField
            control={form.control}
            name="buyerId"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>Buyer</FormLabel>
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
                          ? buyers?.find(
                            (buyer) => Number(buyer.value) === field.value
                          )?.label
                          : "Select a buyer"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search buyer..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No buyer found.</CommandEmpty>
                        <CommandGroup>
                          {buyers?.map((buyer) => (
                            <CommandItem
                              value={buyer.label}
                              key={buyer.value}
                              onSelect={() => {
                                form.setValue("buyerId", Number(buyer.value));
                                setSelectedBuyer(Number(buyer.value));
                                setOpenBuyer(false);
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
            onClick={() => form.resetField("buyerId")}
            variant={"outline"}
            type="button"
            className="m-0 ml-1 px-[12px]"
          >
            <MdOutlineClear className="rounded text-slate-600 m-0" />
          </Button>
        </div>
        {/* end-Buyer================================================================================ */}

        {/* Style==================================================================================== */}
        <div className="flex justify-between items-end">
          <FormField
            control={form.control}
            name="styleId"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>Style</FormLabel>
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
                          ? styles?.find(
                            (s) => Number(s.value) === field.value
                          )?.label
                          : "Select a style"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search style..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No style found.</CommandEmpty>
                        <CommandGroup>
                          {styles?.map((s) => (
                            <CommandItem
                              value={s.label}
                              key={s.value}
                              onSelect={() => {
                                form.setValue("styleId", Number(s.value));
                                setSelectedStyle(Number(s.value));
                                setOpenStyle(false);
                              }}
                            >
                              {s.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  Number(s.value) === field.value
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
            onClick={() => form.resetField("styleId")}
            variant={"outline"}
            type="button"
            className="m-0 ml-1 px-[12px]"
          >
            <MdOutlineClear className="rounded text-slate-600 m-0" />
          </Button>
        </div>
        {/* end-Style================================================================================ */}


        {/* PO==================================================================================== */}
        <div className="flex justify-between items-end">
          <FormField
            control={form.control}
            name="poId"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>PO</FormLabel>
                <Popover open={openPo} onOpenChange={setOpenPo}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openPo}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? pos?.find(
                            (po) => Number(po.value) === field.value
                          )?.label
                          : "Select a po"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search po..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No po found.</CommandEmpty>
                        <CommandGroup>
                          {pos?.map((po) => (
                            <CommandItem
                              value={po.label}
                              key={po.value}
                              onSelect={() => {
                                form.setValue("poId", Number(po.value));
                                form.setValue("po", po.label);
                                setSelectedPo(Number(po.value));
                                setOpenPo(false);
                              }}
                            >
                              {po.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  Number(po.value) === field.value
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
            onClick={() => form.resetField("poId")}
            variant={"outline"}
            type="button"
            className="m-0 ml-1 px-[12px]"
          >
            <MdOutlineClear className="rounded text-slate-600 m-0" />
          </Button>
        </div>
        {/* end-PO================================================================================ */}

        {/* Booking Type==================================================================================== */}
        <div className="flex justify-between items-end">
          <FormField
            control={form.control}
            name="bookingType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Booking Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="border border-gray-400">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a booking type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="fabric">Fabric</SelectItem>
                    <SelectItem value="yarn">Yarn</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* end Booking Type================================================================================= */}


        <Button type="submit" className="w-full">
          Show
        </Button>
      </form>
    </Form>
  );
}
