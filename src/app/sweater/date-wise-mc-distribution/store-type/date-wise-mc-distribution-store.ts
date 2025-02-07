import { create } from "zustand";

import { SwtDateWiseMCDistributionType } from "src/actions/Sweater/swt-date-wise-mc-distribution-action";

type storeType = {
  data: SwtDateWiseMCDistributionType[];
  setData: (formData: SwtDateWiseMCDistributionType[] | undefined) => void;

  isTrInDialogOpen: boolean;
  setIsTrInDialogOpen: (isTrInDialogOpen: boolean) => void;

  isTrOutDialogOpen: boolean;
  setIsTrOutDialogOpen: (isTrOutDialogOpen: boolean) => void;
};

export const useSwtMcDistributionStore = create<storeType>((set) => ({
  data: [],
  setData: (data: SwtDateWiseMCDistributionType[] | undefined) => set({ data }),

  isTrInDialogOpen: false,
  setIsTrInDialogOpen: (isTrInDialogOpen: boolean) => set({ isTrInDialogOpen }),

  isTrOutDialogOpen: false,
  setIsTrOutDialogOpen: (isTrOutDialogOpen: boolean) =>
    set({ isTrOutDialogOpen }),
}));
