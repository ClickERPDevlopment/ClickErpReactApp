import { ChevronDown } from "lucide-react";
import moment from "moment";
import React, { Dispatch, SetStateAction } from "react";
import { SwtMachineGroupType } from "src/actions/Sweater/swt-mc-group-action";
import { Button } from "src/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { Input } from "src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/table";
import AppDialog from "../../../components/app-dialog";
import McTransferInForm from "./components/mc-tansfer-in-form";
import { useSwtMcDistributionStore } from "./store-type/date-wise-mc-distribution-store";
import McTransferOutForm from "./components/mc-tansfer-out-form";

export default function DateWiseMCDistributionTable(props: {
  datesArray: Date[];
  lstMcGroup: SwtMachineGroupType[];
  handleMcDistributionChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    date: Date,
    mcGroupId: number
  ) => void;
  handleInputMcQtyFromMcGroup: (mcGroupId: number, mcQty: number) => void;
  handleInputMcQtyFromMcGroup_All: () => void;
}) {
  const store = useSwtMcDistributionStore();
  const [selectedMCGroupId, setSelectedMCGroupId] = React.useState<number>();
  const [selectedMCGroup, setSelectedMCGroup] =
    React.useState<SwtMachineGroupType>();

  const [isTrInDialogOpen, setIsTrInDialogOpen] = React.useState(false);
  const [isTrOutDialogOpen, setIsTrOutDialogOpen] = React.useState(false);

  React.useEffect(() => {
    if (selectedMCGroupId) {
      setSelectedMCGroup(
        props.lstMcGroup.find((mcg) => mcg.ID === selectedMCGroupId)
      );
    }
  }, [props.lstMcGroup, selectedMCGroupId]);

  // function handleTrFormSubmit(data: formType) {
  //   console.log("Submitted Data:", data);

  //   try {
  //     const tempData = props.lstSwtDateWiseMCDistribution.map((d) => d);

  //     data.details.forEach((element) => {
  //       tempData.forEach((d) => {
  //         if (
  //           new Date(d.PRODUCTION_DATE) >= new Date(data.fromDate) &&
  //           new Date(d.PRODUCTION_DATE) <= new Date(data.toDate) &&
  //           d.MC_GROUP_ID === element.FROM_MC_GROUP_ID
  //         ) {
  //           d.MC_QUANTITY = d.MC_QUANTITY - element.MC_QTY;
  //         }
  //         if (
  //           new Date(d.PRODUCTION_DATE) >= new Date(data.fromDate) &&
  //           new Date(d.PRODUCTION_DATE) <= new Date(data.toDate) &&
  //           d.MC_GROUP_ID === data.TO_MC_GROUP_ID
  //         ) {
  //           d.MC_QUANTITY = d.MC_QUANTITY + element.MC_QTY;
  //         }
  //       });
  //     });

  //     props.setLstSwtDateWiseMCDistribution([...tempData]);
  //     setIsTrInDialogOpen(false); // Close dialog after successful form submission
  //     setIsTrOutDialogOpen(false); // Close dialog after successful form submission
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div>
      <div className="mt-5">
        <Table className="">
          <TableHeader className="bg-green-300 ">
            <TableRow className="">
              <TableHead className="border border-gray-400 text-gray-700 text-center font-bold hover:bg-green-300">
                <MainDropDownMenu
                  title="MC Group"
                  handleInputMcQtyFromMcGroup_All={
                    props.handleInputMcQtyFromMcGroup_All
                  }
                />
              </TableHead>
              <TableHead className="border border-gray-400 text-gray-700 text-center font-bold hover:bg-green-300">
                MC Gauge
              </TableHead>
              <TableHead className="border border-gray-400 text-gray-700 text-center font-bold hover:bg-green-300">
                MC Brand
              </TableHead>
              <TableHead className="border border-gray-400 text-gray-700 text-center font-bold hover:bg-green-300">
                MC Qty
              </TableHead>
              {props.datesArray.map((d) => (
                <TableHead
                  key={`header-${moment(d).format("DD-MMM")}`}
                  className="border border-gray-400 text-gray-700 min-w-16 text-center font-bold"
                >
                  {moment(d).format("DD-MMM")}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.lstMcGroup.map((mcg) => (
              <TableRow key={`row-${mcg.ID}`}>
                <TableCell className="border border-gray-400 text-gray-700 text-center m-0 p-0">
                  <RowDropDownMenu
                    title={mcg.GROUP_NAME}
                    mcGroupId={mcg.ID}
                    mcQty={mcg.NUMBER_OF_MACHINE}
                    handleInputMcQtyFromMcGroup={
                      props.handleInputMcQtyFromMcGroup
                    }
                    setTransferInDialogOpen={setIsTrInDialogOpen}
                    setTransferOutDialogOpen={setIsTrOutDialogOpen}
                    setSelectedMCGroup={setSelectedMCGroupId}
                  />
                </TableCell>
                <TableCell className="border border-gray-400 text-gray-700 text-center m-0 p-0 whitespace-nowrap">
                  {mcg.MC_GAUGE}
                </TableCell>
                <TableCell className="border border-gray-400 text-gray-700 text-center m-0 p-0 whitespace-nowrap">
                  {mcg.MC_BRAND}
                </TableCell>
                <TableCell className="border border-gray-400 text-gray-700 text-center m-0 p-0">
                  {mcg.NUMBER_OF_MACHINE}
                </TableCell>
                {props.datesArray.map((date) => (
                  <TableCell
                    key={`cell-${mcg.ID}-${moment(date).format("DD-MMM")}`}
                    className="border border-gray-400 text-gray-700 m-0 p-0"
                  >
                    <Input
                      className="text-center outline-none border-none m-0 bg-yellow-100 focus:bg-yellow-200 rounded-none w-full"
                      value={
                        store.data.find(
                          (mcDis) =>
                            mcDis.MC_GROUP_ID === mcg.ID &&
                            moment(mcDis.PRODUCTION_DATE).format(
                              "DD-MMM-YY"
                            ) === moment(date).format("DD-MMM-YY")
                        )?.MC_QUANTITY
                      }
                      onChange={(e) =>
                        props.handleMcDistributionChange(e, date, mcg.ID)
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="text-green-600">
            <TableRow>
              <TableHead
                colSpan={4}
                className="border border-gray-400 text-green-600 text-center font-bold"
              >
                Total
              </TableHead>
              {props.datesArray.map((d) => (
                <TableHead
                  key={`totalCell-${moment(d).format("DD-MMM")}`}
                  className="text-center border border-gray-400 text-green-600 font-bold"
                >
                  {store.data
                    .filter(
                      (f) =>
                        moment(d.toString()).format("DD-MMM-YY") ===
                        moment(f.PRODUCTION_DATE).format("DD-MMM-YY")
                    )
                    .reduce((p, c) => p + c.MC_QUANTITY, 0)}
                </TableHead>
              ))}
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div>
        {/* Reusable Dialog with CustomForm as child */}
        <AppDialog
          isOpen={isTrInDialogOpen}
          onClose={() => setIsTrInDialogOpen(false)}
          title={`M/C Transfer-in: "${selectedMCGroup?.GROUP_NAME}"`}
          description={`Machine will add in this selected m/c group(${selectedMCGroup?.GROUP_NAME}) from other group.`}
        >
          <Table className="w-full bg-green-200 rounded-lg m-0 mb-2">
            <TableHeader>
              <TableRow className="border-green-600 border-b-4">
                <TableHead
                  colSpan={3}
                  className="text-black font-bold text-center"
                >
                  Selected M/C Group Details
                </TableHead>
              </TableRow>
              <TableRow className="border-green-400">
                <TableHead className="text-black font-bold text-center">
                  M/C Group
                </TableHead>
                <TableHead className="text-black font-bold text-center">
                  M/C Gauge
                </TableHead>
                <TableHead className="text-black font-bold text-center">
                  M/C Brad
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">
                  {selectedMCGroup?.GROUP_NAME}
                </TableCell>
                <TableCell className="text-center">
                  {/* {selectedMCGroup?.MC_GAUGE} */}
                </TableCell>
                <TableCell className="text-center">
                  {selectedMCGroup?.MC_BRAND}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <McTransferInForm
            selectedMcGroupId={selectedMCGroupId}
            firstDate={props.datesArray[0]}
            lastDate={props.datesArray[props.datesArray.length - 1]}
          />
        </AppDialog>
        <AppDialog
          isOpen={isTrOutDialogOpen}
          onClose={() => setIsTrOutDialogOpen(false)}
          title={`M/C Transfer-out: "${selectedMCGroup?.GROUP_NAME}"`}
          description={`Machine will out from this selected m/c group(${selectedMCGroup?.GROUP_NAME}) to other group.`}
        >
          <Table className="w-full bg-green-200 rounded-lg m-0 mb-2">
            <TableHeader>
              <TableRow className="border-green-600 border-b-4">
                <TableHead
                  colSpan={3}
                  className="text-black font-bold text-center"
                >
                  Selected M/C Group Details
                </TableHead>
              </TableRow>
              <TableRow className="border-green-400">
                <TableHead className="text-black font-bold text-center">
                  M/C Group
                </TableHead>
                <TableHead className="text-black font-bold text-center">
                  M/C Gauge
                </TableHead>
                <TableHead className="text-black font-bold text-center">
                  M/C Brad
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">
                  {selectedMCGroup?.GROUP_NAME}
                </TableCell>
                <TableCell className="text-center">
                  {/* {selectedMCGroup?.MC_GAUGE} */}
                </TableCell>
                <TableCell className="text-center">
                  {selectedMCGroup?.MC_BRAND}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <McTransferOutForm
            selectedMcGroupId={selectedMCGroupId}
            firstDate={props.datesArray[0]}
            lastDate={props.datesArray[props.datesArray.length - 1]}
          />
        </AppDialog>
      </div>
    </div>
  );
}

export function MainDropDownMenu({
  title,
  handleInputMcQtyFromMcGroup_All,
}: {
  title: string;
  handleInputMcQtyFromMcGroup_All: () => void;
}) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full m-0 p-0 font-bold hover:bg-green-300"
          >
            {/* <span className="sr-only">{title}</span> */}
            {title}
            {/* <DotsHorizontalIcon className="h-4 w-4" /> */}
            <ChevronDown size={16} className="ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{title}</DropdownMenuLabel>
          {/* <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(gauge.ID.toString())}
          >
            Copy Gauge Id
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleInputMcQtyFromMcGroup_All}
          >
            Input M/C Qty from M/C Group for selected date
          </DropdownMenuItem>
          {/* <DropdownMenuItem
            className="cursor-pointer"
            // onClick={() =>
            //   location.pathname.includes("win/")
            //     ? navigate(`/win/sweater/gauge/${PageAction.edit}/${gauge.ID}`)
            //     : navigate(
            //         `/dashboard/sweater/gauge/${PageAction.edit}/${gauge.ID}`
            //       )
            // }
          >
            Transfer M/C Qty
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function RowDropDownMenu({
  title,
  mcGroupId,
  mcQty,
  handleInputMcQtyFromMcGroup,
  setTransferInDialogOpen,
  setTransferOutDialogOpen,
  setSelectedMCGroup,
}: {
  title: string;
  mcGroupId: number;
  mcQty: number;
  handleInputMcQtyFromMcGroup: (mcGroupId: number, mcQty: number) => void;
  setTransferInDialogOpen: Dispatch<SetStateAction<boolean>>;
  setTransferOutDialogOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedMCGroup: Dispatch<SetStateAction<number | undefined>>;
}) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full m-0 p-0">
            {/* <span className="sr-only">{title}</span> */}
            {title}
            {/* <DotsHorizontalIcon className="h-4 w-4" /> */}
            <ChevronDown size={16} className="ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{title}</DropdownMenuLabel>
          {/* <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(gauge.ID.toString())}
          >
            Copy Gauge Id
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleInputMcQtyFromMcGroup(mcGroupId, mcQty)}
          >
            Input M/C Qty from this M/C Group for selected date
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setSelectedMCGroup(mcGroupId);
              setTransferInDialogOpen(true);
            }}
          >
            Transfer-in (M/C Qty)
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setSelectedMCGroup(mcGroupId);
              setTransferOutDialogOpen(true);
            }}
          >
            Transfer-out (M/C Qty)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
