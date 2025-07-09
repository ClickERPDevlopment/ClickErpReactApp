import { YarnIssueStatusReportType } from './yarn-issue-for-dyeing-report-type'
import ReportHeader from './components/report-header'
import ReportBody from './components/report-body'
import ReportFooter from './components/report-footer'

export default function YarnIssueStatusReport({ data }: { data: YarnIssueStatusReportType[] }) {
    return (
        <div
            className="min-w-[50%] p-5 text-gray-950 text-base print:text-base print:text-black print:font-serif"
            style={{ fontFamily: "Times New Roman, serif" }}
        >
            <ReportHeader data={data} />
            <ReportBody data={data} />
            <ReportFooter />
        </div>

    )
}
