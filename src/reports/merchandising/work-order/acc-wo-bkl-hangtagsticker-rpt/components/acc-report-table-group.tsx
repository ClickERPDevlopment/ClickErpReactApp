import React from 'react'
import AccReportTableRow from './acc-report-table-rows';
import AccReportTableRows from './acc-report-table-rows';
import AccReportTableTotal from './acc-report-table-total';
import AccReportTable from './acc-report-table';

function getAccReportGmtSizes(data: iaccWorkOrder[]) {

    var sizes: string[] = [];

    if (data) {
        if (data.length > 0) {

            data = data?.sort((a, b) => a.SORTINGNO - b.SORTINGNO);

            data?.forEach(element => {
                if (!sizes.includes(element.GMT_SIZE_NAME)) {
                    sizes.push(element.GMT_SIZE_NAME);
                }
            });
        }
    }

    return sizes;
}

function getColumns(data: iaccWorkOrder[]) {

    var colCheckStrings: string[] = [];
    var columns: iaccWorkOrder[] = [];

    data?.forEach(e => {
        const str = e.PO_NO + e.STYLENAME + e.GMT_COLOR_NAME + e.SUPPLIER_RATE_PER_PCS;
        if (!colCheckStrings.includes(str)) {
            colCheckStrings.push(str);
            columns.push(e);
        }
    });

    return columns;
}


export default function AccReportTableGroup({ data }: { data: iaccWorkOrder[] }) {

    var mtls: string[] = [];

    data?.forEach(element => {
        if (!mtls.includes(element.MTL_NAME)) {
            mtls.push(element.MTL_NAME);
        }
    });

    console.log("mtls: ", mtls);

    return (
        <>
            {
                mtls.map(mtl =>
                    <AccReportTable data={data.filter(d => d.MTL_NAME === mtl)} key={Math.random()} />
                )
            }
        </>

    )
}
