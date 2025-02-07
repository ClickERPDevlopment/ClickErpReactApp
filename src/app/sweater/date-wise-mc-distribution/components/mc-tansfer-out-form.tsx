/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppButton } from "@/components/app-buttom";
import { GetSimilarMcGroup } from "@/actions/Sweater/swt-mc-group-action";
import AppDatePicker from "@/components/app-date-picker";
import AppCombobox from "@/components/app-combobox";
import { ComboBoxOptionsType } from "@/app-type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  TransferOutAddFormType,
  TransferOutFormType,
  TransferOutAddFormSchema,
  transferOutFormSchema,
} from "../store-type/date-wise-mc-distribution-types";
import { useSwtMcDistributionStore } from "../store-type/date-wise-mc-distribution-store";
import React from "react";

export interface Props {
  selectedMcGroupId: number | undefined;
  firstDate: Date;
  lastDate: Date;
}

export default function McTransferOutForm({
  selectedMcGroupId,
  firstDate,
  lastDate,
}: Props) {
  const store = useSwtMcDistributionStore();
  const [mcGroups, setMcGroups] = React.useState<ComboBoxOptionsType[]>();

  const { data: lstMcGroup } = GetSimilarMcGroup(selectedMcGroupId!);

  React.useEffect(() => {
    const lsMcG: ComboBoxOptionsType[] = [];
    lstMcGroup?.forEach((_) => {
      lsMcG.push({
        label: _.GROUP_NAME,
        value: _.ID.toString(),
      });
    });
    setMcGroups([...lsMcG]);
  }, [lstMcGroup]);

  const addForm = useForm<TransferOutAddFormType>({
    resolver: zodResolver(TransferOutAddFormSchema),
    defaultValues: {
      MC_QTY: Number(0),
    },
  });

  const form = useForm<TransferOutFormType>({
    resolver: zodResolver(transferOutFormSchema),
    defaultValues: {
      fromDate: new Date(firstDate),
      toDate: new Date(lastDate),
      FROM_MC_GROUP_ID: selectedMcGroupId,
      details: [],
    },
  });

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    name: "details",
    control,
  });

  function handleAddSubmit(data: TransferOutAddFormType) {
    // alert(JSON.stringify(data));
    append({
      TO_MC_GROUP_ID: data.TO_MC_GROUP_ID,
      TO_MC_GROUP: lstMcGroup?.find((g) => g.ID === data.TO_MC_GROUP_ID)
        ?.GROUP_NAME!,
      MC_QTY: data.MC_QTY,
    });
  }

  function onSubmit(data: TransferOutFormType) {
    console.log("Submitted Data:", data);

    try {
      const tempData = store.data.map((d) => d);

      data.details.forEach((element) => {
        tempData.forEach((d) => {
          //decrese from m/c qty
          if (
            new Date(d.PRODUCTION_DATE) >= new Date(data.fromDate) &&
            new Date(d.PRODUCTION_DATE) <= new Date(data.toDate) &&
            d.MC_GROUP_ID === element.TO_MC_GROUP_ID
          ) {
            d.MC_QUANTITY = d.MC_QUANTITY + element.MC_QTY;
          }
          //increase to m/c qty
          if (
            new Date(d.PRODUCTION_DATE) >= new Date(data.fromDate) &&
            new Date(d.PRODUCTION_DATE) <= new Date(data.toDate) &&
            d.MC_GROUP_ID === data.FROM_MC_GROUP_ID
          ) {
            d.MC_QUANTITY = d.MC_QUANTITY - element.MC_QTY;
          }
        });
      });

      store.setData([...tempData]);
      store.setIsTrInDialogOpen(false);
      store.setIsTrOutDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form {...addForm}>
        <form
          onSubmit={addForm.handleSubmit(handleAddSubmit)}
          className="space-y-2"
        >
          <div className="flex">
            {/* mc-group============================================================================ */}
            <div className="flex flex-col flex-1 gap-1  w-6/12 pr-2">
              <FormLabel className="mt-2 w-24 pl-2">M/C Group</FormLabel>
              <AppCombobox
                form={addForm}
                name={"TO_MC_GROUP_ID"}
                options={mcGroups}
                title={""}
              />
            </div>
            {/* end-brand============== */}
            {/* mc qty */}
            <div className="flex justify-between items-end">
              <FormField
                control={addForm.control}
                name="MC_QTY"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1 gap-1">
                    <FormLabel className="mt-2 w-24">M/C Qty</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter m/c qty"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* end- mc-qty */}
          </div>

          {/* Actions */}
          <div className="flex justify-end">
            <AppButton type="submit" variant={"add"}>
              Add
            </AppButton>
          </div>
        </form>
      </Form>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="FROM_MC_GROUP_ID"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel className="mt-2 w-24">To M/C Group</FormLabel>
                <FormControl>
                  <Input placeholder="Enter m/c qty" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* details============================================================================ */}
          <div className="flex flex-row flex-1 gap-1 h-40  border p-1 rounded-md">
            <Table>
              <TableHeader className="sticky top-0 z-10">
                <TableRow className="bg-green-200">
                  <TableHead className="w-[100px] border border-gray-400 m-0 py-1 px-1 text-center hidden">
                    M/C Group Id
                  </TableHead>
                  <TableHead className="w-[100px] border border-gray-400 m-0 py-1 px-1 text-center">
                    M/C Group
                  </TableHead>
                  <TableHead className="w-[100px] border border-gray-400 m-0 py-1 px-1 text-center">
                    Quantity
                  </TableHead>
                  <TableHead className="border border-gray-400 m-0 py-1 px-1 text-center w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => {
                  return (
                    <TableRow key={field.id}>
                      <TableCell className="font-medium border border-gray-400 m-0 py-1 px-1 hidden">
                        <FormField
                          control={form.control}
                          name={`details.${index}.TO_MC_GROUP_ID`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="name"
                                  {...field}
                                  className="border-0 ring-0 outline-0 h-6 focus-visible:ring-0 disabled:opacity-80 text-center"
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>

                      <TableCell className="font-medium border border-gray-400 m-0 p-0 px-1">
                        <FormField
                          control={form.control}
                          name={`details.${index}.TO_MC_GROUP`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="name"
                                  {...field}
                                  className="border-0 ring-0 outline-0 h-6 focus-visible:ring-0 disabled:opacity-80 text-center"
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>

                      <TableCell className="font-medium border border-gray-400 m-0 p-0 px-1">
                        <FormField
                          control={form.control}
                          name={`details.${index}.MC_QTY`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="name"
                                  {...field}
                                  className="border-0 ring-0 outline-0 h-6 focus-visible:ring-0 disabled:opacity-80 text-center"
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>

                      <TableCell className="text-center border border-gray-400 m-0 p-0 px-2">
                        <div className="p-1 flex justify-center items-center">
                          <TrashIcon
                            cursor={"pointer"}
                            className="text-destructive  hover:bg-red-200 rounded-full m-0 p-0"
                            width={20}
                            height={20}
                            onClick={() => remove(index)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          {/* end-details */}

          <div className="flex">
            {/* from-date==================================================================================== */}
            <div className="flex flex-col flex-1 gap-1 w-6/12 pr-2">
              <FormLabel className="mt-2 pl-2 w-24">From</FormLabel>
              <AppDatePicker form={form} name={"fromDate"} title={""} />
            </div>

            {/* to-date==================================================================================== */}
            <div className="flex flex-col flex-1 gap-1 w-6/12">
              <FormLabel className="mt-2 pl-2 w-24">To</FormLabel>
              <AppDatePicker form={form} name={"toDate"} title={""} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-2">
            <AppButton type="submit" variant={"save"}>
              Change
            </AppButton>
          </div>
        </form>
      </Form>
    </>
  );
}
