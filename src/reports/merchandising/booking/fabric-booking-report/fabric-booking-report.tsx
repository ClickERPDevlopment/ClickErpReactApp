import MasterInfo from "./components/master-info";
import { FabricBookingReportDto } from "./fabric-booking-type";

export default function FabricBookingReport({ data }: { data: FabricBookingReportDto }) {

    return (
        <div className="container print:max-w-none print:px-0">
            <MasterInfo masterData={data?.MaterData} />
        </div>
    );
}
