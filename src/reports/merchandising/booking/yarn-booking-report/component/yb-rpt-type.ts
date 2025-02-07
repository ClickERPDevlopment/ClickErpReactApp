type YarnBookingReportDto = {
  knittingSizeNameList: string[];
  sizeNameList: string[];
  colorNameList: string[];
  MaterData: YarnBookingReportDto_MasterData;
  StyleImage: YarnBookingReportDto_StyleImage;
  lstSize: YarnBookingReportDto_Size[];
  lstColor: YarnBookingReportDto_Color[];
  lstParts: YarnBookingReportDto_Parts[];
  lstTechnicalSheet: YarnBookingReportDto_TechnicalSheet[];
  lstCuttingAdviceQuantity: YarnBookingReportDto_CuttingAdviceQuantity[];
  lstConsumptionPerPcs: YarnBookingReportDto_ConsumptionPerPcs[];
  lstKnittingDyeingAdvice: YarnBookingReportDto_KnittingDyeingAdvice[];
  lstLycraBooking: YarnBookingReportDto_LycraBooking[];
  lstComments: YarnBookingReportDto_Comments[];
  lstSpecialTreatment: YarnBookingReportDto_SpecialTreatment[];
  lstFabric: YarnBookingReportDto_FabricList[];
  lstRevice: YarnBookingReportDto_Revice[];
  lstVerificationStatus: YarnBookingReportDto_VerficationStatus[];
};

type YarnBookingReportDto_StyleList = {
  STYLEID: number;
  STYLENO: string;
  STYLENAME: string;
};

type YarnBookingReportDto_MasterData = {
  COMPANY_NAME: string;
  PONO: string;
  STYLENAME: string;
  BUYER_NAME: string;
  ORDER_QTY: number;
  BUYERID: number;
  STYLEID: number;
  SESSIONNO: string;
  MASTER_ID: number;
  CONS_DATE: string;
  TECHNICAL_SHEET_DATE: string;
  TECHNICALSHEETNO: string;
  ASPERLATEST: string;
  BODY_GSM: string;
  NECK_RIB_GSM: string;
  COUNTS: string;
  FABRIC_TYPE: string;
  IS_OPEN_DIA: string;
  REVISED_NO: string;
};

type YarnBookingReportDto_StyleImage = {
  IMAGE: string;
};

type YarnBookingReportDto_Size = {
  SIZEID: number;
  SIZENAME: string;
  SORTINGNO: number;
};

type YarnBookingReportDto_Color = {
  COLORID: number;
  COLORNAME: string;
};

type YarnBookingReportDto_Parts = {
  ID: number;
  NAME: string;
};

type YarnBookingReportDto_TechnicalSheet = {
  TECHNICALSHEETNO: string;
  SPECID: number;
  SPE_NAME: string;
  SIZEID: number;
  SIZENAME: string;
  SORTINGNO: number;
  MEASUREMENT: string;
  SERIAL_: string;
};

type YarnBookingReportDto_CuttingAdviceQuantity = {
  BUYERID: number;
  BUYER: string;
  STYLEID: number;
  STYLENAME: string;
  COLORID: number;
  COLORNAME: string;
  SIZEID: number;
  SIZENAME: string;
  SORTINGNO: number;
  QTY: number;
};

type YarnBookingReportDto_ConsumptionPerPcs = {
  COLOR_GROUP_ID: number;
  GROUP_NAME: string;
  GMT_SIZE_ID: number;
  SIZENAME: string;
  SORTINGNO: number;
  BOOKING_CON_PER_PCS: number;
  CG_SORTING_NO: number;
};

type YarnBookingReportDto_KnittingDyeingAdvice = {
  MATERIAL_ID: number;
  MTL_NAME: string;
  COLORNAME: string;
  SIZENAME: string;
  QTY: number;
  SORTINGNO: number;
  SORTING: number;
  FABRIC_PART_ID: number;
  FABRIC_PART: string;
};

type YarnBookingReportDto_LycraBooking = {
  MATERIAL_ID: number;
  MTL_NAME: string;
  GMT_COLOR_ID: number;
  COLORNAME: string;
  GMT_SIZE_ID: number;
  SIZENAME: string;
  SORTINGNO: number;
  QTY: number;
};

type YarnBookingReportDto_Comments = {
  MASTER_ID: number;
  BOMNO: string;
  BUYER_ID: number;
  PO_ID: number;
  PO_NO: string;
  STYLE_ID: number;
  COMMENTS: string;
};

type YarnBookingReportDto_SpecialTreatment = {
  ID: number;
  MASTER_ID: number;
  SPECIAL_TREATM_ID: number;
  TREATMENT: string;
};

type YarnBookingReportDto_FabricList = {
  COM_BOM_PARENTS_MTL_ID: number;
  FABRIC: string;
};

type YarnBookingReportDto_Revice = {
  REVICE_NO: number;
  REVICE_REASON: string;
};

type YarnBookingReportDto_VerficationStatus = {
  VER_ID: number;
  DEPARTMENT_NAME: string;
  USER_FULL_NAME: string;
  DESIGNATION: string;
  STATUS: string;
  COMMENTS: string;
};
