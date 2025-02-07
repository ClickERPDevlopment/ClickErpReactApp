import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "src/components/ui/button";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComboBoxOptionsType } from "src/app-type";
import { GetAllBrand } from "src/actions/get-brand";
import { GetAllLearningCurve } from "src/actions/Configurations/learning-curve-action";
import { BrandSmvLcDialogForm } from "./brand-smv-lc-dialog-form";
import { BrandSmvLcDialogTable } from "./brand-smv-lc-dialog-table";
import { useSwtPlanStripStore } from "./swt-plan-strip-store";
import { AppButton } from "src/components/app-buttom";

const FormSchema = z.object({
  brandId: z.coerce.number().gte(1, "Please select a brand."),
  learningCurveId: z.coerce.number().gte(1, "Please select a learning curve."),
  smv: z.coerce.number().positive("Please enter a positive number."),
});

export function BrandSmvLcDialog() {
  const store = useSwtPlanStripStore();
  const [brands, setBrands] = React.useState<ComboBoxOptionsType[]>([]);
  const [openBrand, setOpenBrand] = React.useState(false);

  const [learningCurves, setLearningCurves] = React.useState<
    ComboBoxOptionsType[]
  >([]);
  const [openLearningCurve, setOpenLearningCurve] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { smv: 0 },
  });

  const { data: lstBrand } = GetAllBrand();
  const { data: lstLearningCurve } = GetAllLearningCurve();
  React.useEffect(() => {
    if (lstBrand) {
      const brandList = lstBrand.map((brand) => {
        return {
          label: brand.BRAND_NAME,
          value: brand.BRAND_ID?.toString(),
        };
      });
      setBrands(brandList);
    }
  }, [lstBrand]);

  React.useEffect(() => {
    if (lstLearningCurve) {
      const learningCurveList = lstLearningCurve.map((learningCurve) => {
        return {
          label: learningCurve.NAME,
          value: learningCurve.ID.toString(),
        };
      });
      setLearningCurves(learningCurveList);
    }
  }, [lstLearningCurve]);

  function handleSubmit() {
    store.setIsLstDetailsChanged(true);
    store.setOpenDialog(false);
  }

  return (
    <>
      <BrandSmvLcDialogForm />
      <BrandSmvLcDialogTable />
      <div className="flex justify-between">
        <Button
          type="submit"
          className="align-middle w-20"
          variant={"destructive"}
          onClick={() => store.setOpenDialog(false)}
        >
          Cancel
        </Button>
        <AppButton
          type="submit"
          className="align-middle w-20"
          onClick={handleSubmit}
          variant={"save"}
        >
          Apply
        </AppButton>
      </div>
    </>
  );
}
