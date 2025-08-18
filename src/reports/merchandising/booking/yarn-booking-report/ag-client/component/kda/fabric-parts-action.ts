import { YarnBookingReportDto_KnittingDyeingAdvice } from "../yb-rpt-type";

export function fabricPartsAction(lstKda: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined) {
    const ribPartsName = 'RIB';
    const ribCuffPartsName = 'RIB CUFF';
    const collarPartsName = 'COLLAR';
    const cuffPartsName = 'CUFF';
    const summaryColumns = [ribPartsName, ribCuffPartsName, collarPartsName, cuffPartsName];

    const isRibColAval = lstKda?.some(item => item.FABRIC_PART?.toUpperCase().trim() === ribPartsName || item.FABRIC_PART?.toUpperCase().trim() === 'NECK RIB');
    const isRibCuffColAval = lstKda?.some(item => item.FABRIC_PART?.toUpperCase().trim() === ribCuffPartsName);
    const isCollarColAval = lstKda?.some(item => item.FABRIC_PART?.toUpperCase().trim() === collarPartsName);
    const isCuffColAval = lstKda?.some(item => item.FABRIC_PART?.toUpperCase().trim() === cuffPartsName);
    return { ribPartsName, ribCuffPartsName, collarPartsName, cuffPartsName, summaryColumns, isRibColAval, isRibCuffColAval, isCollarColAval, isCuffColAval };
}