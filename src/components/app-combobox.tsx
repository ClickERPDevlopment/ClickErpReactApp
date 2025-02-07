/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "src/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { CheckIcon } from "lucide-react";
import { MdOutlineClear } from "react-icons/md";
import { ComboBoxOptionsType } from "@/app-type";

export interface props {
  form: any;
  options: ComboBoxOptionsType[] | undefined;
  name: string;
  title: string;
}
export default function AppCombobox({
  form,
  options: brands,
  name,
  title,
}: props) {
  const [openBrand, setOpenBrand] = React.useState<boolean>();

  return (
    <div className="flex justify-between items-end w-full overflow-hidden">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-row flex-1 items-center gap-2">
            <FormLabel className="mt-2">{title}</FormLabel>
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
                          (buyer) => Number(buyer.value) === field.value
                        )?.label
                      : "Select..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search brand..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup>
                      {brands?.map((buyer) => (
                        <CommandItem
                          value={buyer.label}
                          key={buyer.value}
                          onSelect={() => {
                            form.setValue(name, Number(buyer.value));
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
        onClick={() => form.resetField(name)}
        variant={"outline"}
        type="button"
        className="m-0 ml-1 px-[12px]"
      >
        <MdOutlineClear className="rounded text-slate-600 m-0" />
      </Button>
    </div>
  );
}
