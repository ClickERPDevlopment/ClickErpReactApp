export type FabricBookingReportDto = {
  MaterData: FabricBookingReportDto_MasterData;
  lstSize: FabricBookingReportDto_Size[];
  lstColor: FabricBookingReportDto_Color[];
  lstParts: FabricBookingReportDto_Parts[];
  lstTechnicalSheet: FabricBookingReportDto_TechnicalSheet[];
  lstCuttingAdviceQuantity: FabricBookingReportDto_CuttingAdvice[];
  lstConsumptionPerPcs: FabricBookingReportDto_ConsumptionPerPcs[];
  lstKnittingDyeingAdvice: FabricBookingReportDto_KnittingDyeingAdvice[];
  lstLycraBooking: FabricBookingReportDto_LycraBooking[];
  lstComments: FabricBookingReportDto_Comments[];
  lstSpecialTreatment: FabricBookingReportDto_SpecialTreatment[];
  lstFabric: FabricBookingReportDto_FabricList[];
  lstRevice: FabricBookingReportDto_Revice[];
  lstVerificationStatus: FabricBookingReportDto_VerficationStatus[];
  lstFabricQtyDetails: FabricBookingReportDto_FabricQtyDetails[];
  lstOrderAllComments: FabricBookingReportDto_OrderAllComments[];
  lstInCm: FabricBookingReportDto_InCm[];
  lstColorSizeWiseOrderQty: ColorSizeWiseOrderQty[];
  lstYarnSummary: YarnDetails[];
  lstStripeDetails: StripeDetails[];
};


export type FabricBookingReportDto_MasterData = {
  COMPANY_NAME?: string;
  PONO?: string;
  STYLENAME?: string;
  BUYER_NAME?: string;
  ORDER_QTY?: string;
  BUYERID?: string;
  STYLEID?: string;
  SHIPMENT_DATE?: string;
  SUB_PONO?: string;
  SESSIONNO?: string;
  MASTER_ID?: string;
  CONS_DATE?: string;
  TECHNICAL_SHEET_DATE?: string;
  TECHNICALSHEETNO?: string;
  ASPERLATEST?: string;
  BODY_GSM?: string;
  NECK_RIB_GSM?: string;
  COUNTS?: string;
  FABRIC_TYPE?: string;
  IS_OPEN_DIA?: string;
  REVISED_NO?: string;
  SUB_PONO1?: string;
};

export type StripeMeasurement = {
  YARN_DYEING_COLOR?: string;
  STRIPE_MEASUREMENT?: string;
  YARN_DYEING_REQUIRED: number;
};

export type StripeDetails = StripeMeasurement & {
  FABRIC_PART?: string;
  GMT_COLOR?: string;
  FABRIC_COLOR?: string;
  FABRIC_QTY: number;
  lstDtls: StripeMeasurement[];
};

export type YarnDetails = {
  YARN?: string;
  BOOKING_QTY: number;
};


export type ColorSizeWiseOrderQty = {
  sortingNo: number;
  style?: string;
  color?: string;
  size?: string;
  qty: number;
};


export type FabricBookingReportDto_StyleList = {
  STYLEID: number;
  STYLENO?: string;
  STYLENAME?: string;
};


export type FabricBookingReportDto_Size = {
  SIZEID: number;
  SIZENAME?: string;
  SORTINGNO: number;
};

export type FabricBookingReportDto_Color = {
  COLORID: number;
  COLORNAME?: string;
};

export type FabricBookingReportDto_Parts = {
  ID: number;
  NAME?: string;
};

export type FabricBookingReportDto_TechnicalSheet = {
  TECHNICALSHEETNO?: string;
  SPECID?: number;
  SPE_NAME?: string;
  SIZEID?: number;
  SIZENAME?: string;
  SORTINGNO?: number;
  MEASUREMENT?: string;
  SERIAL_?: string;
};

export type FabricBookingReportDto_CuttingAdvice = {
  BUYERID: number;
  BUYER?: string;
  STYLEID: number;
  STYLENAME?: string;
  COLORID: number;
  COLORNAME?: string;
  SIZEID: number;
  SIZENAME?: string;
  SORTINGNO: number;
  QTY: number;
};

export type FabricBookingReportDto_ConsumptionPerPcs = {
  COLOR_GROUP_ID: number;
  GROUP_NAME?: string;
  GMT_SIZE_ID: number;
  SIZENAME?: string;
  SORTINGNO: number;
  BOOKING_CON_PER_PCS: number;
  CG_SORTING_NO: number;
};

export type FabricBookingReportDto_KnittingDyeingAdvice = {
  MATERIAL_ID: number;
  MTL_NAME?: string;
  COLORNAME?: string;
  SIZENAME?: string;
  QTY: number;
  SORTINGNO: number;
  SORTING: number;
  FABRIC_PART_ID: number;
  FABRIC_PART?: string;
};

export type FabricBookingReportDto_LycraBooking = {
  MATERIAL_ID: number;
  MTL_NAME?: string;
  GMT_COLOR_ID: number;
  COLORNAME?: string;
  GMT_SIZE_ID: number;
  SIZENAME?: string;
  SORTINGNO: number;
  QTY: number;
};

export type FabricBookingReportDto_Comments = {
  ID: number;
  MASTER_ID: number;
  BOMNO?: string;
  BUYER_ID: number;
  PO_ID: number;
  PO_NO?: string;
  STYLE_ID: number;
  COMMENTS?: string;
};

export type FabricBookingReportDto_OrderAllComments = {
  ID?: string;
  MASTER_ID?: string;
  BOMNO?: string;
  BUYER_ID?: string;
  PO_ID?: string;
  PO_NO?: string;
  STYLE_ID?: string;
  COMMENTS?: string;
};

export type FabricBookingReportDto_SpecialTreatment = {
  ID: number;
  MASTER_ID: number;
  SPECIAL_TREATM_ID: number;
  TREATMENT?: string;
};

export type FabricBookingReportDto_FabricList = {
  COM_BOM_PARENTS_MTL_ID: number;
  FABRIC?: string;
};

export type FabricBookingReportDto_Revice = {
  REVICE_NO?: string;
  REVICE_REASON?: string;
  REVICE_DATE?: string;
};

export type FabricBookingReportDto_VerficationStatus = {
  VER_ID?: number;
  DEPARTMENT_NAME?: string;
  USER_FULL_NAME?: string;
  DESIGNATION?: string;
  STATUS?: string;
  COMMENTS?: string;
};

export type FabricBookingReportDto_FabricQtyDetails = {
  PO?: string;
  ARTSTYLE?: string;
  PARTS?: string;
  IS_CONSIDER_AS_RIB_FOR_REPORT?: string;
  FABRICATION?: string;
  YARNCOUNT?: string;
  GMTCOLOR?: string;
  FABRICCOLOR?: string;
  COLORCODE?: string;
  LABREFLD?: string;
  GMT_SIZE?: string;
  QTYPCS?: string;
  FINISHDIA?: string;
  GSM?: string;
  FABRICFORM?: string;
  FABRICW?: string;
  GMTW?: string;
  TOTALFINISHCONJDZN?: string;
  TOTALFINISHFABRICS?: string;
  UOM?: string;
  PCSQTY?: string;
  TOTALYARN?: string;
  SAMPLEFABRICQTY?: string;
  REMARKS?: string;
};

export type FabricBookingReportDto_InCm = {
  ID?: string;
  CONSUMPTION_NUMBER?: string;
  IN_CM?: string;
  JOB_QTY?: string;
  CONSUMPTION_QTY?: string;
  JOB_NUMBER?: string;
};
