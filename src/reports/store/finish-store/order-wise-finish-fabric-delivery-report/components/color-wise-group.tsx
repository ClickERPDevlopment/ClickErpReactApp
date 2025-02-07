import React from "react";
import POWiseGroup from "./po-wise-group";
import ColorWiseTotalRow from "./color-wise-total";

interface props {
  lstAllocation: OrderWiseFFDeliveryAllocationDto[];
  lstBooking: OrderWiseFFDeliveryBookingDto[];
}

export default function ColorWiseGroup({ lstAllocation, lstBooking }: props) {
  var poIds: number[] = [];

  lstAllocation?.forEach((e) => {
    if (!poIds.includes(e.PO_ID)) {
      poIds.push(e.PO_ID);
    }
  });

  return (
    <>
      {poIds.map((id) => (
        <POWiseGroup
          lstAllocation={lstAllocation.filter((d) => d.PO_ID === id)}
          lstBooking={lstBooking.filter((d) => d.PO_ID === id)}
        />
      ))}

      <ColorWiseTotalRow
        lstAllocation={lstAllocation}
        lstBooking={lstBooking}
      />
    </>
  );
}
