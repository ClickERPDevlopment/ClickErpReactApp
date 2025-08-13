export type IAtoZReportGmt = {
  JOB_PO_ID: number;
  PO_ID: number;
  PONO: string;
  STYLE_ID: number;
  STYLENO: string;
  COLOR_NAME: string;
  PO_QTY: number;
  //CUTTING===============
  CUTTING_QTY: number;
  CUTTING_BALANCE: number;
  CUTTING_PES: number;
  //INPUT===============
  INPUT_QTY: number;
  INPUT_READY_QTY: number;
  //SEWING===============
  SEWING_OUTPUR_QTY: number;
  SEWING_WIP: number;
  //FINISHING===============
  FINISHING_Input: number;
  FINISHING_Output: number;
  FINISHING_WIP: number;
  //PACKING===============
  PACKING_Input: number;
  PACKING_Output: number;
  PACKING_WIP: number;
  //SHIPPING===============
  SHIPPING_QTY: number;
  SHIPPING_BALANCE: number;
  //===============

  CUT_TO_SHIP_PERCENTAGE: number;
};
