import moment from 'moment'
import { YarnIssueStatusReportType } from './yarn-issue-status-report-type'

export default function YarnIssueStatusReport({ data }: { data: YarnIssueStatusReportType[] }) {
    return (
        <div className='p-5'>
            <div className='static'>
                {/* <h1 className='text-center font-bold text-2xl'>{data[0]?.COMPANY_NAME}</h1> */}
                <h1 className='text-center font-bold text-xl'>Yarn Issue Status</h1>
            </div>
            <table className='border border-gray-600 rounded-md'>
                <thead className=''>
                    <tr>
                        <th className='border border-gray-600 min-w-5 p-1'>SL</th>
                        <th className='border border-gray-600 min-w-36 p-1'>Job No</th>
                        <th className='border border-gray-600 min-w-36 p-1'>Buyer Name</th>
                        <th className='border border-gray-600 min-w-36 p-1'>Style No</th>
                        <th className='border border-gray-600 min-w-36 p-1'>Order No</th>
                        <th className='border border-gray-600 min-w-28 p-1'>date</th>
                        <th className='border border-gray-600 min-w-24 p-1'>ch</th>
                        <th className='border border-gray-600 min-w-24 p-1'>prog no</th>
                        <th className='border border-gray-600 min-w-56 p-1'>Yarn</th>
                        <th className='border border-gray-600 min-w-28 p-1'>Yarn Brand</th>
                        <th className='border border-gray-600 min-w-24 p-1'>Lot No</th>
                        <th className='border border-gray-600 min-w-24 p-1'>Issue Qty </th>
                        <th className='border border-gray-600 min-w-24 p-1'>Issue Purpose</th>
                        <th className='border border-gray-600 min-w-56 p-1'>PARTY</th>
                        <th className='border border-gray-600 min-w-28 p-1'>Store</th>
                        <th className='border border-gray-600 p-1'>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((_, i) =>
                            <tr>
                                <td className='border border-gray-600 p-1 text-center text-xs'>{i + 1}</td>
                                <td className='border border-gray-600 p-1 text-center text-xs'>{_?.JOB_NO}</td>
                                <td className='border border-gray-600 p-1 text-center text-xs'>{_?.BUYER}</td>
                                <td className='border border-gray-600 p-1 text-center text-xs'>{_?.STYLENO}</td>
                                <td className='border border-gray-600 p-1 text-center text-xs'>{_?.ORDER_NO}</td>
                                <td className='border border-gray-600 p-1 text-center text-xs'>{moment(_?.YARN_CHALLAN_DATE).format('D-MMM-yy')}</td>
                                <td className='border border-gray-600 p-1 text-center text-xs'>{_?.CHALLAN_NO}</td>
                                <td className='border border-gray-600 p-1 text-center text-xs'>{_?.KNITTING_PROGRAM_NO}</td>
                                <td className='border border-gray-600 p-1 text-center text-xs'>{_?.YARN}</td>
                                <td className='border border-gray-600 p-1 text-center text-xs'>{_?.YARN_BRAND}</td>
                                <td className='border border-gray-600 p-1 text-center text-xs'>{_?.YARN_LOT_NUMBER}</td>
                                <td className='border border-gray-600 p-1 text-center text-xs'>{_?.ISSUE_QTY}</td>
                                <td className='border border-gray-600 p-1 text-center text-xs'>{_?.ISSUE_TYPE}</td>
                                <td className='border border-gray-600 p-1 text-center text-xs'>{_?.PARTY}</td>
                                <td className='border border-gray-600 p-1 text-center text-xs'>Yarn Store</td>
                                <td className='border border-gray-600 p-1 text-center text-xs'>{_?.REMARKS}</td>
                            </tr>
                        )
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={11}>Total</th>
                        <th className='border border-gray-600 min-w-24 p-1'>
                            {
                                data?.reduce((p, c) => Number(p) + Number(c.ISSUE_QTY!), 0).toFixed(2)
                            }
                        </th>
                        <th colSpan={4}></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
