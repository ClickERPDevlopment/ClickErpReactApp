/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

type appStoreType = {
  openConfirmationDialog: boolean;
  confirmationDialogCallBackFunc: ((...args: any[]) => void) | null;
  setOpenConfirmationDialog: (callback: (...args: any[]) => void) => void;
  resetConfirmationDialogCallBackFunc: () => void;
  //-------------------------------------------------------------
  openErrorDialog: boolean;
  setOpenErrorDialog: (openDialog: boolean) => void;
};

export const useAppStore = create<appStoreType>((set) => ({
  openConfirmationDialog: false,
  confirmationDialogCallBackFunc: null,
  setOpenConfirmationDialog: (callback) =>
    set({
      confirmationDialogCallBackFunc: callback,
      openConfirmationDialog: true,
    }),
  resetConfirmationDialogCallBackFunc: () =>
    set({
      confirmationDialogCallBackFunc: null,
      openConfirmationDialog: false,
    }),
  //-------------------------------------------------------------
  openErrorDialog: false,
  setOpenErrorDialog: (openDialog: boolean) =>
    set({ openConfirmationDialog: openDialog }),
}));
