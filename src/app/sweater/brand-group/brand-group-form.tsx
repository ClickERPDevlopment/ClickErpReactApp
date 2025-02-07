/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { BrandType } from "src/actions/get-brand";
import { SwtMachineBrandGroupType } from "src/actions/Sweater/swt-mc-brand-group-action";
import {
  Delete,
  Save,
  Update,
} from "src/actions/Sweater/swt-mc-brand-group-action";
import MultipleSelector from "src/components/app-multi-select-combobox";
import { Alert, AlertTitle, AlertDescription } from "src/components/ui/alert";
import { Button } from "src/components/ui/button";
import { Checkbox } from "src/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import useAxiosInstance from "src/lib/axios-instance";
import { cn } from "src/lib/utils";
import { PageAction } from "src/utility/page-actions";
import { z } from "zod";
import { companyId, setCompanyId } from "src/utility/local-storage-utils";
import React from "react";

const gaugeSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const formSchema = z.object({
  ID: z.number().default(0),
  GROUP_NAME: z.string(),
  IS_ACTIVE: z.boolean().default(true),
  lstBrands: z.array(gaugeSchema).min(1, "Brands are required."),
});

type props = {
  data: SwtMachineBrandGroupType | undefined;
  pageAction: string;
  lstBrand: BrandType[] | undefined;
};

type comboBoxDataType = {
  label: string;
  value: string;
};

export default function BrandGroupForm({ data, pageAction, lstBrand }: props) {
  //--
  const [brands, setBrands] = React.useState<comboBoxDataType[]>();
  //--

  //--------------------------
  const location = useLocation();
  const navigator = useNavigate();
  const axios = useAxiosInstance();
  //--------------------------

  React.useEffect(() => {
    setCompanyId(2);

    //---
    const _: comboBoxDataType[] = [];
    lstBrand?.forEach((ele) => {
      _.push({ label: ele.BRAND_NAME, value: ele.BRAND_ID.toString() });
    });
    setBrands([..._]);
    //---
  }, [lstBrand]);

  const mutation = useMutation({
    mutationFn: (mbg: SwtMachineBrandGroupType) => {
      if (pageAction === PageAction.add) {
        return Save(mbg, axios);
      } else if (pageAction === PageAction.edit) {
        return Update(mbg, axios);
      } else if (pageAction === PageAction.delete) {
        return Delete(mbg.ID, axios);
      } else {
        throw new Error("Page Action no found.");
      }
    },
    onSuccess: () => {
      location.pathname.includes("win/")
        ? navigator("/win/sweater/brand-group")
        : navigator("/dashboard/sweater/brand-group");
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
      IS_ACTIVE: data?.IS_ACTIVE,
      lstBrands: data?.lstBrands?.map((d) => {
        return { value: d.MC_BRAND_ID.toString(), label: d.MC_BRAND };
      }),
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("form-value", values);
    const data: SwtMachineBrandGroupType = {
      ID: values.ID,
      GROUP_NAME: values.GROUP_NAME,
      IS_ACTIVE: values.IS_ACTIVE,
      lstBrands: values.lstBrands.map((g) => {
        return {
          ID: 0,
          MASTER_ID: 0,
          MC_BRAND_ID: Number(g.value),
          MC_BRAND: g.label,
        };
      }),
      COMPANY_ID: Number(companyId),
    };
    // console.log("data", data);
    mutation.mutate(data);
  }

  let errorMessage: any = null;
  if (mutation.isError) {
    errorMessage = mutation.error.response?.data;
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
          <div className="flex flex-wrap gap-2 justify-between">
            <div className="w-full sm:w-6/12 flex flex-col gap-3">
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
            {/* Brands============================================================================ */}
            <div className="flex justify-between flex-col w-auto min-w-full mt-0">
              <div className="min-w-full mt-2">
                <FormField
                  control={form.control}
                  name="lstBrands"
                  render={() => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>M/C Brand</FormLabel>
                      <MultipleSelector
                        options={brands}
                        value={form.getValues("lstBrands")}
                        onChange={(v) => {
                          form.setValue("lstBrands", v);
                        }}
                        badgeClassName="bg-white text-gray-500 border border-gray-400 hover:bg-gray-200"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* end-Brands============== */}
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
                  ? navigator("/win/sweater/brand-group")
                  : navigator("/dashboard/sweater/brand-group")
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
