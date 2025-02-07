import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import moment from "moment";
import React from "react";

import { useForm } from "react-hook-form";
import { MdOutlineClear } from "react-icons/md";
import { useNavigate } from "react-router";
import {
  CountryType,
  Delete,
  Save,
  Update,
} from "@/actions/get-country-action";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
import { cn } from "@/lib/utils";
import { PageAction } from "@/utility/page-actions";
import { ReactQueryKey } from "@/utility/react-query-key";
import { z } from "zod";

const formSchema = z.object({
  CountryId: z.number().default(0),
  Name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  Phonecode: z.string().optional(),
  IsoCode2: z.string().optional(),
  IsoCode3: z.string().optional(),
  Region: z.string().optional(),
  Status: z.boolean().default(true),
  Createby: z.string().optional(),
  Createdate: z.date().optional(),
});

export default function CountryForm({
  data,
  pageAction,
}: {
  data: CountryType | undefined;
  pageAction: string;
}) {
  // console.log("country: ", data);
  const queryClient = useQueryClient();
  const navigator = useNavigate();

  const mutation = useMutation({
    mutationFn: (tag: CountryType) => {
      if (pageAction === PageAction.add) {
        return Save(tag);
      } else if (pageAction === PageAction.edit) {
        return Update(tag);
      } else if (pageAction === PageAction.delete) {
        return Delete(tag.CountryId);
      } else {
        throw new Error("Page Action no found.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKey.country],
      });
      navigator("/dashboard/configuration/country");
    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CountryId: data ? data.CountryId : 0,
      Name: data?.Name ? data.Name : "",
      Phonecode: data?.Phonecode ? data.Phonecode : "",
      IsoCode2: data?.IsoCode2 ? data.IsoCode2 : "",
      IsoCode3: data?.IsoCode3 ? data.IsoCode3 : "",
      Region: data?.Region ? data.Region : "",
      Createby: data?.Createby ? data.Createby : "",
      Createdate: data?.Createdate ? new Date(data.Createdate) : undefined,
      Status: data?.Status ? data.Status : true,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data: CountryType = {
      CountryId: values?.CountryId,
      Name: values?.Name,
      Phonecode: values?.Phonecode,
      IsoCode2: values?.IsoCode2,
      IsoCode3: values?.IsoCode3,
      Region: values?.Region,
      Status: values?.Status,
      Createby: values?.Createby,
      Createdate: values?.Createdate
        ? moment(values?.Createdate).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD"),
    };
    console.log(data);
    mutation.mutate(data);
  }

  let errorMessage: string = "";
  if (mutation.isError) {
    errorMessage = mutation.error.message;
  }
  const [openFromDate, setOpenFromDate] = React.useState(false);
  //flex flex-1 flex-col gap-3
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-wrap gap-2 justify-between">
            <div className="w-full sm:w-5/12 flex flex-col gap-3">
              <FormField
                control={form.control}
                name="IsoCode3"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormLabel>id</FormLabel>
                    <FormControl>
                      <Input placeholder="IsoCode3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Phonecode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="IsoCode2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISO_CODE_2 Code</FormLabel>
                    <FormControl>
                      <Input placeholder="IsoCode2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="IsoCode3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISO_CODE_3 Code</FormLabel>
                    <FormControl>
                      <Input placeholder="IsoCode3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full sm:w-5/12 flex flex-col gap-3">
              <FormField
                control={form.control}
                name="Region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Region" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Createby"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Createby Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Region" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Status"
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
                        If this field is not checked/active then this will not
                        show in other pages.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-end">
                <FormField
                  control={form.control}
                  name="Createdate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Created Date</FormLabel>
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
                            // onSelect={field.onChange}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  onClick={() => form.resetField("Createdate")}
                  variant={"outline"}
                  type="button"
                  className="m-0 ml-1 px-[12px]"
                >
                  <MdOutlineClear className="rounded text-slate-600 m-0" />
                </Button>
              </div>
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
              onClick={() => navigator("/dashboard/configuration/country")}
              variant={"outline"}
              className={cn("w-24")}
            >
              Back
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
