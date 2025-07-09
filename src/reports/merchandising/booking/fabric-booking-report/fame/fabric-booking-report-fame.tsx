import CollarCuffSummary from "../shared-components/collar-cuff-summary";
import Comments from "../shared-components/comments";
import MasterInfo from "../shared-components/master-info";
import OrderQty from "../shared-components/order-qty";
import Signature from "../shared-components/signature";
import StripeDetails from "../shared-components/stripe-details";
import VarificationStatus from "../shared-components/varification-status";
import YarnRequirementSummary from "../shared-components/yarn-requirement-summary";
import { FabricBookingReportDto } from "../fabric-booking-type";
import Details_Fame from "./components/details-fame";

export default function FabricBookingReportFame({ data }: { data?: FabricBookingReportDto }) {
    const signatureData = [
        { title: "Prepared By", access_key: "CREATED_BY" },
        { title: "Checked By", access_key: "" },
        { title: "Yarn Store", access_key: "" },
        { title: "Yarn Procurement", access_key: "" },
        { title: "Process Control", access_key: "" },
        { title: "Garment Planning", access_key: "" },
        { title: "Dyeing Planning", access_key: "" },
        { title: "HOD Merchant", access_key: "" },
        { title: "Approved By", access_key: "" },
    ]

    return (
        <div className="px-10 w-auto print:max-w-none print:px-0 mt-10">
            <MasterInfo masterData={data?.MaterData} />
            <OrderQty lstColorSizeWiseOrderQty={data?.lstColorSizeWiseOrderQty} />
            <Details_Fame lstFabricQtyDetails={data?.lstFabricQtyDetails} lstWastagePercentage={data?.lstWastagePercentage} isPoWise={data?.MaterData?.IS_PO_WISE} />
            <CollarCuffSummary lstFabricQtyDetails={data?.lstFabricQtyDetails} lstSize={data?.lstSize} />
            <YarnRequirementSummary lstYarnSummary={data?.lstYarnSummary} />
            <StripeDetails lstStripeDetails={data?.lstStripeDetails} />
            <Comments lstComments={data?.lstComments} />
            <VarificationStatus lstVerificationStatus={data?.lstVerificationStatus} />
            <Signature masterData={data?.MaterData} signatureData={signatureData} />
        </div>
    );
}
