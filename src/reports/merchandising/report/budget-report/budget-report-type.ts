export type BudgetReportResponseType = {
    FOB: number;
    SMV: string;
    RequiredCM: number;
    Report: BudgetReportType[];
};

export type BudgetReportType = {
    MAIN_COMPANY_NAME: string;
    MAIN_COMPANY_ADDRESS: string;
    PREPARED_BY: string;
    COMPANY_NAME: string;
    COMPANY_ADDRESS: string;
    BUDGET_ID: number;
    BUDGET_NO: string;
    BUYER_ID: number;
    BUYER: string;
    PO_ID: number;
    PONO: string;
    STYLE_ID: number;
    STYLENO: string;
    ITEM: string;
    COST_NO: string;
    COST_NAME: string;
    TOTAL_FOB_VALUE: number;
    BUYEING_COMMI: number;
    BALANCE_VALUE: number;
    BUDGET_DATE: Date;
    COSTING_PRICE: number;
    BUDGET_PRICE: number;
    PO_QTY: number;
    QTY: number;
    BUDGET_TOTAL_VALUE: number;
    COSTING_TOTAL_VALUE: number;
    MTL: string;
    UOM: string;
    DS: string;
    SORTING: number;
    COMBINE_PONO: string;
};
