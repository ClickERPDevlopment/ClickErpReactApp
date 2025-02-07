import React from 'react'
import ReportTable from './report-table';
import moment from 'moment';
import ReportFooter from './report-footer';
import ReportHeader from './report-header';

function Report({ data }: { data: IBatchWiseApprovalStatus[] }) {

    var uniqueKeys: Set<string> = new Set();

    function groupBy(data: IBatchWiseApprovalStatus[], keys: string[]) {
        return data.reduce((result: any, item: any) => {
            const key = keys.map(k => item[k]).join('_');
            uniqueKeys.add(key);
            if (!result[key]) {
                result[key] = {
                    items: []
                };
            }
            result[key].items.push(item);

            return result;
        }, {});
    }

    interface GroupedByBuyer {
        [key: string]: {
            items: IBatchWiseApprovalStatus[];
        };
    }

    var groupedByBuyer: GroupedByBuyer = {};

    if (data) {
        groupedByBuyer = groupBy(data, ['BATCH_ID', 'FABRIC_ID']);
    }

    //set table header 
    var firstHeader = ["Batch No.", " Batch QTY Fabric wise  (Kg)", "Buyer", "Style", "Order/PO", "Color", "Garments patr", "Fabric", "Yarn Details", "R/Dia", "R/GSM", "Dyeing Date", " Submit Date", " Approval Date", "Batc Finish date", "Quality Inspection Date", "Quality Inspection result", "Quality Clearance", "RFD Date", "Special Info", "Remarks"];

    var header = firstHeader;

    return (
        <div className='container'>
            <div className='p-2'>
                <ReportHeader />

                <ReportTable data={data} header={header}></ReportTable>
                <div>
                    {/* <ReportFooter masterData={data[0]}></ReportFooter> */}
                </div>
            </div>
        </div>
    )
}

export default Report
