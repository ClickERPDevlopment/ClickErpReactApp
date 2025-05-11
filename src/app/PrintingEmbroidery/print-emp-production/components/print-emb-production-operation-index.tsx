
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Save,
} from "@/actions/PrintingEmbroidery/print-emb-production-operation-action";
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
import { cn } from "@/lib/utils";
import { z } from "zod";

import useApiUrl from "@/hooks/use-ApiUrl";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { PrintEmbProductionOperationType } from "@/actions/PrintingEmbroidery/print-emb-production-operation-action";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";


function PrintEmbProductionOperationIndex() {

  const mutation = useMutation({
    mutationFn: (tag: any) => {
      if (1) {
        return Save(tag, axios);
      }
      else {
        throw new Error("Invalid action type.");
      }
    },
    onSuccess: () => {
    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
    },
  });

  const formSchema = z.object({
    ID: z.number().min(0, { message: "ID must be a non-negative number" }),
    NAME: z.string().min(1, { message: "Name is required" }),
    TYPE_ID: z.number().min(1, { message: "Type ID must be at least 1" }),
    TYPE: z.string().min(1, { message: "Type is required" }),
    SERIAL: z.number().min(1, { message: "Serial must be a valid number" }),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = printEmbProductionOperation;

    const validationResult = formSchema.safeParse(data);

    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error.format());

      const errors = validationResult.error.flatten().fieldErrors;

      Object.entries(errors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          form.setError(field as keyof typeof data, {
            type: "manual",
            message: messages[0],
          });
        }
      });
      return;
    }

    mutation.mutate(data, {
      onSuccess: (_response) => {
        console.log("Mutation successful:", _response);
        getOperation();
        form.reset();
        setPrintEmbProductionOperation({
          ID: 0,
          NAME: "",
          TYPE_ID: 0,
          TYPE: "",
          SERIAL: 0,
        });
      },
      onError: (error) => {
        console.error("Error during mutation:", error);
      },
    });

  }

  const handleDelete = async (id: number) => {
    if (id) {
      const confirmed = window.confirm("Are you sure you want to delete this item?");
      if (confirmed) {
        const response = await axios.delete(api.ProductionUrl + "/production/PrintEmbProductionOperation/" + id);
        console.log(response);
        getOperation();
      }
    }
  };




  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ID: 0,
      NAME: "",
      TYPE_ID: 0,
      TYPE: "",
      SERIAL: 0,
    },
  });

  const axios = useAxiosInstance();
  const api = useApiUrl();

  interface IType {
    ID: number;
    NAME: string;
  };

  interface IOperation {
    ID: number;
    NAME: string;
    TYPE_ID: number;
    SERIAL: number;
    TYPE: string;
  };


  const [productionType, setProductionType] = useState<IType[]>([]);
  const getProductionType = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/PrintEmbProductionType");
    setProductionType(response?.data);
  }

  const [operation, setOperation] = useState<IOperation[]>([]);
  const getOperation = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/PrintEmbProductionOperation");
    setOperation(response?.data);
  }


  useEffect(() => {
    getProductionType();
    getOperation();
  }, []);


  const [openProductionType, setOpenProductionType] = useState(false);

  const [printEmbProductionOperation, setPrintEmbProductionOperation] = useState<PrintEmbProductionOperationType>({
    ID: 0,
    NAME: "",
    TYPE_ID: 0,
    TYPE: "",
    SERIAL: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setPrintEmbProductionOperation((prev) => ({
      ...prev,
      [name]: name === "SERIAL" ? Number(value) : value,
    }));
  };

  return (
    <div className="pt-5">
      <div>
        <Form {...form} >
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
            className=""
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="TYPE"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel className="font-bold">Type</FormLabel>
                    <Popover open={openProductionType} onOpenChange={setOpenProductionType}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openProductionType}
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? productionType?.find(
                                (type) =>
                                  Number(type.ID) === Number(field.value)
                              )?.NAME
                              : "Select a production type"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search production type..." className="h-9" />
                          <CommandList>
                            <CommandEmpty>No production type found.</CommandEmpty>
                            <CommandGroup>
                              {productionType?.map((typeData) => (
                                <CommandItem
                                  value={typeData.NAME}
                                  key={typeData.ID}
                                  onSelect={() => {
                                    field.onChange(Number(typeData.ID));
                                    setPrintEmbProductionOperation((prev) => ({
                                      ...prev,
                                      TYPE_ID: Number(typeData.ID),
                                      TYPE: typeData.NAME,
                                    }));
                                    setOpenProductionType(false);
                                  }}
                                >
                                  {typeData.NAME}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      Number(typeData.ID) === Number(field.value)
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

              {/* Reason Input Field */}
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="NAME"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold mb-0">Operaton</FormLabel>
                      <FormControl className="m-0" onChange={handleInputChange}>
                        <Input
                          style={{ marginTop: "2px" }}
                          placeholder=""
                          {...field}
                          className="form-control h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Quantity Input Field */}
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="SERIAL"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold mb-0">Serial</FormLabel>
                      <FormControl className="m-0" onChange={handleInputChange}>
                        <Input
                          style={{ marginTop: "2px" }}
                          placeholder=""
                          {...field}
                          className="form-control h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mt-1">
              <Button
                type="submit"
              >
                Add
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="mt-3">
        <Table className="min-w-full rounded-md">
          <TableHeader className="bg-green-100 rounded-md">
            <TableRow className=" rounded-md">
              <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                S/L
              </TableHead>
              <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                Type
              </TableHead>
              <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                Name
              </TableHead>
              <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                Serial
              </TableHead>
              <TableHead className="w-[60px] border border-gray-300 text-center px-4 whitespace-nowrap">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              operation?.map((item, index) => <TableRow className="odd:bg-white even:bg-gray-50">
                <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                  {item?.TYPE}
                </TableCell>
                <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                  {item?.NAME}
                </TableCell>
                <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                  {item?.SERIAL}
                </TableCell>
                <TableCell className="border border-gray-300 p-0 m-0 hover:cursor-pointer">
                  <div className="w-full h-full p-0 m-0 flex justify-center">
                    <Trash2Icon
                      size={15}
                      className=" hover:text-red-500"
                      onClick={() => {
                        handleDelete(item.ID);
                      }}
                      style={{ color: "red" }}
                    />
                  </div>
                </TableCell>
              </TableRow>)
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default PrintEmbProductionOperationIndex;
