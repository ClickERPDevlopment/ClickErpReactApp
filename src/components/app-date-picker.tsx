/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { MdOutlineClear } from "react-icons/md";
import { Button } from "src/components/ui/button";
import { Calendar } from "src/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import { cn } from "src/lib/utils";

export interface props {
  form: any;
  name: string;
  title: string;
}

export default function AppDatePicker({ form, name, title }: props) {
  const [openFromDate, setOpenFromDate] = React.useState<boolean>();
  return (
    <div className="flex justify-between items-end w-full">
      <FormField
        control={form.control}
        name={name.toString()}
        render={({ field }) => (
          <FormItem className="flex flex-row flex-1 items-center gap-2">
            <FormLabel className="mt-2 w-auto">{title}</FormLabel>
            <Popover
              open={openFromDate}
              onOpenChange={(x) => {
                setOpenFromDate(x);
              }}
            >
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    aria-expanded={openFromDate}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(e) => {
                    field.onChange(e);
                    setOpenFromDate(false);
                  }}
                  disabled={(date: Date) => date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
