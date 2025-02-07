import moment from 'moment'
import React from 'react'

function ReportHeader({ searchParams }: { searchParams: { toDate: any, fromDate: any } }) {
    return (
        <div className='w-[100%]'>
            <p className="font-bold text-lg text-left w-[100%] text-sm">
                {moment().format("DD-MMM-YYYY")}
            </p>
            <h1 className='font-bold text-2xl text-center'>International Classic Composite Ltd.</h1>
            <h4 className='font-bold text-base text-center'>568 & 584, Naojour, Kodda, Jaydevpur, Gazipur.,</h4>
            <h3 className='font-bold text-xl text-center mt-2'>Monthly Order Vs Shipment Status Report</h3>
            <h3 className='font-bold text-xl text-center mt-2'>
                {moment(searchParams?.fromDate).format("MMM-YY")} to    {moment(searchParams?.toDate).format("MMM-YY")}
            </h3>
        </div>
    )
}

export default ReportHeader
