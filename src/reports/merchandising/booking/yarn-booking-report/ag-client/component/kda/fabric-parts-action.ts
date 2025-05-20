import { YarnBookingReportDto_KnittingDyeingAdvice } from "../yb-rpt-type";

export function fabricPartsAction(lstKda: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined) {
    const ribPartsName = 'RIB';
    const ribCuffPartsName = 'RIB CUFF';
    const collarPartsName = 'COLLAR';
    const cuffPartsName = 'CUFF';
    const summaryColumns = [ribPartsName, ribCuffPartsName, collarPartsName, cuffPartsName];

    const isRibColAval = lstKda?.some(item => item.FABRIC_PART.toUpperCase() === ribPartsName);
    const isRibCuffColAval = lstKda?.some(item => item.FABRIC_PART.toUpperCase() === ribCuffPartsName);
    const isCollarColAval = lstKda?.some(item => item.FABRIC_PART.toUpperCase() === collarPartsName);
    const isCuffColAval = lstKda?.some(item => item.FABRIC_PART.toUpperCase() === cuffPartsName);
    return { ribPartsName, ribCuffPartsName, collarPartsName, cuffPartsName, summaryColumns, isRibColAval, isRibCuffColAval, isCollarColAval, isCuffColAval };
}