import { YarnIssueForTwistingType } from './yarn-issue-for-twisting-report-type'
import ReportHeader from './components/report-header'
import ReportBody from './components/report-body'
import ReportFooter from './components/report-footer'

export default function YarnIssueTwistingReport({ data }: { data: YarnIssueForTwistingType[] }) {
    return (
        <div className='p-5 min-w-full'>
            <ReportHeader data={data} />
            <ReportBody data={data} />
            <ReportFooter />
        </div>
    )
}
