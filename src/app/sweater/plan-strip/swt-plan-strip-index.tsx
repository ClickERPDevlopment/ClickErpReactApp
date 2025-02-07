import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import {
  useForm,
  useFieldArray,
  useWatch,
  Control,
  Controller,
} from "react-hook-form";
import { Button } from "src/components/ui/button";
import { FormItem } from "src/components/ui/form";
import { Input } from "src/components/ui/input";
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
import { z } from "zod";
import SwtPlanStripSearchForm from "./components/swt-plan-strip-search-from";
import { useSwtPlanStripStore } from "./components/swt-plan-strip-store";
import { GetAllSwtGauge } from "src/actions/Sweater/swt-gauge-action";
import SwtPlanStripForm from "./swt-plan-strip-table-form";
import AppDialog from "../../../components/app-dialog";
import { BrandSmvLcDialogForm } from "./components/brand-smv-lc-dialog-form";
import { BrandSmvLcDialog } from "./components/brand-smv-lc-dialog";
import { ExtraPercentageSetForm } from "./components/extra-perc-set-form";

// import Select from "react-select";

export default function SwtPlanStripIndex() {
  const store = useSwtPlanStripStore();
  localStorage.setItem("companyId", "2");
  return (
    <>
      <h1 className="font-bold text-2xl mt-1 mb-3">Plan Strip</h1>
      <div>
        <SwtPlanStripSearchForm />
      </div>
      <div>
        <SwtPlanStripForm />
      </div>

      <AppDialog
        isOpen={store.openDialog}
        onClose={() => store.setOpenDialog(false)}
        title="Add strip other info"
        description="M/C Brand || SMV || Learning Curve"
      >
        <BrandSmvLcDialog />
      </AppDialog>
      <AppDialog
        isOpen={store.openExtraPercDialog}
        onClose={() => store.setOpenExtraPercDialog(false)}
        title="Set extra Qty for all strip"
        description="If apply button is clicked the percentage will apply to all strips"
      >
        <ExtraPercentageSetForm />
      </AppDialog>
    </>
  );
}
