import { createContext } from "react";

const YarnBookingReportContext = createContext<YarnBookingReportDto | null>(
  null
);
export default YarnBookingReportContext;
