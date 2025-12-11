import { create } from "zustand";

export interface ISearchData {
  FROM_DATE: string;
  TO_DATE: string;
  BUYER_ID: number;
  BUYER: string;
  STYLE_ID: number;
  STYLE: string;
  PO_ID: number;
  PO_NO: string;
  TYPE_ID: number;
  TYPE: string;
  WORK_ORDER_ID: number,
  WORK_ORDER_NO: string,
}

interface SearchStore {
  searchData: ISearchData;
  setField: <K extends keyof ISearchData>(key: K, value: ISearchData[K]) => void;
  setAll: (data: Partial<ISearchData>) => void;
  reset: () => void;
}

const toDate = new Date();
const fromDate = new Date();
fromDate.setDate(toDate.getDate() - 7);

const initialState: ISearchData = {
  FROM_DATE: fromDate.toLocaleDateString("en-CA"),
  TO_DATE: toDate.toLocaleDateString("en-CA"),
  WORK_ORDER_ID: 0,
  WORK_ORDER_NO: "",
  BUYER_ID: 0,
  BUYER: "",
  STYLE_ID: 0,
  STYLE: "",
  PO_ID: 0,
  PO_NO: "",
  TYPE_ID: 0,
  TYPE: "",
};

export const usePrintEmbProductionSearchStore = create<SearchStore>((set) => ({
  searchData: initialState,

  setField: (key, value) =>
    set((state) => ({
      searchData: { ...state.searchData, [key]: value },
    })),

  setAll: (data) =>
    set((state) => ({
      searchData: { ...state.searchData, ...data },
    })),

  reset: () => set({ searchData: initialState }),
}));
