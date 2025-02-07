import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import {
  planningBoardConfigureType,
  MCGroupType,
  masterDataType,
  Delete,
  Save,
  Update,
  detailsType,
} from "src/actions/Sweater/swt-planning-board-configure-action";
import { Alert, AlertTitle, AlertDescription } from "src/components/ui/alert";
import { Button } from "src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/table";

import { Input } from "src/components/ui/input";
import useAxiosInstance from "src/lib/axios-instance";
import { cn } from "src/lib/utils";
import { PageAction } from "src/utility/page-actions";
import { ReactQueryKey } from "src/utility/react-query-key";
import { z } from "zod";
import { Trash2Icon } from "lucide-react";
import {
  GetCompany,
  GetMCGroup,
  GetSection,
} from "src/actions/Sweater/swt-planning-board-configure-action";
import { useToast } from "src/components/ui/use-toast";

const formSchema = z.object({
  PLANNING_BOARD_NAME: z.string(),
  COMPANY: z.string(),
  COMPANY_ID: z.number().min(1),
  SECTION: z.string(),
  SECTION_ID: z.number().default(0),
  DEFAULT_WORKING_HOUR: z.string(),
  TOTAL_MC: z.string(),
  WEEKEND: z.string(),
  WEEK_START_FROM: z.string(),
});

interface ISection {
  Id: number;
  Name: string;
}

interface IFactory {
  ID: number;
  NAME: string;
}

interface IWeekend {
  name: string;
}

interface IWeekendStartFrom {
  name: string;
}

export default function PlanningBoardConfigureForm({
  data,
  pageAction,
}: {
  data: planningBoardConfigureType | undefined | null;
  pageAction: string;
}): React.JSX.Element {
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const axios = useAxiosInstance();
  const { toast } = useToast();

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
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKey.SwtPlanningBoard, data?.ID],
      });
      location.pathname.includes("win/")
        ? navigator("/win/sweater/planning-board-configure")
        : navigator("/dashboard/sweater/planning-board-configure");
    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
    },
  });

  const [MCGroupId, setMCGroupId] = useState<number>(0);

  const { data: factoryData } = GetCompany<IFactory>();
  const { data: sectionData } = GetSection<ISection>();
  const { data: MCGroupData } = GetMCGroup<MCGroupType>();

  const formatToday = (): string => {
    const now = new Date();
    const isoString = now.toISOString();
    return isoString.slice(0, 23) + isoString.slice(-1);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      ID: masterData.ID,
      PLANNING_BOARD_NAME: masterData.PLANNING_BOARD_NAME,
      COMPANY_ID: masterData.COMPANY_ID,
      COMPANY: masterData.COMPANY,
      SECTION_ID: masterData.SECTION_ID,
      SECTION: masterData.SECTION,
      DEFAULT_WORKING_HOUR: Number(masterData.DEFAULT_WORKING_HOUR),
      TOTAL_MC: Number(masterData.TOTAL_MC),
      WEEKEND: masterData.WEEKEND,
      WEEK_START_FROM: masterData.WEEK_START_FROM,
      CREATED_BY: masterData.CREATED_BY,
      CREATED_BY_NAME: masterData.CREATED_BY_NAME,
      CREATED_DATE: formatToday(),
      UPDATED_BY: masterData.UPDATED_BY,
      UPDATED_BY_NAME: masterData.UPDATED_BY_NAME,
      UPDATED_DATE: formatToday(),
      oDetails: detailsData?.map((detail) => ({
        ID: detail.ID,
        MASTER_ID: detail.MASTER_ID,
        MACHINE_GROUP_ID: detail.MACHINE_GROUP_ID,
        MACHINE_GROUP: detail.MACHINE_GROUP,
      })),
    };

    console.log(data);

    mutation.mutate(data, {
      onSuccess: (response) => {
        //console.log("Mutation successful:", response);
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
    detailsType[] | null | undefined
  >(data?.oDetails);

  const handleAdd = (id: number = 0) => {
    if (!MCGroupData || id <= 0) return;

    const itemToAdd = MCGroupData.find((item) => item.ID === id);
    if (!itemToAdd) return;

    const dData: detailsType = {
      ...itemToAdd,
      ID: 0,
      MASTER_ID: 0,
      MACHINE_GROUP_ID: itemToAdd.ID,
      MACHINE_GROUP: itemToAdd.GROUP_NAME,
    };

    const existingItem = detailsData?.filter(
      (d) => d.MACHINE_GROUP_ID === itemToAdd.ID
    );
    if (existingItem?.length) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "This group already exist.",
      });
      return;
    }

    setdetailsData((prev) => {
      if (prev?.some((existingItem) => existingItem.ID === id)) {
        return prev;
      }
      return [...(prev || []), dData];
    });
  };
  const handleRemove = (index: number) => {
    const items = detailsData?.filter((d, i) => i !== index);
    setdetailsData([...(items || [])]);
  };

  const [masterData, setMasterData] = useState<masterDataType>({
    ID: data ? data.ID : 0,
    PLANNING_BOARD_NAME: data ? data.PLANNING_BOARD_NAME : "",
    COMPANY: data ? data.COMPANY : "",
    COMPANY_ID: data ? data.COMPANY_ID : 0,
    SECTION: data ? data.SECTION : "",
    SECTION_ID: data ? data.SECTION_ID : 0,
    DEFAULT_WORKING_HOUR: data ? data.DEFAULT_WORKING_HOUR : 0,
    TOTAL_MC: data ? data.TOTAL_MC : 0,
    WEEKEND: data ? data.WEEKEND : "",
    WEEK_START_FROM: data ? data.WEEK_START_FROM : "",
    CREATED_BY: "",
    CREATED_BY_NAME: "",
    CREATED_DATE: new Date(),
    UPDATED_BY: "",
    UPDATED_BY_NAME: "",
    UPDATED_DATE: new Date(),
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setMasterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      PLANNING_BOARD_NAME: masterData?.PLANNING_BOARD_NAME || "",
      DEFAULT_WORKING_HOUR: masterData?.DEFAULT_WORKING_HOUR.toString() || "",
      TOTAL_MC: masterData?.TOTAL_MC.toString() || "",
      WEEKEND: masterData?.WEEKEND || "",
      WEEK_START_FROM: masterData?.WEEK_START_FROM || "",
    },
  });

  return (
    <>
      <div className="w-full p-1">
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
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
            className=""
          >
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="PLANNING_BOARD_NAME"
                render={({ field }) => (
                  <FormItem className="w-52">
                    <FormLabel className="font-bold">Name</FormLabel>
                    <FormControl onChange={handleInputChange}>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="COMPANY_ID"
                render={({ field }) => (
                  <FormItem className="min-w-52">
                    <FormLabel className="font-bold">Company</FormLabel>
                    <Select
                      value={masterData?.COMPANY_ID?.toString()}
                      onValueChange={(value) => {
                        const selectedFactory = factoryData?.find(
                          (factory) => factory.ID.toString() === value
                        );
                        if (selectedFactory) {
                          setMasterData((prev) => ({
                            ...prev,
                            COMPANY_ID: selectedFactory.ID,
                            COMPANY: selectedFactory.NAME,
                          }));
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        {factoryData?.map((factory) => (
                          <SelectItem
                            key={factory.ID}
                            value={factory.ID.toString()}
                          >
                            {factory.NAME}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel className="font-bold">Section</FormLabel>
                <Select
                  value={masterData?.SECTION_ID?.toString()}
                  onValueChange={(value) => {
                    const selectedSection = sectionData?.find(
                      (section) => section.Id.toString() === value
                    );
                    if (selectedSection) {
                      setMasterData((prev) => ({
                        ...prev,
                        SECTION_ID: selectedSection.Id,
                        SECTION: selectedSection.Name,
                      }));
                    }
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectionData?.map((section) => (
                      <SelectItem
                        key={section.Id}
                        value={section?.Id?.toString()}
                      >
                        {section?.Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>

              <FormField
                control={form.control}
                name="DEFAULT_WORKING_HOUR"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold whitespace-nowrap">
                      Default Working Hour
                    </FormLabel>
                    <FormControl onChange={handleInputChange}>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="TOTAL_MC"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Toal MC</FormLabel>
                    <FormControl onChange={handleInputChange}>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel className="font-bold">Weekend</FormLabel>
                <Select
                  value={masterData?.WEEKEND}
                  onValueChange={(value) => {
                    setMasterData((prev) => ({
                      ...prev,
                      WEEKEND: value,
                    }));
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a weekend" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Saturday">Saturday</SelectItem>
                    <SelectItem value="Sunday">Sunday</SelectItem>
                    <SelectItem value="Monday">Monday</SelectItem>
                    <SelectItem value="Tuesday">Tuesday</SelectItem>
                    <SelectItem value="Wednesday">Wednesday</SelectItem>
                    <SelectItem value="Thursday">Thursday</SelectItem>
                    <SelectItem value="Friday">Friday</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>

              <FormItem>
                <FormLabel className="font-bold">Week Start From</FormLabel>
                <Select
                  value={masterData?.WEEK_START_FROM}
                  onValueChange={(value) => {
                    setMasterData((prev) => ({
                      ...prev,
                      WEEK_START_FROM: value,
                    }));
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select week start day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Saturday">Saturday</SelectItem>
                    <SelectItem value="Sunday">Sunday</SelectItem>
                    <SelectItem value="Monday">Monday</SelectItem>
                    <SelectItem value="Tuesday">Tuesday</SelectItem>
                    <SelectItem value="Wednesday">Wednesday</SelectItem>
                    <SelectItem value="Thursday">Thursday</SelectItem>
                    <SelectItem value="Friday">Friday</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            </div>
            <hr className="mt-2 mb-1" />
            <div className="flex justify-start items-end mb-2">
              <FormItem>
                <FormLabel className="font-bold">MC Group</FormLabel>
                <Select
                  onValueChange={(value) => setMCGroupId(parseInt(value, 10))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    {MCGroupData?.map((MCGroup) => (
                      <SelectItem
                        key={MCGroup?.ID}
                        value={MCGroup?.ID?.toString()}
                      >
                        {MCGroup?.GROUP_NAME}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
              <Button
                type="button"
                onClick={() => handleAdd(MCGroupId)}
                className="ms-1"
              >
                {/* <ArrowBigDown size={18} className="me-1" /> */}
                Add
              </Button>
            </div>

            <div className="mb-5 min-h-60 p-0.5 border rounded-md">
              <Table className="min-w-full rounded-md">
                <TableHeader className="bg-green-100 rounded-md">
                  <TableRow className=" rounded-md">
                    <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                      S/L
                    </TableHead>
                    <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                      MC GROUP
                    </TableHead>
                    <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                      CODE
                    </TableHead>
                    <TableHead className="border border-gray-300 text-center px-4">
                      FLOOR
                    </TableHead>
                    <TableHead className="border border-gray-300 text-center px-4">
                      BRAND
                    </TableHead>
                    <TableHead className="border border-gray-300 text-center px-4">
                      GAUGE
                    </TableHead>
                    <TableHead className="border border-gray-300 text-center px-4">
                      NO OF MC (
                      {detailsData?.reduce(
                        (p, c) => Number(p) + Number(c.NUMBER_OF_MACHINE),
                        0
                      )}
                      )
                    </TableHead>
                    <TableHead className="border border-gray-300 text-center px-4"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailsData?.map((item, index) => (
                    <TableRow className="odd:bg-white even:bg-gray-50">
                      <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                        {index + 1}
                      </TableCell>
                      <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                        {item?.GROUP_NAME}
                      </TableCell>
                      <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                        {item?.CODE}
                      </TableCell>
                      <TableCell className="border border-gray-300 px-4  text-center">
                        {item.FLOOR}
                      </TableCell>
                      <TableCell className="border border-gray-300 px-4 text-center ">
                        {item.MC_BRAND}
                      </TableCell>
                      <TableCell className="border border-gray-300 px-4 text-center ">
                        {item.MC_GAUGE}
                      </TableCell>
                      <TableCell className="border border-gray-300 px-4 text-center ">
                        {item.NUMBER_OF_MACHINE}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-0 m-0 hover:cursor-pointer">
                        <div className="w-full h-full p-0 m-0 flex justify-center">
                          <Trash2Icon
                            size={15}
                            className=" hover:text-red-500"
                            onClick={() => handleRemove(index)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className={cn("flex justify-between")}>
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
                  {/* <span className="me-1">
                    <Import size={18} />
                  </span> */}
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
                  {/* <span className="me-1 text-xm">
                    <Ban size={18} />
                  </span> */}
                  Cancel
                </Button>
              </div>
              <Button
                type="reset"
                disabled={mutation.isPending}
                onClick={() =>
                  location.pathname.includes("win/")
                    ? navigator("/win/sweater/planning-board-configure")
                    : navigator("/dashboard/sweater/planning-board-configure")
                }
                variant={"outline"}
                className={cn("w-24")}
              >
                {/* <ArrowBigLeft size={18} />  */}
                Back
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
