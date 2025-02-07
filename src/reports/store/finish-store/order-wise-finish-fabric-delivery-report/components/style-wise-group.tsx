import React from "react";
import ColorPoStyleWiseRow from "./color-po-style-wise-row";
import FabricPartWiseGroup from "./fabric-part-wise-group";

interface props {
  lstAllocation: OrderWiseFFDeliveryAllocationDto[];
  lstBooking: OrderWiseFFDeliveryBookingDto[];
}

export default function StyleWiseGroup({ lstAllocation, lstBooking }: props) {
  var colorIds: number[] = [];

  lstAllocation?.forEach((e) => {
    if (!colorIds.includes(e.COLOR_ID)) {
      colorIds.push(e.COLOR_ID);
    }
  });

  return (
    <>
      <FabricPartWiseGroup
        lstAllocation={lstAllocation}
        lstBooking={lstBooking}
      />
    </>
  );
}
