import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineClear } from "react-icons/md";
import { Link } from "react-router";
import { GetBuyer } from "@/actions/Sweater/merch-buyer-action";
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
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAxiosInstance from "@/lib/axios-instance";
import { cn } from "@/lib/utils";
import { PageAction } from "@/utility/page-actions";
import { z } from "zod";
import { GetSize, SizeType } from "@/actions/Merchandising/merch-size-action";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SizeTable } from "./size-table";
import TableSkeleton from "@/components/table-skeleton";

type comboBoxDataType = {
  label: string;
  value: string;
};

const formSchema = z.object({
  BUYERID: z.number().default(0),
});

export default function Size() {
  const { data: sizeData, isError, error } = GetSize();
  const { data: buyerData } = GetBuyer();

  const [buyers, setBuyers] = React.useState<comboBoxDataType[]>();
  const [openMainBuyer, setOpenMainBuyer] = React.useState(false);
  const [sizes, setSizes] = React.useState<SizeType[]>();

  const axios = useAxiosInstance();

  useEffect(() => {
    let _: comboBoxDataType[] = [];
    //---
    buyerData?.forEach((ele) => {
      _.push({ label: ele.NAME, value: ele.Id.toString() });
    });
    setBuyers([..._]);
    _ = [];
    //---
    setSizes(sizeData);
  }, [buyerData, sizeData]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      BUYERID: 0,
    },
  });

  if (isError) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  const handleBuyerChange = async (buyerId: string) => {
    if (buyerId !== "") {
      const response = (
        await axios.get("/production/Size/GetSizeByBuyer?buyerId=" + buyerId)
      ).data.Data;
      setSizes(response);
    }
  };

  return (
    <div className="p-5 bg-white rounded-lg mt-5">
      <div className="flex items-center justify-between border-b pb-0">
        <div className="font-bold text-2xl">Size</div>
        <div>
          <Link to={`${PageAction.add}/0`}>
            <Button className="mb-2" role="button">
              Add New Size
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-3">
        <div>
          <div className="flex flex-wrap gap-4 justify-start">
            {/* Left Column */}
            <div className="w-full sm:w-5/12 flex flex-col gap-2">
              {/*Buyer Dropdown */}
              <Form {...form}>
                <form className="space-y-8 lg:w-8/12 w-full">
                  <div className="flex justify-between items-end">
                    <FormField
                      control={form.control}
                      name="BUYERID"
                      render={({ field }) => (
                        <FormItem className="flex flex-col flex-1">
                          <Popover
                            open={openMainBuyer}
                            onOpenChange={setOpenMainBuyer}
                          >
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
                                    ? buyers?.find(
                                      (buyer) =>
                                        Number(buyer.value) === field.value
                                    )?.label
                                    : "Select a buyer"}
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
                                    {buyers?.map((buyer) => (
                                      <CommandItem
                                        value={buyer.label}
                                        key={buyer.value}
                                        onSelect={() => {
                                          form.setValue(
                                            "BUYERID",
                                            Number(buyer.value)
                                          );
                                          handleBuyerChange(buyer.value);
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
                </form>
              </Form>
            </div>
          </div>
        </div>
        {sizes ? <SizeTable data={sizes} /> : <TableSkeleton />}
      </div>
    </div>
  );
}
