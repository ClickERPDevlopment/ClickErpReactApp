import React from 'react'
import ReportTable from './report-table';
import moment from 'moment';
import ReportFooter from './report-footer';
import ReportHeader from './report-header';

function Report({ data }: { data: IAccessoriesReport[] }) {



    //set table header 
    var firstHeader = ["STYLE", "PO", "MATERIAL NAME", "GMT COLOR", "MTL COLOR"];
    var secondHeader = ["GMT SIZE", "MTL SIZE", "GMT QTY", "ORDER QTY", "UOM", "CURRENCY", "RATE", "AMOUNT", "DESCRIPTION 1", "DESCRIPTION 2", "MTL COLOR 2"];

    var uniqueSizes: Set<string> = new Set();

    data.forEach(item => {
        if (item.GMT_SIZE_NAME != null) uniqueSizes.add(item.GMT_SIZE_NAME);
    })

    var sizeHeader = new Array();

    var header = firstHeader.concat(sizeHeader).concat(secondHeader);

    return (
        <div className='container'>
            <div className='p-2'>
                <ReportHeader masterData={data[0]} />
                <ReportTable data={data} firstHeader={firstHeader} sizeHeader={sizeHeader} secondHeader={secondHeader}></ReportTable>
                <div>
                    <ReportFooter masterData={data[0]}></ReportFooter>
                </div>
            </div>
        </div>
    )
}

export default Report
