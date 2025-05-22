/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast, ToastContainer } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import {
  Delete,
  Save,
  Update,
} from "@/actions/Merchandising/finish-good-valuation-action";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import useAxiosInstance from "@/lib/axios-instance";
import { PageAction } from "@/utility/page-actions";
import { ReactQueryKey } from "@/utility/react-query-key";
import { z } from "zod";

import AppPageContainer from "@/components/app-page-container";
import useApiUrl from "@/hooks/use-ApiUrl";
import { FinishGoodValuationDetailsType, FinishGoodValuationMasterType } from "@/actions/Merchandising/finish-good-valuation-action";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


const masterFormSchema = z.object({
  FROM_DATE: z.string(),
  TO_DATE: z.string(),
});

export default function FinishGoodValuationForm({
  data,
  pageAction,
}: {
  data: FinishGoodValuationMasterType | undefined | null;
  pageAction: string;
}): React.JSX.Element {
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const axios = useAxiosInstance();

  const mutation = useMutation({
    mutationFn: (tag: any) => {
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

      toast.success("Action performed successfully!");

      queryClient.invalidateQueries({
        queryKey: [ReactQueryKey.SwtPlanningBoard, data?.ID],
      });
      setTimeout(() => {
        location.pathname.includes("win/")
          ? navigator("/win/merchandising/finish-good-valuation")
          : navigator("/dashboard/merchandising/finish-good-valuation");
      }, 2000);
    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
    },
  });

  const api = useApiUrl();

  const getDetailsData = async (fromDate: string, toDate: string) => {
    let response = await axios.get(api.ProductionUrl + "/production/FinishGoodValuation/CalculateFinishGoodValuation?fromDate=" + fromDate + "&toDate=" + toDate);

    setdetailsData(response.data);

  }

  const GetLastFinishGoodValuationDate = async () => {
    try {
      const response = await axios.get(api.ProductionUrl + "/production/FinishGoodValuation/GetLastFinishGoodValuationDate");
      if (response?.data) {
        const dateString = response.data;
        const localDateString = new Date(dateString).toLocaleDateString('en-CA');
        masterForm.setValue("FROM_DATE", localDateString);
        setMasterData((prev) => ({
          ...prev,
          FROM_DATE: dateString,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch last finish good valuation date", error);
    }
  };

  const masterForm = useForm<z.infer<typeof masterFormSchema>>({
    resolver: zodResolver(masterFormSchema),
    defaultValues: {
      FROM_DATE: data?.FROM_DATE ? new Date(data.FROM_DATE).toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA'),
      TO_DATE: data?.TO_DATE ? new Date(data.TO_DATE).toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA'),
    },
  });



  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("Master data:", masterData);

    const validationResult = masterFormSchema.safeParse(masterData);
    type MasterFormType = z.infer<typeof masterFormSchema>;

    if (!validationResult.success) {

      const errors = validationResult.error.flatten().fieldErrors;

      Object.entries(errors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          masterForm.setError(field as keyof MasterFormType, {
            type: "manual",
            message: messages[0],
          });
        }
      });

      console.log("Validation errors:", errors);
      return;
    }

    const data = masterData;
    data.lstDetails = detailsData || [];

    console.log("Form data:", data);

    mutation.mutate(data, {
      onSuccess: (_response) => {
        console.log("Mutation successful:", _response);
      },
      onError: (error) => {
        console.error("Error during mutation:", error);
      },
    });

  }

  let errorMessage: string = "";
  if (mutation.isError) {
    errorMessage = mutation.error.message;
  }

  const [detailsData, setdetailsData] = useState<
    FinishGoodValuationDetailsType[] | null | undefined
  >(data?.lstDetails || []);

  const [masterData, setMasterData] = useState<FinishGoodValuationMasterType>({
    ID: data?.ID || 0,
    FROM_DATE: data ? new Date(data.FROM_DATE).toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA'),
    TO_DATE: data ? new Date(data.TO_DATE).toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA'),
    CREATED_BY: data?.CREATED_BY || "",
    CREATED_DATE: data?.CREATED_DATE ? new Date(data.CREATED_DATE).toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA'),
    UPDATED_BY: data?.UPDATED_BY || "",
    UPDATED_DATE: data?.UPDATED_DATE ? new Date(data.UPDATED_DATE).toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA'),
    lstDetails: data?.lstDetails || []
  });

  useEffect(() => {
    if (pageAction === PageAction.add) {
      const fetchInitialData = async () => {
        await GetLastFinishGoodValuationDate();
      };
      fetchInitialData();
    }
  }, []);

  const isFirstRun = useRef(true);

  useEffect(() => {

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (pageAction == PageAction.add && masterData.FROM_DATE && masterData.TO_DATE) {
      getDetailsData(masterData.FROM_DATE, masterData.TO_DATE);


      console.log("called");

    }

  }, [masterData.FROM_DATE, masterData.TO_DATE]);

  return (
    <AppPageContainer>
      <div className="w-full p-1">
        <Alert
          variant="destructive"
          className={mutation.isError ? "visible" : "hidden"}
        >
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>

        {/* Master Data */}
        <div>
          <ToastContainer position="top-right" autoClose={2000} />
          <Form {...masterForm}>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
              className=""
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">

                <FormField
                  control={masterForm.control}
                  name="FROM_DATE"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-bold">From Date</FormLabel>
                      <FormControl>
                        <Input
                          style={{ marginTop: "2px" }}
                          placeholder=""
                          type="date"
                          value={field.value ? new Date(field.value).toLocaleDateString('en-CA') : ''}
                          onChange={(e) => {
                            const newDate = e.target.value ? new Date(e.target.value) : null;
                            field.onChange(newDate);
                            setMasterData((prev) => ({
                              ...prev,
                              FROM_DATE: new Date(e.target.value).toLocaleDateString('en-CA'),
                            }));
                          }}
                          className="form-control w-full h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={masterForm.control}
                  name="TO_DATE"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-bold">To Date</FormLabel>
                      <FormControl>
                        <Input
                          style={{ marginTop: "2px" }}
                          placeholder=""
                          type="date"
                          value={field.value ? new Date(field.value).toLocaleDateString('en-CA') : ''}
                          onChange={(e) => {
                            const newDate = e.target.value ? new Date(e.target.value) : null;
                            field.onChange(newDate);
                            setMasterData((prev) => ({
                              ...prev,
                              TO_DATE: new Date(e.target.value).toLocaleDateString('en-CA'),
                            }));
                          }}
                          className="form-control w-full h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-5">
                {/* ===================================Details data===================================== */}
                <div className="border p-1">
                  <div className="max-h-[300px] overflow-y-auto border rounded-md">
                    <Table className="min-w-full rounded-md">
                      <TableHeader className="bg-green-100 rounded-md">
                        <TableRow className=" rounded-md">
                          <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                            SL
                          </TableHead>
                          <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                            Order/Job No
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Buyer
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Style
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Order Qty
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Pack Qty
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            Pre-Cost/Pc
                          </TableHead>
                          <TableHead className="border border-gray-300 text-center px-4">
                            FG Value
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {detailsData?.map((item, index) => (
                          <TableRow className={`'odd:bg-white even:bg-gray-50'
                          }`}>
                            <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                              {index + 1}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4  text-center">
                              {item.PO_NO}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4  text-center">
                              {item.BUYER}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.STYLE}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.ORDER_QTY}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.PACK_QTY}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.FG_VALUE == 0 ? 0 : (item.FG_VALUE / item.PACK_QTY).toFixed(2)}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 text-center ">
                              {item.FG_VALUE}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              <div className={cn("flex justify-between mt-5")}>
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
                      masterForm.reset();
                      masterForm.clearErrors();
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
                      ? navigator("/win/merchandising/finish-good-valuation")
                      : navigator("/dashboard/merchandising/finish-good-valuation")
                  }
                  variant={"outline"}
                  className={cn("w-24")}
                >
                  Back
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="mt-5"></div>
        {/* <div className="p-2 mt-5">
          {
            pageAction != PageAction.add &&
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`/report/merchandising/compensation-claim-report?id=${masterData.ID}`}
              className="px-4 py-2 bg-blue font-semibold text-white rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Show Report
            </a>
          }
        </div> */}
      </div>
    </AppPageContainer>
  );
}
