import CollarCuff from './components/collar-cuff'
import Comments from './components/comments'
import Details from './components/details'
import MasterIfo from './components/master-info'
import Signature from './components/signaure'
import SpecialTreatment from './components/special-treatment'
import YarnDyeingDetails from './components/yarn-dyeing-details'
import { SampleProgramReportDtoType } from './sample-program-report.-type'

export default function SampleProgramReport({ data }: { data?: SampleProgramReportDtoType }) {
    return (
        <div className='w-full p-5 flex flex-col justify-between min-h-screen'>
            <div className='w-full'>
                <MasterIfo masterInfo={data?.masterInfo} />
                <Details lstDetails={data?.lstDetails} />
                <CollarCuff lstCollarCuff={data?.lstCollarCuff} />
                <SpecialTreatment lstSpecialTreatment={data?.lstSpecialTreatment} />
                <YarnDyeingDetails lstYarnDyeingDetails={data?.lstYarnDyeingDetails} />
                <Comments lstComments={data?.lstComments} />
            </div>
            <Signature masterInfo={data?.masterInfo} />
        </div>
    )
}
