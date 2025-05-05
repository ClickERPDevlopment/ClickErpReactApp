
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  PrintEmbProductionHourType,
  Save,
} from "@/actions/PrintingEmbroidery/print-emb-production-hour-action";
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
import { z } from "zod";

import useApiUrl from "@/hooks/use-ApiUrl";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";


function PrintEmbProductionHourIndex() {

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
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = printEmbProductionHour;

    console.log("Form data:", data);

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
        getHour();
        form.reset();
        setPrintEmbProductionHour({
          ID: 0,
          NAME: "",
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
        const response = await axios.delete(api.ProductionUrl + "/production/PrintEmbProductionHour/" + id);
        console.log(response);
        getHour();
      }
    }
  };


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ID: 0,
      NAME: "",
    },
  });

  const axios = useAxiosInstance();
  const api = useApiUrl();


  interface IHour {
    ID: number;
    NAME: string;
  };


  const [hour, setHour] = useState<IHour[]>([]);
  const getHour = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/PrintEmbProductionHour");
    setHour(response?.data);
  }


  useEffect(() => {
    getHour();
  }, []);

  const [printEmbProductionHour, setPrintEmbProductionHour] = useState<PrintEmbProductionHourType>({
    ID: 0,
    NAME: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setPrintEmbProductionHour((prev) => ({
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

              {/* name Input Field */}
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="NAME"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold mb-0">Name</FormLabel>
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
                Name
              </TableHead>
              <TableHead className="w-[60px] border border-gray-300 text-center px-4 whitespace-nowrap">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              hour?.map((item, index) => <TableRow className="odd:bg-white even:bg-gray-50">
                <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                  {item?.NAME}
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

export default PrintEmbProductionHourIndex;
