/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import DateWiseMCDistributionTable from "./date-wise-mc-distribution-table";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import {
  GetDateWiseMcDistribution,
  Save,
} from "@/actions/Sweater/swt-date-wise-mc-distribution-action";
import useAxiosInstance from "@/lib/axios-instance";
import { SwtMachineGroupType } from "@/actions/Sweater/swt-mc-group-action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppButton } from "@/components/app-buttom";
import { useToast } from "@/components/ui/use-toast";
import { GetAllBrand } from "@/actions/get-brand";
import { GetAllSwtGauge } from "@/actions/Sweater/swt-gauge-action";
import { AxiosError } from "axios";
import AppDatePicker from "../../../components/app-date-picker";
import AppCombobox from "@/components/app-combobox";
import { ComboBoxOptionsType } from "@/app-type";
import { useSwtMcDistributionStore } from "./store-type/date-wise-mc-distribution-store";
import React from "react";

const FormSchema = z.object({
  fromDate: z.date().optional().default(new Date()),
  toDate: z.date().optional().default(new Date()),
  MC_BRAND_ID: z.number().default(0),
  MC_GAUGE_ID: z.number().default(0),
});
type formType = z.infer<typeof FormSchema>;

export default function DateWiseMCDistributionIndex() {
  const store = useSwtMcDistributionStore();
  const [isProgress, setIsProgress] = React.useState(false);
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [lstDate, setLstDate] = React.useState<Date[]>([]);
  const [lstMcGroup, setLstMcGroup] = React.useState<SwtMachineGroupType[]>([]);

  const axios = useAxiosInstance();
  const { toast } = useToast();

  const [brands, setBrands] = React.useState<ComboBoxOptionsType[]>();
  //--

  const [gauges, setGauges] = React.useState<ComboBoxOptionsType[]>();
  //--

  const { data: lstBrand } = GetAllBrand();
  const { data: lstGauge } = GetAllSwtGauge();

  React.useEffect(() => {
    const _: ComboBoxOptionsType[] = [];
    lstBrand?.forEach((ele) => {
      _.push({ label: ele.BRAND_NAME, value: ele.BRAND_ID.toString() });
    });
    setBrands([..._]);
  }, [lstBrand]);

  React.useEffect(() => {
    const _: ComboBoxOptionsType[] = [];
    lstGauge?.forEach((ele) => {
      _.push({ label: ele.GAUGE, value: ele.ID.toString() });
    });
    setGauges([..._]);
  }, [lstGauge]);

  const form = useForm<formType>({
    resolver: zodResolver(FormSchema),
    defaultValues: { fromDate: new Date(), toDate: new Date() },
  });

  async function onSubmit(data: formType) {
    try {
      console.log(data);
      const { fromDate, toDate, MC_GAUGE_ID, MC_BRAND_ID } = data;
      const startDate = moment(fromDate).format("DD-MMM-YY");
      const endDate = moment(toDate).format("DD-MMM-YY");

      setIsPending(true);
      const mcDis = await GetDateWiseMcDistribution(
        startDate,
        endDate,
        MC_GAUGE_ID,
        MC_BRAND_ID,
        axios
      );
      if (mcDis) {
        store.setData(mcDis?.lstSwtDateWiseMCDistribution);
        setLstDate(mcDis?.lstDate);
        setLstMcGroup(mcDis?.lstSwtMachineGroup);
      }
      setIsPending(false);
    } catch (error) {
      console.log(error);
      const err = error as AxiosError;
      toast({
        title: "Some eror happened.",
        variant: "destructive",
        description: `${err.response?.data}`,
      });
      setIsPending(false);
    }
  }

  async function handleMcDistributionChange(
    e: React.ChangeEvent<HTMLInputElement>,
    date: Date,
    mcGroupId: number
  ) {
    e.preventDefault();

    const tempData = store.data?.map((d) => d);

    tempData?.forEach((td) => {
      if (
        td.MC_GROUP_ID === mcGroupId &&
        moment(td.PRODUCTION_DATE).format("DD-MMM-YY") ===
          moment(date).format("DD-MMM-YY")
      ) {
        td.MC_QUANTITY = Number(e.target.value);
      }
    });

    store.setData([...tempData!]);
  }

  async function handleInputMcQtyFromMcGroup_All() {
    const tempData = store.data?.map((d) => d);

    tempData?.forEach((td) => {
      const mcg = lstMcGroup.find((mcg) => mcg.ID === td.MC_GROUP_ID);
      td.MC_QUANTITY = mcg?.NUMBER_OF_MACHINE!;
    });

    store.setData([...tempData!]);
  }

  function handleInputMcQtyFromMcGroup(mcGroupId: number, mcQty: number) {
    const tempData = store.data?.map((d) => d);

    tempData?.forEach((td) => {
      if (td.MC_GROUP_ID === mcGroupId) {
        td.MC_QUANTITY = mcQty;
      }
    });

    store.setData([...tempData!]);
  }

  async function handleSave() {
    try {
      if (store.data) {
        if (store.data.length <= 0) {
          alert("Please input data.");
        }
        console.log(store.data);
        setIsProgress(true);
        await Save(store.data, axios);

        setIsProgress(false);
        store.setData(undefined);
        toast({
          title: "Action Performed successfully",
          variant: "default",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Some Error happended. Please try agin",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container">
      <div className="flex justify-between items-center mt-2">
        <h1 className="font-bold text-xl">Date-wise M/C Distribution</h1>
        <AppButton variant={"save"} onClick={handleSave} isPending={isProgress}>
          Save
        </AppButton>
      </div>

      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="my-5 w-full flex flex-row flex-wrap gap-3 justify-start items-end"
          >
            {/* from-date====================================================================== */}
            <div className="flex justify-between items-end">
              <AppDatePicker form={form} name={"fromDate"} title={"From"} />
            </div>

            {/* to-date========================================================================= */}
            <div className="flex">
              <AppDatePicker form={form} name={"toDate"} title={"To"} />
            </div>

            {/* brand============================================================================ */}
            <div>
              <AppCombobox
                form={form}
                name={"MC_BRAND_ID"}
                options={brands}
                title={"Brand"}
              />
            </div>
            {/* end-brand============== */}

            {/* gauge=========================================================================== */}
            <div className="flex w-48">
              <AppCombobox
                form={form}
                name={"MC_GAUGE_ID"}
                options={gauges}
                title={"Gauge"}
              />
            </div>
            {/* end-gauge============== */}

            <AppButton
              type="submit"
              className="w-20"
              variant={"search"}
              isPending={isPending}
            >
              Search
            </AppButton>
          </form>
        </Form>
      </div>

      {store.data ? (
        <>
          <DateWiseMCDistributionTable
            datesArray={lstDate}
            lstMcGroup={lstMcGroup}
            // lstSwtDateWiseMCDistribution={data}
            // setLstSwtDateWiseMCDistribution={setData}
            handleMcDistributionChange={handleMcDistributionChange}
            handleInputMcQtyFromMcGroup={handleInputMcQtyFromMcGroup}
            handleInputMcQtyFromMcGroup_All={handleInputMcQtyFromMcGroup_All}
          />
        </>
      ) : (
        <div>
          <div className="mt-5">
            <Table>
              <TableHeader>
                <TableRow className="bg-green-300">
                  <TableHead className="bg-green-300 border border-gray-400 text-gray-700 text-center font-bold">
                    MC Group/Date
                  </TableHead>
                  <TableHead className="bg-green-300 border border-gray-400 text-gray-700 min-w-16 text-center font-bold">
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="border border-gray-400 text-gray-700 text-center">
                    ...
                  </TableCell>
                  <TableCell className="border border-gray-400 text-gray-700 text-center">
                    ...
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400 text-gray-700 text-center">
                    ...
                  </TableCell>
                  <TableCell className="border border-gray-400 text-gray-700 text-center">
                    ...
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400 text-gray-700 text-center">
                    ...
                  </TableCell>
                  <TableCell className="border border-gray-400 text-gray-700 text-center">
                    ...
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
