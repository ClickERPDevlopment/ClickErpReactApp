export type SewingSummaryReportType = {
    FLOORNAME?: string;
    LINENAME?: string;
    LINEINCHARGE?: string;

    SMVSEWING?: number;
    TOTALTARGET?: number;
    RUNNNING_TOTALTARGET?: number;
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
    TARGETHOURS?: number;
    SEWINGDATE?: string;
    F_SMVSEWING?: number;
    NO_OF_LINE?: number;
};
