import React from 'react'
import ReportTable from './report-table';
import moment from 'moment';
import ReportFooter from './report-footer';
import ReportHeader from './report-header';
import ReportGroup from './report-summary';
import ReportSummary from './report-summary';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

function Report({ data, searchParams }: { data: IShipmentDelayReport[], searchParams: { toDate: any, fromDate: any } }) {


    var uniqueKeys: Set<string> = new Set();

    function groupBy(data: IShipmentDelayReport[], keys: string[]) {
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
        },);
    }



    //set table header 
    var firstHeader = ["BUYER", "MONTH", "PO", "STYLE", "QTY", "DELIVERY DATE", "DELAY"];


    //summary header
    var summaryHeader = ["BUYER", "TOTAL REQUIRED", "DAY RECEIVE", "TOTAL RECEIVE", "BALANCE"];



    return (
        <div className='px-10'>

            <div className='p-2'>
                <ReportHeader searchParams={{ toDate: searchParams?.toDate, fromDate: searchParams?.fromDate }} />
                <table className='border-collapse border border-gray-300  w-[100%] mt-3'>
                    <thead>
                        <tr className='bg-lime-200 text-center'>
                            {
                                firstHeader?.map(item => <th className='border border-gray-300 p-1'>{item}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(item =>
                                <tr className='text-center'>
                                    <td className='border border-gray-300 p-1'>{item.BUYER_NAME}</td>
                                    <td className='border border-gray-300 p-1'>
                                        {item.ORDER_PLACEMENT_MONTH && moment(item.ORDER_PLACEMENT_MONTH).format("DD-MMM-YY") !== '01-Jan-01'
                                            ? moment(item.ORDER_PLACEMENT_MONTH).format("MMM-YY")
                                            : ''}
                                    </td>
                                    <td className='border border-gray-300 p-1'>{item.PO_NO}</td>
                                    <td className='border border-gray-300 p-1'>{item.STYLE_NO}</td>
                                    <td className='border border-gray-300 p-1'>{item.QTY}</td>
                                    <td className='border border-gray-300 p-1'>
                                        {item.DELIVERY_DATE && moment(item.DELIVERY_DATE).format("DD-MMM-YY") !== '01-Jan-01'
                                            ? moment(item.DELIVERY_DATE).format("DD-MMM-YY")
                                            : ''}
                                    </td>
                                    <td className="border border-gray-300 p-1">
                                        {item.DELIVERY_DATE && moment(item.DELIVERY_DATE).format("DD-MMM-YY") !== '01-Jan-01'
                                            ? `${moment().diff(moment(item.DELIVERY_DATE), 'days')} days`
                                            : ''}
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
                <div className='p-5'></div>
                <div>
                    <ReportFooter></ReportFooter>
                </div>
            </div>
        </div>
    )
}

export default Report
