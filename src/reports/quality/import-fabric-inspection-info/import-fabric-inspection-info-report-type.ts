export interface IImportFabricInspectionInfo {
  ID: number;
  ENTRY_DATE: Date;
  ENTRY_NO: string;
  INSPECTION_DATE: Date;
  BUYER_ID: number;
  WORKORDER_ID: number;
  CREATED_BY: string;
  CREATED_DATE: Date;
  UPDATED_BY: string;
  UPDATED_DATE: Date;
  CHALLAN_ID: number;
  IS_BLOCK_FABRIC: string;
  MASTER_ID: number;
  STYLE_ID: number;
  FABRIC_ID: number;
  COLOR_ID: number;
  FABRIC_LOT_ID: number;
  TOTAL_ROLL: number;
  CHECK_ROLL: number;
  CHECK_QTY: number;
  REMARKS: string;
  SHADE_SUBMIT_DATE: Date;
  SHADE_APPROVAL_DATE: Date;
  WORKORDER_NO: string;
  CHALLAN_NO: string;
  NAME: string;
  FABRIC_NAME: string;
  STYLE_NO: string;
  COLOR: string;
  LOT_NO: string;
  FABRIC_SUBGROUP: string;
  UOM: string;
  DEFECT_NAME: string;
  BALANCE_QTY: number;
}
