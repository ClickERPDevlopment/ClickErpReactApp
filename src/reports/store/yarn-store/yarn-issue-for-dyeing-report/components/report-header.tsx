import moment from 'moment'
import { YarnIssueStatusReportType } from '../yarn-issue-for-dyeing-report-type'

export default function ReportHeader({ data }: { data: YarnIssueStatusReportType[] | null }) {
    if (data)
        return (
            <div className='min-w-full text-center font-bold'>

                <h1 className='text-2xl font-bold'>{data[0]?.GROUP_COMPANY_NAME}</h1>
                <h1 className='text-base'>{data[0]?.GROUP_COMPANY_ADDRESS}</h1>

                <h1 className='text-xl font-bold mt-5'>{data[0]?.COMPANY_NAME}</h1>
                <h1 className='text-base font-bold'>YARN ISSUE FOR DYEING CHALLAN/GATEPASS</h1>
                <div className='flex justify-between mt-5'>
                    <ul>
                        <li>
                            <div className='flex'>
                                <span className='text-left w-28'>Date</span>
                                <span>: {moment(data[0]?.CHALLAN_DATE).format('DD-MMM-YY')}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <span className='text-left w-28'>Challan No</span>
                                <span>: {data[0]?.CHALLAN_NO}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <span className='text-left w-28'>Wo No</span>
                                <span>: {data[0]?.AG_WO_NO}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <span className='text-left w-28'>Buyer</span>
                                <span>: {data[0]?.BUYER_CODE}</span>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <div className='flex'>
                                <span className='text-left w-28'>To</span>
                                <span>: {data[0]?.PARTY}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <span className='text-left w-28'>Address</span>
                                <span>: {data[0]?.PARTY_ADDRESS}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                {/* <span className='text-left w-28'>Wo No</span>
                                <span>: dada</span> */}
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                {/* <span className='text-left w-28'>Buyer</span>
                                <span>: dada</span> */}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
}
