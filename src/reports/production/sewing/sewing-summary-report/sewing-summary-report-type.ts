export type SewingSummaryReportType = {
    FLOORNAME?: string;
    LINENAME?: string;
    LINEINCHARGE?: string;

    SMVSEWING?: number;
    TOTALTARGET?: number;
    SEWINGOUTPUT?: number;
    ACTUALHOURS?: number;
    TARGET_EARN_MIN?: number;
    RUNNINGMC?: number;
    OPERATOR?: number;
    HELPER?: number;
    EARNINGMIN?: number;
    AVAILABLEMIN?: number;
    TOTALCM?: number;
    TOTALFOB?: number;

    AVGSMVSEWING?: number;
    TOTALPRODUCTION?: number;
    AVGEARNINGMIN?: number;
    AVGAVAILABLEMIN?: number;
    AVGLOSSMIN?: number;

    COMPANY_NAME?: string;
    COMPANY_ADDRESS?: string;
    COMPANY_PREFIX?: string;
    PER_MACHINE_COST?: number;

    FIRST_HOUR_ACHIEVE?: number;
    DEFECTQTY?: number;
    CHECKQTY?: number;
};
