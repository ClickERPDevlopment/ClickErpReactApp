import { YarnBookingReportDto_KnittingDyeingAdvice } from "../yb-rpt-type";

export function fabricPartsAction(lstKda: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined) {
    const ribPartsName = 'RIB';
    const collarPartsName = 'COLLAR';
    const cuffPartsName = 'CUFF';
    const summaryColumns = [ribPartsName, collarPartsName, cuffPartsName];

    const isRibColAval = lstKda?.some(item => item.FABRIC_PART.toUpperCase() === ribPartsName);
    const isCollarColAval = lstKda?.some(item => item.FABRIC_PART.toUpperCase() === collarPartsName);
    const isCuffColAval = lstKda?.some(item => item.FABRIC_PART.toUpperCase() === cuffPartsName);
    return { ribPartsName, collarPartsName, cuffPartsName, summaryColumns, isRibColAval, isCollarColAval, isCuffColAval };
}