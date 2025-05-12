import { FabricBookingReportDto_MasterData } from "../fabric-booking-type"

export default function Signature({ masterData }: { masterData?: FabricBookingReportDto_MasterData }) {

    const signatureData = [
        { title: "Prepared By", access_key: "CREATED_BY" },
        { title: "Approve By", access_key: "APPROVED_BY" },
        { title: "Team Leader", access_key: "TEAM_LEADER" },
        { title: "Planning", access_key: "PLANNING" },
        { title: "Authorise", access_key: "AUTHORISED_BY" }
    ]
    
    return (

        <div className="flex justify-around items-center mt-10">
            {signatureData.map(({ title, access_key }) => (
                <div key={access_key} className="w-32 flex flex-col">
                    <div className="text-center min-h-[24px]">
                        <span>{masterData?.[access_key as keyof FabricBookingReportDto_MasterData]}</span>
                    </div>
                    <div className="text-center border-t-2 border-gray-600">
                        <span>{title}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
