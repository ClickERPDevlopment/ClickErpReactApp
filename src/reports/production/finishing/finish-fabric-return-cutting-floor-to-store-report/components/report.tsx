import React from 'react'
import ReportFooter from './report-footer';
import ReportHeader from './report-header';
import ReportGroup from './report-group';


interface ReportHeaderProps {
    companyName?: string
    companyAddress?: string
    reportTitle?: string
    fromDate?: string
    toDate?: string
}

function Report({ data, companyInfo, searchParams: {
    companyName = 'International Classic Composite Ltd.',
    companyAddress = '568 & 584, Naojour, Kodda, Jaydevpur, Gazipur.',
    reportTitle = 'Finish Fabric Return Report Cutting Floor to Store',
    fromDate,
    toDate
} }: { data: IFinishFabricReturnCuttingFloorToStoreReport[], companyInfo: ICompany | undefined, searchParams: ReportHeaderProps }) {



    //set table header 
    var firstHeader = ["BUYER", "STYLE", "ORDER/JOB NO", "FABRIC REQUIRED", "FABRIC RECEIVE", "RECEIVE BALANCE", "FABRIC RETURN", "RECEIVE BALANCE AFTER RETURN"];


    return (
        <div className='container text-sm'>
            <div className='p-2'>
                <ReportHeader companyName={companyInfo?.NAME} companyAddress={companyInfo?.ADDRESS} companyRemarks={companyInfo?.REMARKS} fromDate={fromDate} toDate={toDate} />
                <ReportGroup data={data} firstHeader={firstHeader}></ReportGroup>
                <div className='p-5'></div>
                <div>
                    <ReportFooter></ReportFooter>
                </div>
            </div>
        </div>
    )
}

export default Report
