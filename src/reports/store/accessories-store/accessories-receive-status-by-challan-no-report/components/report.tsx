import React from 'react'
import ReportFooter from './report-footer';
import ReportHeader from './report-header';
import ReportGroup from './report-group';
import moment from 'moment';


interface ReportHeaderProps {
    companyName?: string
    companyAddress?: string
    reportTitle?: string
    fromDate?: string
    toDate?: string
}

function Report({ data, dtFrom, dtTo }: { data: IAccessoriesReceiveStatusByChallanNoReport[], dtFrom: string, dtTo: string }) {



    //set table header 
    var firstHeader = ["BUYER", "PO", "STYLE", "CHALLAN NO", "CHALLAN DATE", "ITEM", "COLOR", "SIZE", "RECEIVE"];


    return (
        <div className='container text-sm'>
            <div className='p-2'>
                <ReportHeader dtFrom={dtFrom} dtTo={dtTo} companyName={data[0]?.COMPANY_NAME} companyAddress={data[0]?.COMPANY_ADDRESS} />
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
