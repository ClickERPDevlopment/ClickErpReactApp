import ReportSubGroup from './components/report-sub-group';
import { YarnIssueStatusReportType } from './yarn-issue-status-report-type'

export default function YarnIssueStatusReport({ data }: { data: YarnIssueStatusReportType[] }) {

    const unique = [...new Set(data?.map(item => item.PARTY_TYPE))]; // [ 'A', 'B']

    return (
        <div className="p-5">
            <div className='static'>
                {/* <h1 className='text-center font-bold text-2xl'>{data[0]?.COMPANY_NAME}</h1> */}
                <h1 className='text-center font-bold text-xl'>Yarn Issue Status</h1>
            </div>
            <table className='border border-gray-600 rounded-md'>
                <thead className='sticky top-0 print:static'>
                    <tr>
                        <th className='border border-gray-600 min-w-5 p-0.5'>SL</th>
                        <th className='border border-gray-600 min-w-36 p-0.5'>Job No</th>
                        <th className='border border-gray-600 min-w-36 p-0.5'>Buyer Name</th>
                        <th className='border border-gray-600 min-w-36 p-0.5'>Style No</th>
                        <th className='border border-gray-600 min-w-36 p-0.5'>Order No</th>
                        <th className='border border-gray-600 min-w-28 p-0.5'>date</th>
                        <th className='border border-gray-600 min-w-24 p-0.5'>ch</th>
                        <th className='border border-gray-600 min-w-24 p-0.5'>prog no</th>
                        <th className='border border-gray-600 min-w-56 p-0.5'>Yarn</th>
                        <th className='border border-gray-600 min-w-28 p-0.5'>Yarn Brand</th>
                        <th className='border border-gray-600 min-w-24 p-0.5'>Lot No</th>
                        <th className='border border-gray-600 min-w-24 p-0.5'>Issue Qty </th>
                        <th className='border border-gray-600 min-w-24 p-0.5'>Issue Purpose</th>
                        <th className='border border-gray-600 min-w-56 p-0.5'>PARTY</th>
                        <th className='border border-gray-600 min-w-28 p-0.5'>Store</th>
                        {/* <th className='border border-gray-600 p-0.5'>Remarks</th> */}
                    </tr>
                </thead>
                <tbody>

                    {
                        unique.map(item => {

                            const filteredData = data?.filter(f => f.PARTY_TYPE === item)
                            return (
                                <>
                                    <tr>
                                        <td className='border border-gray-600 p-0.5 text-left font-bold text-base bg-gray-300' colSpan={15}>{item}</td>
                                    </tr>
                                    <ReportSubGroup data={filteredData}></ReportSubGroup>
                                    <tr>
                                        <td className='border border-gray-600 p-0.5 text-center font-bold' colSpan={11}>Total {item}</td>
                                        <td className='border border-gray-600 p-0.5 text-center font-bold'>
                                            {
                                                data?.filter(f => f.PARTY_TYPE === item)?.reduce((p, c) => p + Number(c.ISSUE_QTY), 0).toFixed(2)
                                            }
                                        </td>
                                        <td className='border border-gray-600 p-0.5 text-center' colSpan={3}></td>
                                    </tr>

                                </>)
                        })
                    }

                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={11}>Grand Total</th>
                        <th className='border border-gray-600 min-w-24 p-0.5'>
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
