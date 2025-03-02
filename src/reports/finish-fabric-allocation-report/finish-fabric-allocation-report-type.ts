export type FinishFabricAllocatinReportMasterType = {
  COMPANY_NAME: string;
  COMPANY_ADDRESS: string;

  SUPPLIER: string;
  WO_ID: number;
  WORK_ORDER_NO: string;
  ORDER_REFERENCE: string;
  FABRIC_ID: number;
  FABRIC: string;
  GMT_COLOR_ID: number;
  MTL_COLOR: string;
  WO_QTY: number;
  RECEIVE_QTY: number;
  ALLOCATED_QTY: number;
  STOCK: number;

  BUYER_ID: number;
  BUYER: string;

  STYLE_ID: number;
  STYLENO: string;
  PINO: string;

  UOM_ID: number;
  UOM: string;

  CONSUMPTION_PER_DZN: string;
  RET_QTY: number;
};

export type FinishFabricAllocatinReportDetailsType = {
  BLOCK_WORK_ORDER_ID: number;
  FABRIC_ID: number;
  FABRIC_COLOR_ID: number;
  STOCK_FABRIC_COLOR_ID: number;
  PO_ID: number;
  PONO: string;
  STYLE_ID: number;
  STYLENO: string;
  ORDER_REFERENCE: string;
  ALLOCATED_QTY: number;
  REQUIRED_QTY: number;
  ALLOCATION_BALANCE: number;
};
