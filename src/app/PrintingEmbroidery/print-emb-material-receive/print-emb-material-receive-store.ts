import { create } from "zustand";

export interface ISearchData {
  FROM_DATE: Date;
  TO_DATE: Date;
  WORK_ORDER_ID: number;
  WORK_ORDER_NO: string;
  WORK_ORDER_RECEIVE_ID: number;
  WORK_ORDER_RECEIVE_NO: string;
  BUYER_ID: number;
  BUYER: string;
  STYLE_ID: number;
  STYLE: string;
  PO_ID: number;
  PO_NO: string;
}

interface SearchStore {
  searchData: ISearchData;
  setField: <K extends keyof ISearchData>(key: K, value: ISearchData[K]) => void;
  setAll: (data: Partial<ISearchData>) => void;
  reset: () => void;
}

const today = new Date();
const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

const initialState: ISearchData = {
  FROM_DATE: firstOfMonth,
  TO_DATE: today,
  WORK_ORDER_ID: 0,
  WORK_ORDER_NO: "",
  WORK_ORDER_RECEIVE_ID: 0,
  WORK_ORDER_RECEIVE_NO: "",
  BUYER_ID: 0,
  BUYER: "",
  STYLE_ID: 0,
  STYLE: "",
  PO_ID: 0,
  PO_NO: "",
};

export const usePrintEmbMaterialSearchStore = create<SearchStore>((set) => ({
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
