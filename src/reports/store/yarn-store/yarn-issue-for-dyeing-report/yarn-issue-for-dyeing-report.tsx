import { YarnIssueStatusReportType } from './yarn-issue-for-dyeing-report-type'
import ReportHeader from './components/report-header'
import ReportBody from './components/report-body'
import ReportFooter from './components/report-footer'

export default function YarnIssueStatusReport({ data }: { data: YarnIssueStatusReportType[] }) {
    return (
        <div className='p-5 min-w-full'>
            <ReportHeader data={data} />
            <ReportBody data={data} />
            <ReportFooter />
        </div>
    )
}
