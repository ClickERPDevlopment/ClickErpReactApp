import CollarCuffSummary from "../shared-components/collar-cuff-summary";
import Comments from "../shared-components/comments";
import Details from "../shared-components/details";
import MasterInfo from "../shared-components/master-info";
import OrderQty from "../shared-components/order-qty";
import Signature from "../shared-components/signature";
import StripeDetails from "../shared-components/stripe-details";
import VarificationStatus from "../shared-components/varification-status";
import YarnRequirementSummary from "../shared-components/yarn-requirement-summary";
import { FabricBookingReportDto } from "../fabric-booking-type";
import Revise from "../shared-components/revise";

export default function FabricBookingReport({ data }: { data?: FabricBookingReportDto }) {
    const signatureData = [
        { title: "Prepared By", access_key: "CREATED_BY" },
        { title: "Approve By", access_key: "APPROVED_BY" },
        { title: "Team Leader", access_key: "TEAM_LEADER" },
        { title: "Planning", access_key: "PLANNING" },
        { title: "Authorise", access_key: "AUTHORISED_BY" }
    ]

    return (
        <div className="px-10 w-auto print:max-w-none print:px-0 mt-10">
            <MasterInfo masterData={data?.MaterData} />
            <OrderQty lstColorSizeWiseOrderQty={data?.lstColorSizeWiseOrderQty} />
            <Details lstFabricQtyDetails={data?.lstFabricQtyDetails} lstWastagePercentage={data?.lstWastagePercentage} />
            <CollarCuffSummary lstFabricQtyDetails={data?.lstFabricQtyDetails} lstSize={data?.lstSize} />
            <YarnRequirementSummary lstYarnSummary={data?.lstYarnSummary} />
            <StripeDetails lstStripeDetails={data?.lstStripeDetails} />
            <Comments lstComments={data?.lstComments} />
            <VarificationStatus lstVerificationStatus={data?.lstVerificationStatus} />
            <Revise lstRevise={data?.lstRevice} />
            <Signature masterData={data?.MaterData} signatureData={signatureData} />
        </div>
    );
}
