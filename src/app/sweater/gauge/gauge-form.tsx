/* eslint-disable @typescript-eslint/no-unused-expressions */
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import {
  SwtGaugeType,
  Delete,
  Save,
  Update,
} from "@/actions/Sweater/swt-gauge-action";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
import useAxiosInstance from "@/lib/axios-instance";
import { cn } from "@/lib/utils";
import { PageAction } from "@/utility/page-actions";
import { ReactQueryKey } from "@/utility/react-query-key";
import { z } from "zod";

const formSchema = z.object({
  ID: z.number().default(0),
  GAUGE: z.string().min(2, {
    message: "GAUGE must be at least 2 characters.",
  }),
  IsActive: z.boolean().default(true),
});

export default function GaugeForm({
  data,
  pageAction,
}: {
  data: SwtGaugeType | undefined;
  pageAction: string;
}) {
  // console.log("gauge: ", data);
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const axios = useAxiosInstance();

  const mutation = useMutation({
    mutationFn: (tag: SwtGaugeType) => {
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
        queryKey: [ReactQueryKey.SwtGauge],
      });
      location.pathname.includes("win/")
        ? navigator("/win/sweater/gauge")
        : navigator("/dashboard/sweater/gauge");
    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ID: data ? data.ID : 0,
      GAUGE: data?.GAUGE ? data.GAUGE : "",
      IsActive: data ? data.IsActive : true,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data: SwtGaugeType = {
      ID: values?.ID,
      GAUGE: values?.GAUGE,
      IsActive: values?.IsActive,
    };
    console.log(data);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-wrap gap-2 justify-between">
            <div className="w-full sm:w-8/12 flex flex-col gap-3">
              <FormField
                control={form.control}
                name="ID"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormLabel>GAUGE</FormLabel>
                    <FormControl>
                      <Input placeholder="GAUGE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="GAUGE"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GAUGE</FormLabel>
                    <FormControl>
                      <Input placeholder="GAUGE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="IsActive"
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
                  ? navigator("/win/sweater/gauge")
                  : navigator("/dashboard/sweater/gauge")
              }
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
