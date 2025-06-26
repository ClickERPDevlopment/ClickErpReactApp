import CollarCuff from './components/collar-cuff'
import Details from './components/fabric-details'
import MasterIfo from './components/master-info'
import Signature from './components/signaure'
import YarnSummary from './components/yarn-summary'
import { YarnAdditionalBookingReportDtoType } from './yarn-additional-booking-report.-type'

export default function YarnAdditionalBookingReport({ data }: { data?: YarnAdditionalBookingReportDtoType }) {
    return (
        <div className='w-full p-5 flex flex-col justify-between min-h-screen'>
            <div className='w-full'>
                <MasterIfo masterInfo={data} />
                <Details data={data} />
                {/* <Remarks masterInfo={data?.masterInfo} /> */}
                {/* =================================================================== */}
                <YarnSummary lstDetails={data?.oYBookingDetailsYarnList} />
                <CollarCuff data={data} />
                {/* <SpecialTreatment lstSpecialTreatment={data?.lstSpecialTreatment} /> */}
                {/* <YarnDyeingDetails lstYarnDyeingDetails={data?.lstYarnDyeingDetails} /> */}
                {/* <Comments lstComments={data?.lstComments} /> */}
            </div>
            <Signature masterInfo={data} />
        </div>
    )
}
