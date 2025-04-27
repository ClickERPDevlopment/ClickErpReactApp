import useApiUrl from "@/hooks/use-ApiUrl";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { FabricBookingReportDto } from "./fabric-booking-type";
import axios from "axios";
import ReportSkeleton from "@/components/report-skeleton";
import FabricBookingReport from "./fabric-booking-report";

export default function FabricBookingReportIndex() {
    const [data, setData] = useState<FabricBookingReportDto>();
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const api = useApiUrl();

    let po: string | null = "";
    let styleNo: string | null = "";

    if (searchParams.get("po")) {
        po = searchParams.get("po");
    }
    if (searchParams.get("styleNo")) {
        styleNo = searchParams.get("styleNo");
    }

    useEffect(() => {
        document.title = "Fabric Booking";
    }, []);

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);

                await axios
                    .get(
                        `${api.ProductionUrl}/production/Booking/FabricBookingReport?po=${po}&styleNo=${styleNo}`
                    )
                    .then((res) => {
                        if (res.data) {
                            const result = res.data;
                            setData(result);
                        } else {
                            console.log(res);
                        }
                    })
                    .catch((m) => console.log("error ", m));

                setIsLoading(false);
            } catch {
                setIsLoading(false);
            }
        }
        getData();
    }, [api.ProductionUrl, po, styleNo]);
    return (
        <>
            {isLoading ? (
                <div className="flex justify-center">
                    <ReportSkeleton />
                </div>
            ) :
                (<FabricBookingReport data={data!} />)

            }
        </>
    );
}
