import React from "react";
import PoColorWiseGroupSummary from "./po-color-wise-group-summary";
import { PocketKnife } from "lucide-react";

interface props {
  lstAllocation: OrderWiseFFDeliveryAllocationDto[];
  lstBooking: OrderWiseFFDeliveryBookingDto[];
}

export default function POColorSummary({ lstAllocation, lstBooking }: props) {
  var poColorIds: string[] = [];

  lstAllocation?.forEach((element) => {
    if (!poColorIds.includes(element.PO_ID + "_" + element.COLOR_ID)) {
      poColorIds.push(element.PO_ID + "_" + element.COLOR_ID);
    }
  });

  return (
    <>
      {poColorIds.map((x) => (
        <>
          <PoColorWiseGroupSummary
            lstBookingSummary={lstBooking.filter(
              (b) => b.PO_ID + "_" + b.COLOR_ID === x
            )}
            lstAllocation={lstAllocation.filter(
              (a) => a.PO_ID + "_" + a.COLOR_ID === x
            )}
          />
        </>
      ))}
    </>
  );
}
