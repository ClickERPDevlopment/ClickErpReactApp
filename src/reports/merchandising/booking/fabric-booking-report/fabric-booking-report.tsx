import CollarCuffSummary from "./components/collar-cuff-summary";
import Comments from "./components/comments";
import Details from "./components/details";
import MasterInfo from "./components/master-info";
import OrderQty from "./components/order-qty";
import Signature from "./components/signature";
import StripeDetails from "./components/stripe-details";
import VarificationStatus from "./components/varification-status";
import YarnRequirementSummary from "./components/yarn-requirement-summary";
import { FabricBookingReportDto } from "./fabric-booking-type";

export default function FabricBookingReport({ data }: { data?: FabricBookingReportDto }) {

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
            <Signature masterData={data?.MaterData} />
        </div>
    );
}
