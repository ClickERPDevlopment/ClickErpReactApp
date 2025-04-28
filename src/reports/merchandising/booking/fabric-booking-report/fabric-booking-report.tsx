import MasterInfo from "./components/master-info";
import { FabricBookingReportDto } from "./fabric-booking-type";

export default function FabricBookingReport({ data }: { data: FabricBookingReportDto }) {

    return (
        <div>
            <MasterInfo masterData={data?.MaterData} />
        </div>
    );
}
